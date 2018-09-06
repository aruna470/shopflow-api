
(function () {

	'use strict';

	var async = require('async');
	var util = require('../lib/util');
	var _ = require('lodash');
	var Shop = require('../models/shop');
	var ShopInvite = require('../models/shop-invite');
	var responseMessages = require('../lib/response-messages');
	var isEmpty = require('is-empty');
	var User = require('../models/user');
	var emailValidator = require("email-validator");
	var mail = require('../lib/mail');
	var config = require('config');
	module.inviteExpirationTimeHrs = config.get('email.inviteExpirationTime') * 3600000;
	var CarOwnerSubscription = require('../models/car-owner-subscription');

	/* POST invite car owner to a shop .*/
	exports.create = function (req, res, next) {

		var logger = req.logger;
		logger.writeLog('Invite user to shop:' + req.body.shopId);

		async.waterfall([
			function (callback) {

				Shop.get({ _id: req.body.shopId }, (err, shop) => {
					// Check whether the shop exists & the user is a shop owner or shop has no owner
					if (shop) {
						if (!isEmpty(shop.shopOwner) && shop.shopOwner._id != req.user.id) {
							let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
							return res.status(403).json(response);
						} else { callback(shop, null); }
					} else {
						callback(null, responseMessages.RECORD_NOT_FOUND);
					}
				});
			}
		], function (shop, err) {
			if (err) {
				if (err == responseMessages.RECORD_NOT_FOUND) {
					let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
					return res.status(404).json(response);
				} else {
					let response = responseMessages.commonResponse(responseMessages.FAIL);
					return res.status(500).json(response);
				}
			} else {
				User.get({ email: req.body.email }, function (err, user) {
					if (user && user.shops.indexOf(req.body.shopId) > -1) {
						// User has already subscribed to the shop
						let response = responseMessages.commonResponse(responseMessages.ALREADY_SUBSCRIBED);
						return res.status(400).json(response);
					} else {
						ShopInvite.get({ email: req.body.email, shop: shop._id, status: ShopInvite.STATUS_PENDING }, function (err, invite) {
							if (invite) {
								// If an invitation is already pending update it and resend
								invite.updatedById = req.user.userId;
							} else {
								invite = new ShopInvite;
								invite.email = req.body.email;
								invite.shop = shop._id;
								invite.createdById = req.user.userId;
							}

							invite.save(function (err) {
								if (!err) {
									// Send invitation mail to the user
									mail.sendInvitation(req.body.email, shop.businessName, invite._id, function (err, data) {
										if (!err) {
											logger.writeLog('User invitation sent to ' + req.body.email);
											let response = responseMessages.commonResponse(responseMessages.SUCCESS);
											return res.status(200).json(response);
										} else {
											logger.writeLog('User invitation sending failed to ' + req.body.email);
											let response = responseMessages.commonResponse(responseMessages.FAIL);
											return res.status(500).json(response);
										}
									});
								} else {
									let response = responseMessages.commonResponse(responseMessages.FAIL);
									return res.status(500).json(response);
								}
							});
						});
					}
				});
			}
		});
	};

	/* POST Verify user invitation to shop. */
	exports.verify = function (req, res, next) {

		var logger = req.logger;
		logger.writeLog('Verify user invitation code');

		ShopInvite.get({ _id: req.params.code, status: ShopInvite.STATUS_PENDING }, function (err, invite) {
			if (!invite) {
				// No pending invite with given code
				let response = responseMessages.commonResponse(responseMessages.INVALID_INVITE_CODE);
				return res.status(400).json(response);
			} else if (ShopInvite.isInvitationExpired(invite)) {
				// Invitation expired
				let response = responseMessages.commonResponse(responseMessages.INVITATION_EXPIRED);
				return res.status(400).json(response);
			} else {
				User.get({ email: invite.email }, (err, user) => {
					let inviteData = {
						email: invite.email,
						shop: invite.shop,
						registered: false,
						subscribed: false
					};
					// Check if user is registered
					if (user) {
						inviteData.registered = true;
						inviteData.subscribed = (user.shops.indexOf(invite.shop) < 0) ? false : true;
					}
					let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'invitation': inviteData });
					return res.status(200).json(response);
				});
			}
		});
	};

	/* POST Verify invitation. Subscribe user to shop if he is already logged in */
	exports.subscribe = function (req, res, next) {

		var logger = req.logger;
		logger.writeLog('Subscribe registered user to shop');

		ShopInvite.get({ _id: req.params.code, status: ShopInvite.STATUS_PENDING }, function (err, invite) {
			if (!invite) {
				// No pending invite with given code
				let response = responseMessages.commonResponse(responseMessages.INVALID_INVITE_CODE);
				return res.status(400).json(response);
			} else if (ShopInvite.isInvitationExpired(invite)) {
				// Invitation expired
				let response = responseMessages.commonResponse(responseMessages.INVITATION_EXPIRED);
				return res.status(400).json(response);
			} else {
				User.get({ email: invite.email }, (err, user) => {
					// Check if user is registered and logged in
					if (!user) {
						let response = responseMessages.commonResponse(responseMessages.USER_NOT_REGISTERED);
						return res.status(400).json(response);
					} else if (user._id == req.user.userId) {
						// Check if user is already subscribed to the shop
						CarOwnerSubscription.get({ userId: req.user.userId, shopId: invite.shop }, (err, subscription) => {
							if (subscription) {
								if (subscription.status == CarOwnerSubscription.UNSUBSCRIBED) {
									// Unsubscribed user trying to subscribe again
									subscription.createdById = req.user.userId;
									subscription.status(CarOwnerSubscription.APPROVED);
									subscription.save(function (err) {
										if (!err) {
											invite.status = ShopInvite.STATUS_JOINED;
											invite.save(function (err) {
												if (!err) {
													let response = responseMessages.commonResponse(responseMessages.SUCCESS);
													return res.status(200).json(response);
												} else {
													let response = responseMessages.commonResponse(responseMessages.FAIL);
													return res.status(500).json(response);
												}
											})
										} else {
											let errorData = mongooseErrorExtractor.getErrorData(err);
											let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
											return res.status(400).json(response);
										}
									});
								} else {
									logger.writeLog('User: ' + req.user.userId + ' already has a subscription to shop: ' + invite.shop);
									let response = responseMessages.commonResponse(responseMessages.SUCCESS);
									return res.status(200).json(response);
								}
							} else {
								let subscription = {
									userId: req.user.userId,
									shopId: invite.shop,
									status: CarOwnerSubscription.APPROVED
								};
								CarOwnerSubscription.create(subscription, function (err, createdObject) {
									if (!err) {
										logger.writeLog('Subscribed user: ' + req.user.userId + ' to shop: ' + invite.shop);
										invite.status = ShopInvite.STATUS_JOINED;
										invite.save(function (err) {
											if (!err) {
												let response = responseMessages.commonResponse(responseMessages.SUCCESS);
												return res.status(200).json(response);
											} else {
												let response = responseMessages.commonResponse(responseMessages.FAIL);
												return res.status(500).json(response);
											}
										})
										let response = responseMessages.commonResponse(responseMessages.SUCCESS);
										return res.status(200).json(response);
									} else {
										logger.writeLog('Failed to subscribing user: ' + req.user.userId + ' to shop: ' + invite.shop);
										let errorData = mongooseErrorExtractor.getErrorData(err);
										let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
										return res.status(500).json(response);
									}
								});
							}
						});
					} else {
						let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
						return res.status(403).json(response);
					}
				});
			}
		});
	};

})();

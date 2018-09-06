
(function () {

	'use strict';

	var async = require('async');
	var util = require('../lib/util');
	var _ = require('lodash');
	var Shop = require('../models/shop');
	var User = require('../models/user');
	var UserManagedShop = require('../models/user-managed-shop');
	var responseMessages = require('../lib/response-messages');
	var mongooseErrorExtractor = require('../lib/mongoose-error-extractor');
	var isEmpty = require('is-empty');
	var CarOwnerSubscription = require('../models/car-owner-subscription');
	var ShopInvite = require('../models/shop-invite');
	var Vehicle = require('../models/vehicle');
	var VehicleRepairHistory = require('../models/vehicle-repair-history');
	var VehicleRecommendation = require('../models/vehicle-recommendation');
	var PushNotificationRequest = require('../models/push-notification-request');
	var BookingRequest = require('../models/booking-request');

	/* GET list/search all shops. */
	exports.list = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('List shops');

		var query = Shop.getSearchQuery(req.query);
		var pageNo = req.query.pageNo ? req.query.pageNo : 1;
		var limit = req.query.limit ? req.query.limit : 10;
		var sort = { createdAt: -1 };

		if (req.query.sort) {
			var sortOrder = req.query.sort.charAt(0) == '-' ? '-1' : 1;
			var sortField = _.trim(req.query.sort, '-');
			sort = { [sortField]: sortOrder };
		} 

		async.waterfall([
			function (callback) {
				if (!isEmpty(req.query.managedBy) || !isEmpty(req.query.shopOwner)) {
					// Filter shops managed by this user
					let ownerOrManager = isEmpty(req.query.managedBy) ? req.query.shopOwner : req.query.managedBy;
					UserManagedShop.getShopIdsByManagedUserId(ownerOrManager, function (err, managedShopIds) {
						if (err) {
							let response = responseMessages.commonResponse(responseMessages.FAIL);
							return res.status(500).json(response);
						} else if (managedShopIds.length === 0 && req.query.managedBy) {
							let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'shops': { 'total': 0, 'data': [] } });
							return res.status(200).json(response);
						} else {
							let ids = [];
							for (let i = 0; i < managedShopIds.length; i++) {
								ids.push(managedShopIds[i].shopId);
							}
							// Check if managedBy filter is specified or shopOwner
							// If managedBy is specified return shops managed by this user
							// If shopOwner is specified return shops managed by the user and owned by the user
							if (req.query.managedBy) {
								req.query.shopIds = ids;
							} else {
								req.query.managedShopIds = ids;
							}
							query = Shop.getSearchQuery(req.query);
							return callback();
						}
					});
				} else { return callback(); }
			},
			function (callback) {
				Shop.getCount(query, function (err, count) {
					callback(err, count);
				});
			}
		], function (err, count) {
			if (err) {
				var response = responseMessages.commonResponse(responseMessages.FAIL);
				res.status(500).json(response);
			} else {
				Shop.getAll(query, pageNo, limit, sort, function (err, shops) {
					if (!err) {
						processShops(shops, req.user.userId, function (err, data) {
							let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'shops': { 'total': count, 'data': data } });
							return res.status(200).json(response);
						});
					} else {
						var response = responseMessages.commonResponse(responseMessages.FAIL);
						res.status(500).json(response);
					}
				});
			}
		});
	};

	/**
	 * Itereate eachshop and get the user subscription status
	 * @param [{object}] shops - Shop list
	 * @param {String} userId - ObjectId of the user
	 * @callback request callback
	 */
	// TODO: Need to findout a better way to implement this
	function processShops(shops, userId, callback) {
		async.map(shops, function (shop, callback) {
			CarOwnerSubscription.get({ shopId: shop._id, userId: userId }, (err, subscription) => {
				var subscriptionStatus = -1;
				var subscriptionId = null;
				if (subscription) {
					subscriptionStatus = subscription.status;
					subscriptionId = subscription._id;
				}
				shop = responseMessages.shop(shop, subscriptionStatus, subscriptionId);
				callback(err, shop);
			});
		}, function (err, results) {
			callback(err, results)
		});
	}

	/* POST Create new shop */
	exports.create = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('Create shop');

		// Allow Create
		async.waterfall([
			function (callback) {
				// Check if shop owner UserId is valid
				if (!isEmpty(req.body.shopOwner)) {
					User.get({ _id: req.body.shopOwner }, (err, user) => {
						if (err || !user) {
							var response = responseMessages.commonResponse(responseMessages.INVALID_USER_ID);
							return res.status(400).json(response);
						} else { callback(); }
					});
				} else { callback(); }
			}, function () {
				// Set createdById
				req.body.createdById = req.user.userId;

				Shop.create(req.body, function (err, shop) {
					if (!err) {
						// User doesn't have permission to create shop but has permission to create managed shop
						if (!util.hasPermission('shop.create', req.user.pemissions) && util.hasPermission('shop.create-managed-shop', req.user.pemissions)) {
							let managedShop = {
								userId: req.user.userId,
								shopId: shop._id,
								createdById: req.user.userId
							};
							UserManagedShop.create(managedShop, function (err, result) {
								if (!err) {
									logger.writeLog('Created association between shop: ' + shop._id + ' and user: ' + req.user.userId);
								} else {
									logger.writeLog('Couldn\'t create association between shop: ' + shop._id + ' and user: ' + req.user.userId);
								}
								var data = responseMessages.formatCreatedObject(shop);
								var response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'shop': data });
								return res.status(200).json(response);
							});
						} else {
							var data = responseMessages.formatCreatedObject(shop);
							var response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'shop': data });
							return res.status(200).json(response);
						}
					} else {
						var errorData = mongooseErrorExtractor.getErrorData(err);
						var response = responseMessages.commonResponse(errorData.code, errorData.attribute);
						return res.status(400).json(response);
					}
				});
			}
		], function (err) {
			var response = responseMessages.commonResponse(responseMessages.FAIL);
			return res.status(400).json(response);
		});
	};

	/* PUT update shop details. */
	exports.update = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('Update shop');

		Shop.get({ _id: req.params.id }, (err, shop) => {
			if (shop) {
				if (req.user.userType != User.UT_SYS_USER && !isEmpty(shop.shopOwner) && !shop.shopOwner._id && shop.shopOwner._id != req.user.userId) {
					// Check if the user is a system user/shop owner/shop has no owner
					let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
					return res.status(403).json(response);
				}
				req.body.updatedById = req.user.userId;
				// We shouldn't allow updating subscribers
				delete req.body.carOwners;

				async.waterfall([
					function (callback) {
						// User is a super admin
						if (util.hasPermission('shop.update', req.user.pemissions)) {
							return callback();
						} else if (util.hasPermission('shop.update-managed-shop', req.user.pemissions)) {
							// User is area manager
							UserManagedShop.get({ userId: req.user.userId, shopId: req.params.id }, function (err, managedShop) {
								if (!err && managedShop) {
									return callback();
								} else {
									logger.writeLog('User ' + req.user.userId + 'isn\'t a manager of shop ' + req.params.id);
									let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
									return res.status(403).json(response);
								}
							});
						} else {
							// User is a shop owner
							if (shop.shopOwner && shop.shopOwner._id && shop.shopOwner._id == req.user.userId) {
								delete req.body.shopOwner;
								return callback();
							} else {
								logger.writeLog('User ' + req.user.userId + 'isn\'t the owner of shop ' + req.params.id);
								let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
								return res.status(403).json(response);
							}
						}
					}, function (callback) {
						// Check if shop owner UserId is valid
						if (!isEmpty(req.body.shopOwner)) {
							User.get({ _id: req.body.shopOwner }, (err, user) => {
								if (err || !user) {
									var response = responseMessages.commonResponse(responseMessages.INVALID_USER_ID);
									return res.status(400).json(response);
								} else { callback(); }
							});
						} else { callback(); }
					}, function () {
						Shop.updateById({ _id: req.params.id }, req.body, function (err, result) {
							if (!err) {
								var response = responseMessages.commonResponse(responseMessages.SUCCESS);
								return res.status(200).json(response);
							} else {
								var errorData = mongooseErrorExtractor.getErrorData(err);
								var response = responseMessages.commonResponse(errorData.code, errorData.attribute);
								return res.status(400).json(response);
							}
						});
					}], function (err) {
						var response = responseMessages.commonResponse(responseMessages.FAIL);
						return res.status(500).json(response);
					});
			} else {
				var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
				return res.status(404).json(response);
			}
		});
	};

	/* GET Single shop model. */
	exports.get = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('Get shop');

		Shop.get({ _id: req.params.id }, (err, shop) => {
			if (shop) {
				CarOwnerSubscription.get({ shopId: shop._id, userId: req.user.userId }, (err, subscription) => {
					var subscriptionStatus = -1;
					var subscriptionId = null;
					if (subscription) {
						subscriptionStatus = subscription.status;
						subscriptionId = subscription._id;
					}
					let shopInfo = responseMessages.shop(shop, subscriptionStatus, subscriptionId);
					let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'shop': shopInfo });
					return res.status(200).json(response);
				});
			} else {
				var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
				return res.status(404).json(response);
			}
		});
	};

	/* DELETE delete shop. */
	exports.delete = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('Delete shop');

		async.waterfall([
			function (callback) {
				if (util.hasPermission('shop.delete', req.user.pemissions)) {
					return callback(null, true);
				} else if (util.hasPermission('shop.delete-managed-shop', req.user.pemissions)) {
					UserManagedShop.get({ userId: req.user.userId, shopId: req.params.id }, function (err, managedShop) {
						if (!err && managedShop) {
							return callback(null, true);
						} else {
							return callback(null, false);
						}
					});
				} else {
					return callback(null, false);
				}
			}, function (hasPermission, callback) {
				Shop.get({ _id: req.params.id }, (err, shop) => {
					if (err) {
						let response = responseMessages.commonResponse(responseMessages.FAIL);
						return res.status(500).json(response);
					} else if (shop) {
						// User has permission or owns the shop record
						if (hasPermission || (shop.shopOwner && shop.shopOwner._id && shop.shopOwner._id == req.user.userId)) {
							return callback();
						} else {
							let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
							return res.status(403).json(response);
						}
					} else {
						let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
						return res.status(404).json(response);
					}
				});
			}, function (callback) {

				if (!isEmpty(req.query.force) && (req.query.force === true || req.query.force == 1 || req.query.force == 'true')) {
					return callback();
				} else {
					async.parallel([
						// Look for dependencies
						function (cb) {
							CarOwnerSubscription.get({ shopId: req.params.id }, (err, subscription) => {
								cb(err, subscription);
							});
						}, function (cb) {
							ShopInvite.get({ shop: req.params.id }, function (err, invite) {
								cb(err, invite);
							});
						}, function (cb) {
							Vehicle.get({ shopId: req.params.id }, function (err, vehicle) {
								cb(err, vehicle);
							});
						}, function (cb) {
							PushNotificationRequest.get({ shopId: req.params.id }, (err, pnrequest) => {
								cb(err, pnrequest);
							});
						}, function (cb) {
							BookingRequest.get({ shop: req.params.id }, function (err, bookingrequest) {
								cb(err, bookingrequest);
							});
						}, function (cb) {
							VehicleRecommendation.get({ shopId: req.params.id }, function (err, recommendation) {
								cb(err, recommendation);
							});
						}, function (cb) {
							VehicleRepairHistory.get({ shopId: req.params.id }, function (err, history) {
								cb(err, history);
							});
						}
					], function (err, results) {
						if (err) {
							let response = responseMessages.commonResponse(responseMessages.FAIL);
							return res.status(500).json(response);
						} else {
							// If at least one depency exists prevent deletion
							for (let i = 0; i < results.length; i++) {
								if (results[i]) {
									let response = responseMessages.commonResponse(responseMessages.RECORD_HAS_DEPENDENCIES);
									return res.status(412).json(response);
								}
							}
							return callback();
						}
					});
				}
			}
		], function () {
			// TODO: Unsubscribe users from the shop
			// TODO: Remove assets of the shop such as images
			Shop.get({ _id: req.params.id }, function (err, result) {
				if (!err) {
					result.remove(function (remerror, rem) {
						if (remerror) {
							var response = responseMessages.commonResponse(responseMessages.FAIL);
							return res.status(500).json(response);
						} else {
							var response = responseMessages.commonResponse(responseMessages.SUCCESS);
							return res.status(200).json(response);
						}
					});
				} else {
					var response = responseMessages.commonResponse(responseMessages.FAIL);
					return res.status(500).json(response);
				}
			});
		});
	};

	/* GET list/search all shops. */
	exports.getCarOwners = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('List car owners of shops: ' + req.params.id);

		async.waterfall([
			function (callback) {
				Shop.get({ _id: req.params.id }, (err, shop) => {
					if (shop) {
						// Check permission
						if (!util.hasPermission('shop.view', req.user.pemissions) &&
							shop.shopOwner && shop.shopOwner._id && shop.shopOwner._id != req.user.userId) {
							let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
							return res.status(403).json(response);
						} else { return callback(); }
					} else {
						let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
						return res.status(404).json(response);
					}
				});
			},
			function (callback) {
				CarOwnerSubscription.getUserIdsByShopId(req.params.id, req.query, function (err, userIds) {
					if (!err) {
						if (userIds.length === 0) {
							// This is to prevent mongodb $in empty[] returns all results
							let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'users': { 'total': userIds.length, 'data': userIds } });
							return res.status(200).json(response);
						} else { callback(userIds); }
					} else {
						let response = responseMessages.commonResponse(responseMessages.FAIL);
						return res.status(500).json(response);
					}
				});
			}
		], function (userIds) {
			// Get userIds for query
			let ids = [];
			for (let i = 0; i < userIds.length; i++) {
				ids.push(userIds[i].userId);
			}
			req.query.userIds = ids;
			let query = User.getSearchQuery(req.query);
			let pageNo = req.query.pageNo ? req.query.pageNo : 1;
			let limit = req.query.limit ? req.query.limit : 10;
			let sort = { createdAt: -1 };

			if (req.query.sort) {
				let sortOrder = req.query.sort.charAt(0) == '-' ? '-1' : 1;
				let sortField = _.trim(req.query.sort, '-');
				sort = { [sortField]: sortOrder };
			}

			User.getAll(query, pageNo, limit, sort, function (err, users) {
				if (!err) {
					var data = [];
					for (var i = 0; i < users.length; i++) {
						var user = responseMessages.user(users[i]);
						data.push(user);
					}
					let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'users': { 'total': userIds.length, 'data': data } });
					res.status(200).json(response);
				} else {
					var response = responseMessages.commonResponse(responseMessages.FAIL);
					res.status(400).json(response);
				}
			});
		});
	};

})();

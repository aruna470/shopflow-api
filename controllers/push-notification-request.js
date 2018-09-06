
(function () {

	'use strict';

	var async = require('async');
	let config = require('config');
	var isEmpty = require('is-empty');
	var util = require('../lib/util');
	var PushNotificationRequest = require('../models/push-notification-request');
	var Shop = require('../models/shop');
	var UserManagedShops = require('../models/user-managed-shop');
	var responseMessages = require('../lib/response-messages');
	var mongooseErrorExtractor = require('../lib/mongoose-error-extractor');
	var nsDefTitle = config.get('pushNotificationServer.defaultTitle');
	var PushNotificationInfo = require('../models/push-notification-info');


	/* POST Create new push notification request */
	exports.create = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('Create Push notification request');

		// Set createdById
		req.body.createdById = req.user.userId;
		req.body.updatedById = null;
		req.body.title = isEmpty(req.body.title) ? nsDefTitle : req.body.title;
		PushNotificationRequest.create(req.body, function (err, pushNotificationRequest) {
			if (!err) {
				var data = responseMessages.formatCreatedObject(pushNotificationRequest);
				var response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'pushNotificationRequest': data });
				res.status(200).json(response);
			} else {
				var errorData = mongooseErrorExtractor.getErrorData(err);
				var response = responseMessages.commonResponse(errorData.code, errorData.attribute);
				res.status(400).json(response);
			}
		});
	};

	/* GET List push notifications requests */
	exports.list = function (req, res, next) {
		var logger = req.logger;
        logger.writeLog('List push notification requests');

		var query = PushNotificationRequest.getSearchQuery(req.query);
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
				if (util.hasPermission('push-notification-request.list', req.user.pemissions)) {
					// Allowed for any shop
					callback(null);
				} else if (util.hasPermission('push-notification-request.list-shop', req.user.pemissions)) {
					// Allowed only for shop owner owns shops
					Shop.get({_id: req.query.shopId, shopOwner: req.user.userId}, function (err, shop) {
						if (!shop) {
							var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
							return res.status(403).json(response);
						} else {
							callback(null);
						}
					});
				} else if (util.hasPermission('push-notification-request.list-manage-shop', req.user.pemissions)) {
					// Allowed only for user managed shops (area manager)
					UserManagedShops.get({shopId: req.query.shopId, userId: req.user.userId}, function (err, managedShop) {
						if (!managedShop) {
							var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
							return res.status(403).json(response);
						} else {
							callback(null);
						}
					});
				}
			},
            function (callback) {
                PushNotificationRequest.getCount(query, function (err, count) {
                    callback(err, count);
                });
            }
        ], function (err, count) {
            if (err) {
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                return res.status(400).json(response);
            } else {
                PushNotificationRequest.getAll(query, pageNo, limit, sort, function (err, pushNotificationRequests) {
                    if (!err) {
                        var data = [];
                        for (var i = 0; i < pushNotificationRequests.length; i++) {
                            var pushNotificationRequest = responseMessages.pushNotificationRequest(pushNotificationRequests[i]);
                            data.push(pushNotificationRequest);
                        }
                        response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'pushNotificationRequests': { 'total': count, 'data': data } });
                        return res.status(200).json(response);
                    } else {
                        var response = responseMessages.commonResponse(responseMessages.FAIL);
                        return res.status(400).json(response);
                    }
                });
            }
        });
	};

	/* GET single push notifications request details */
	exports.get = function (req, res, next) {
		var logger = req.logger;
        logger.writeLog('View push notification request details');

		let userId = req.user.userId;
		let pushNotificationRequestId = req.params.id;

		async.waterfall([
			function (callback) {
                PushNotificationRequest.get({_id: pushNotificationRequestId}, function (err, pushNotificationRequest) {
					if (pushNotificationRequest) {
						callback(null, pushNotificationRequest);
					} else {
						var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                        return res.status(404).json(response);
					}
                });
			},
            function (pushNotificationRequest, callback) {
				if (util.hasPermission('push-notification-request.view', req.user.pemissions)) {
					// Allowed for any shop
					callback(null, pushNotificationRequest);
				}  else if (util.hasPermission('push-notification-request.view-shop', req.user.pemissions)) {
					// Allowed only for shop owner owns shops
					Shop.get({_id: pushNotificationRequest.shopId, shopOwner: req.user.userId}, function (err, shop) {
						if (!shop) {
							var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
							return res.status(403).json(response);
						} else {
							callback(null, pushNotificationRequest);
						}
					});
				} else if (util.hasPermission('push-notification-request.view-manage-shop', req.user.pemissions)) {
					// Allowed only for user managed shops (area manager)
					UserManagedShops.get({shopId: pushNotificationRequest.shopId, userId: req.user.userId}, function (err, managedShop) {
						if (!managedShop) {
							var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
							return res.status(403).json(response);
						} else {
							callback(null, pushNotificationRequest);
						}
					});
				} else {
					var response = responseMessages.commonResponse(responseMessages.FAIL);
					return res.status(400).json(response);
				}
            }
        ], function (err, pushNotificationRequest) {
			if (err) {
				var response = responseMessages.commonResponse(responseMessages.FAIL);
                return res.status(400).json(response);
			} else {
				let data = responseMessages.pushNotificationRequest(pushNotificationRequest);
				let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'pushNotificationRequest': data });
				return res.status(200).json(response);
			}
        });
	};

	/* DELETE delete push notification requests. */
	exports.delete = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('Delete push notification request');

		let userId = req.user.userId;
		let pushNotificationRequestId = req.params.id;

		async.waterfall([
			function (callback) {
                PushNotificationRequest.get({_id: pushNotificationRequestId}, function (err, pushNotificationRequest) {
					if (pushNotificationRequest) {
						callback(null, pushNotificationRequest);
					} else {
						var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                        return res.status(404).json(response);
					}
                });
			},
            function (pushNotificationRequest, callback) {
				if (util.hasPermission('push-notification-request.delete', req.user.pemissions)) {
					// Allowed for any shop
					callback(null, pushNotificationRequest);
				}  else if (util.hasPermission('push-notification-request.delete-shop', req.user.pemissions)) {
					// Allowed only for shop owner owns shops
					Shop.get({_id: pushNotificationRequest.shopId, shopOwner: req.user.userId}, function (err, shop) {
						if (!shop) {
							var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
							return res.status(403).json(response);
						} else {
							callback(null, pushNotificationRequest);
						}
					});
				} else if (util.hasPermission('push-notification-request.delete-manage-shop', req.user.pemissions)) {
					// Allowed only for user managed shops (area manager)
					UserManagedShops.get({shopId: pushNotificationRequest.shopId, userId: req.user.userId}, function (err, managedShop) {
						if (!managedShop) {
							var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
							return res.status(403).json(response);
						} else {
							callback(null, pushNotificationRequest);
						}
					});
				} else {
					var response = responseMessages.commonResponse(responseMessages.FAIL);
					return res.status(400).json(response);
				}
            }
        ], function (err, pushNotificationRequest) {
			PushNotificationRequest.removeById({ _id: pushNotificationRequest._id }, function (err, result) {
				if (!err) {
					PushNotificationInfo.deleteMany({ pushNotificationRequestId: pushNotificationRequest._id }, function (err) {
						if (err) {
							logger.writeLog('Error while deleting associated push notification info');
						} else {
							logger.writeLog('Associated push notification info deleted.');
						}
					});
					var response = responseMessages.commonResponse(responseMessages.SUCCESS);
					res.status(200).json(response);
				} else {
					var response = responseMessages.commonResponse(responseMessages.FAIL);
					res.status(400).json(response);
				}
			});
        });
	};

})();

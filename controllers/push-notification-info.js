
(function () {

	'use strict';

	var async = require('async');
	var _ = require('lodash');
	var util = require('../lib/util');
	var _ = require('lodash');
	var PushNotificationInfo = require('../models/push-notification-info');
	var User = require('../models/user');
	var responseMessages = require('../lib/response-messages');
	var mongooseErrorExtractor = require('../lib/mongoose-error-extractor');

	/* list/search all push notification info. */
	exports.list = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('List push notification info');

		if (req.user.userType != User.UT_SYS_USER) {
			// If requesting user is non system user forcefully set user id to filter
			// his own records only
			req.query.userId = req.user.userId;
		}

		var query = PushNotificationInfo.getSearchQuery(req.query);
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
				PushNotificationInfo.getCount(query, function (err, count) {
					callback(err, count);
				});
			}
		], function (err, count) {
			if (err) {
				var response = responseMessages.commonResponse(responseMessages.FAIL);
				res.status(400).json(response);
			} else {
				PushNotificationInfo.getAll(query, pageNo, limit, sort, function (err, pushNotificationInfo) {
					if (!err) {
						var data = [];
						for (var i = 0; i < pushNotificationInfo.length; i++) {
							var notification = responseMessages.pushNotificationInfo(pushNotificationInfo[i]);
							data.push(notification);
						}
						let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'pushNotificationInfo': { 'total': count, 'data': data } });
						res.status(200).json(response);
					} else {
						var response = responseMessages.commonResponse(responseMessages.FAIL);
						res.status(400).json(response);
					}
				});
			}
		});
	};

	/* Get push notification info. */
	exports.get = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('Get push notification info: ' + req.params.id);

		let query = { _id: req.params.id };
		if (req.user.userType != User.UT_SYS_USER) {
			// If requesting user is non system user forcefully set user id to filter
			// his own records only
			query.userId = req.user.userId;
		}

		PushNotificationInfo.get(query, function (err, pushNotificationInfo) {
			if (!err) {
				let notification = responseMessages.pushNotificationInfo(pushNotificationInfo);
				let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'pushNotificationInfo': notification });
				res.status(200).json(response);
			} else {
				var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
				res.status(404).json(response);
			}
		});
	};

	/* Delete push notification info. */
	exports.delete = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('Delete push notification info');

		PushNotificationInfo.get({ _id: req.params.id }, (err, pushNotificationInfo) => {
			if (pushNotificationInfo) {
				if (req.user.userType != User.UT_SYS_USER && req.user.userId != pushNotificationInfo.userId) {
					var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
					res.status(403).json(response);
				} else {
					PushNotificationInfo.removeById({ _id: req.params.id }, function (err, result) {
						if (!err) {
							var response = responseMessages.commonResponse(responseMessages.SUCCESS);
							res.status(200).json(response);
						} else {
							var response = responseMessages.commonResponse(responseMessages.FAIL);
							res.status(400).json(response);
						}
					});
				}
			} else {
				var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
				res.status(404).json(response);
			}
		});
	};

	/* Get message counts. */
	exports.msgCount = function (req, res, next) {
		let logger = req.logger;
		logger.writeLog('Retrieve message counts');

		async.waterfall([
			function (callback) {
				PushNotificationInfo.getCount({ userId: req.user.userId, isDuplicate: PushNotificationInfo.NOT_DUPLICATE }, function (err, total) {
					callback(err, total);
				});
			},
			function (total, callback) {
				let query = { userId: req.user.userId, isDuplicate: PushNotificationInfo.NOT_DUPLICATE, readStatus: PushNotificationInfo.UNREAD }
				PushNotificationInfo.getCount(query, function (err, unreadCount) {
					callback(err, total, unreadCount);
				});
			}
		], function (err, total, unreadCount) {
			if (err) {
				let response = responseMessages.commonResponse(responseMessages.FAIL);
				res.status(400).json(response);
			} else {
				let msgCounts = responseMessages.pushNotificationInfoMsgCount(total, unreadCount);
				let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'msgCounts': msgCounts });
				res.status(200).json(response);
			}
		});
	};

	/* Mark message as read. */
	exports.markAsRead = function (req, res, next) {
		let logger = req.logger;
		logger.writeLog('Mark message as read');

		async.waterfall([
			function (callback) {
				PushNotificationInfo.get({ _id: req.params.id }, function (err, pushNotificationInfo) {
					callback(err, pushNotificationInfo);
				});
			},
		], function (err, pushNotificationInfo) {
			if (pushNotificationInfo) {
				if (pushNotificationInfo.userId == req.user.userId) {
					PushNotificationInfo.updateById({ _id: req.params.id }, { readStatus: PushNotificationInfo.READ }, function (err, response) {
						if (!err) {
							let response = responseMessages.commonResponse(responseMessages.SUCCESS);
							return res.status(200).json(response);
						} else {
							let response = responseMessages.commonResponse(responseMessages.FAIL);
							return res.status(400).json(response);
						}
					});
				} else {
					logger.writeLog('User has no rights to change read status excepts his own');
					let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
					return res.status(403).json(response);
				}
			} else {
				let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
				return res.status(404).json(response);
			}
		});
	}
})();


/**
 * @name push-notification.js
 * @fileOverview Handle push notification related stuff
 * @author Aruna Attanayake
 */

(function() {

  	'use strict';

	let Client = require('node-rest-client').Client;
  	let config = require('config');
  	let async = require('async');
  	let isEmpty = require('is-empty');

  	let PushNotificationRequest = require('../models/push-notification-request');
  	let PushNotificationInfo = require('../models/push-notification-info');
  	let DeviceInfo = require('../models/device-info');
	let Logger = require('./logger').Logger;
	var CarOwnerSubscription = require('../models/car-owner-subscription');

  	// Notification server related params
  	let nsBaseUrl = config.get('pushNotificationServer.baseUrl');
  	let nsApiKey = config.get('pushNotificationServer.apiKey');
  	let nsApiSecret = config.get('pushNotificationServer.apiSecret');

  	// Initialize logger
  	let log = new Logger();
  	log.logData.logType = log.PN_DISPATCHER;
  	log.logData.action = 'pushNotificationDispatcher';

	/**
	 * Fetch pushnotification requests from the db and send to intended recepients
	 */
	function pushNotificationDispatcher() {
		getNextPushNotificationRequestInTheQueue(function(err, pushNotificationRequest) {
			if (!err) {
				// Sending push notifications for list of users 
				if (!isEmpty(pushNotificationRequest[0]) && !isEmpty(pushNotificationRequest[0].users)) {
					updateStatus(pushNotificationRequest[0]._id, PushNotificationRequest.INPROGRESS, function(err) {
						if (!err) {
							batchProcessUsers(pushNotificationRequest[0], function(err) {
								updateStatus(pushNotificationRequest[0]._id, PushNotificationRequest.FINISHED, function(err) {
								});
							});
						}
					});
				}

				// Sending push notifications to shops given in the list
				if (!isEmpty(pushNotificationRequest[0]) && !isEmpty(pushNotificationRequest[0].shopIds)) {
					updateStatus(pushNotificationRequest[0]._id, PushNotificationRequest.INPROGRESS, function(err) {
						if (!err) {
							processShops(pushNotificationRequest[0].shopIds, pushNotificationRequest[0], function(err) {
								log.writeLog('Finished sending push notifications to all the shops');
								updateStatus(pushNotificationRequest[0]._id, PushNotificationRequest.FINISHED, function(err) {
								});
							});
						}
					});
				}
			} else {
				log.writeLog('Error while retrieving pushnotification requests');
			}
		});
	}

	/**
	 * Iterate shops comes on the push notification request.
	 * @param {string[]} shops - List of shops comes on the request
	 * @param {object} pushNotificationRequest - Pushnotification request object
	 * @callback request callback
	 */
	function processShops(shops, pushNotificationRequest, callback) {
		async.mapSeries(shops, function(shopId, callback) {
			log.writeLog('Processing shop ' + shopId);
			batchProcessShop(shopId, pushNotificationRequest, function(err) {
				log.writeLog('Finished processing shop ' + shopId);
				callback(null);
			});
		}, function(err) {
			log.writeLog('Shop batch processing is over');
			callback(null);
		});
	}

	/**
	 * Update pushnotification request status.
	 * @param {string} id - Push notification request object id
	 * @param {number} status - Status to be updated. Inprogress, Finished
	 * @callback request callback
	 */
	function updateStatus(id, status, callback) {
		PushNotificationRequest.updateById({_id: id}, {status: status}, function(err, result) {
	        if (!err) {
	        	log.writeLog('Status updated. Status:' + status);
	        	callback(null);
	        } else {
	            log.writeLog('Status update failed. Status:' + status);
	            callback(err);
	        }
	    });
	}

	/**
	 * Batch process users in the given shop.
	 * @param {string} shopId - Shop id
	 * @param {object} pushNotificationRequest - Pushnotification request object
	 * @callback request cb
	 */
	function batchProcessShop(shopId, pushNotificationRequest, cb) {
		
		let limit = 50;
		let query = CarOwnerSubscription.getSearchQuery({shopId: shopId, status: CarOwnerSubscription.APPROVED});
		var pageNo = 1;
		var exit = false;
		let sort = {createdAt: -1};

		async.doWhilst(
			function(callback) {
				CarOwnerSubscription.getAll(query, pageNo, limit, sort, function (err, subscriptions) {
					if (!err) {
						pageNo += 1;
						exit = subscriptions.length < limit;;
						if (!isEmpty(subscriptions)) {
							batchProcessShopUsers(subscriptions, pushNotificationRequest, function(err) {
								callback(null, pageNo);
							});
						} else {
							callback(null, pageNo);
						}
					} else {
						callback(err);
					}
				});
			},
			function() {
				return !exit;
			},
			function (err) {
				if (err) {
					log.writeLog('Error occur whie retrieving data. Error data:' + JSON.stringify(err));
				}
				cb(null);
			}
		);
	}

	/**
	 * Itereate each user in the result set.
	 * @param {object[]} subscriptions - List of user subscription objects
	 * @param {object} pushNotificationRequest - Pushnotification request object
	 * @callback request callback
	 */
	function batchProcessShopUsers(subscriptions, pushNotificationRequest, callback) {
		log.writeLog('Batch processing shop users');
		async.mapSeries(subscriptions, function(subscription, callback) {
			sendToUser(subscription.user.id, pushNotificationRequest, function(err) {
				callback(null);
			});
		}, function(err) {
			log.writeLog('Shop users batch processing is over');
			callback(null);
		});
	}

	/**
	 * Pushnotification reuqest can have multiple users. This function iterate through
	 * each user
	 * @param {Object} pushNotificationRequest - Push notification request object
	 * @callback request callback
	 */
	function batchProcessUsers(pushNotificationRequest, callback) {
		log.writeLog('Batch processing users');
		let users = pushNotificationRequest.users;

		async.mapSeries(users, function(user, callback) {
			sendToUser(user, pushNotificationRequest, function(err) {
				callback(null);
			}); 
		}, function(err) {
			log.writeLog('User batch processing is over');
			callback(null);
		});
	}

	/**
	 * Process single user. Findout device details 
	 * @param {string} userId - user object id
	 * @param {object} pushNotificationRequest - Push notification request object
	 * @callback request callback
	 */
	function sendToUser(userId, pushNotificationRequest, callback) {
		log.writeLog('Sending notification to user:' + userId);
		DeviceInfo.getAll({userId: userId}, (err, devices) => {
		    if (!isEmpty(devices)) {
		    	let index = 0;
		    	let isDuplicate = 0;
		    	async.mapSeries(devices, function(device, callback) {
					send(device.endpointArn, pushNotificationRequest.title, pushNotificationRequest.text, device.deviceType, function (err) {
			    		var status = PushNotificationInfo.DELIVERED;
			    		if (err) {
			    			status = PushNotificationInfo.FAILED;
			    		}

			    		// If same user owns 2 devices we flag other record as duplicate
			    		// To avoid sending duplicate records with the notification list
			    		if (index > 0) {
			    			isDuplicate = 1;
			    		}

			    		index++;

			    		addPushNotificationInfo(pushNotificationRequest, userId, status, device.token, isDuplicate, function(err) {
			    			callback(err);
			    		});
			    	}); 
				}, function(err) {
					log.writeLog('Device batch processing is over');
					callback(null);
				});
		    } else {
				log.writeLog('Device info not found for user: ' + userId + ' creating push notification info without sending push notifcation');
				addPushNotificationInfo(pushNotificationRequest, userId, PushNotificationInfo.FAILED, null, 0, function (err) {
					callback(err);
				});
		    }
		});
	}

	/**
	 * Save push notification details to the db 
	 * @param {object} pushNotificationRequest - Push notification request object
	 * @param {string} userId - user object id
	 * @param {number} status - Status to be updated. Pending, Delivered, Failed
	 * @param {string} token - Device token
	 * @callback request callback
	 */
	function addPushNotificationInfo(pushNotificationRequest, userId, status, token, isDuplicate, callback) {
		let data = {
			pushNotificationRequestId: pushNotificationRequest._id,
			userId: userId,
			status: status,
			token: token,
			shopId: pushNotificationRequest.shopId,
			isDuplicate: isDuplicate
		};

		if (pushNotificationRequest.type == PushNotificationRequest.NORMAL) {
			PushNotificationInfo.create(data, function(err, pushNotificationInfo) {
				if (!err) {
					log.writeLog('Push notification info saved. UserId:' + userId);
				} else {
					log.writeLog('Push notification info save failed. UserId:' + userId);
				}

				callback(err);
			});
		} else {
			log.writeLog('Not a normal push notification. No need to save. UserId:' + userId);
			callback(null);
		}
	}

	/**
	 * Retrieve next push notification request in the queue 
	 * @callback request callback
	 */
	function getNextPushNotificationRequestInTheQueue(callback) {
		let query = {status:0};
		let sort = {createdAt: -1};
		let pageNo = 1;
		let limit = 1;
		PushNotificationRequest.getAll(query, pageNo, limit, sort, callback);
	}

	/**
	 * Submit push notification to push notification server
	 * @param {string} endpointArn - Endpoint ARN. Obtained via AWS
	 * @param {string} title - Push notification message title
	 * @param {string} body - Push notification body text
	 * @param {number} deviceType - Type of the device. 1 - Android, 2 - IOS
	 * @callback request callback
	 */
	function send(endpointArn, title, body, deviceType, callback) {
		var client = new Client();

		let args = {
		    data: {
		    	'endpointArn': endpointArn,
		    	'title': title,
		    	'message': body,
		    	'deviceType': deviceType
		    },
		    headers: {"api-key": nsApiKey, "api-secret": nsApiSecret, "Content-Type": "application/json"}
		};

		let req = client.post(nsBaseUrl + 'push-notification', args, function (data, response) {
		    if (response.statusCode == 200) {
		    	log.writeLog('Push notification sent. Data:' + JSON.stringify(args.data));
		    	callback(null);
		    } else {
		    	log.writeLog('Push notification sending failed. Data:' + JSON.stringify(args.data));
		    	callback('error');
		    }
		});

		req.on('requestTimeout', function (req) {
			log.writeLog('request has expired');
			req.abort();
			callback('error');
		});

		req.on('responseTimeout', function (res) {
			log.writeLog('response has expired');
			callback('error');
		});

		req.on('error', function (err) {
			log.writeLog('request error', err);
			callback('error');
		});
	}

	/**
	 * Register device to notification-server
	 * @param {string} deviceId - Unique deviceId
	 * @param {number} deviceType - Type of the device. 1 - Android, 2 - IOS
	 * @callback request callback
	 */
	function register(deviceId, deviceType, callback) {
		var client = new Client();

		let args = {
			data: {
				'deviceId': deviceId,
				'deviceType': deviceType
			},
			headers: { "api-key": nsApiKey, "api-secret": nsApiSecret, "Content-Type": "application/json" }
		};

		let req = client.post(nsBaseUrl + 'push-notification/register', args, function (data, response) {
			if (response.statusCode == 200) {
				log.writeLog('Successfully registered the device. Endpoint ARN:' + data.data.endpointArn);
				callback(null, data.data.endpointArn);
			} else {
				log.writeLog('Device registration to notification server failed. Data:' + JSON.stringify(args.data));
				callback('error');
			}
		});
		
		req.on('requestTimeout', function (req) {
			log.writeLog('request has expired');
			log.writeLog('Device registration to notification server failed. Data:' + JSON.stringify(args.data));
			req.abort();
			callback('error');
		});

		req.on('responseTimeout', function (res) {
			log.writeLog('response has expired');
			callback('error');
		});

		req.on('error', function (err) {
			log.writeLog('request error', err);
			callback('error');
		});
	}

	/**
	 * Export module functions to be accessed from outside
	 */
	module.exports = {
		pushNotificationDispatcher: pushNotificationDispatcher,
		register: register
	}

})();
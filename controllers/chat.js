(function () {

    'use strict';

    let async = require('async');
    let util = require('../lib/util');
    let config = require('config');
    let isEmpty = require('is-empty');
    let _ = require('lodash');

    let Chat = require('../models/chat');
    let Shop = require('../models/shop');
    let User = require('../models/user');
    let responseMessages = require('../lib/response-messages');
    let mongooseErrorExtractor = require('../lib/mongoose-error-extractor');
    let CarOwnerSubscription = require('../models/car-owner-subscription');
    var PushNotificationRequest = require('../models/push-notification-request');


    /* POST Create new chat message */
    exports.create = function (req, res, next) {
        var logger = req.logger;
        let socketSever = req.socketServer;

        logger.writeLog('Create new chat message');

        async.waterfall([
            function (callback) {
                var userId = null;
                var shopId = req.body.shopId;

                if (util.hasPermission('chat.send-to-shop', req.user.pemissions)) {
                    // Car owner sending message to shop
                    userId = req.user.userId;
                } else if (util.hasPermission('chat.send-to-user', req.user.pemissions)) {
                    // Shop manager sending message to user
                    userId = req.body.receiverId;
                }

                CarOwnerSubscription.get({ userId: userId, shopId: shopId, status: CarOwnerSubscription.APPROVED }, (err, subscription) => {
                    if (err) {
                        logger.writeLog('Unable to retrieve subscription record: ' + JSON.stringify(err));
                        let response = responseMessages.commonResponse(responseMessages.FAIL);
                        return res.status(500).json(response);
                    } else if (!subscription) {
                        // Shop doesn't exists
                        let response = responseMessages.commonResponse(responseMessages.USER_NOT_SUBSCRIBED);
                        return res.status(400).json(response);
                    } else { 
                        return callback(); 
                    }
                });
            }
        ], function () {
            req.body.createdById = req.user.userId;
            req.body.senderId = req.user.userId;

            Chat.create(req.body, function (err, createdObject) {
                if (!err) {
                    logger.writeLog('Chat created for user: ' + req.user.userId + ' to shop: ' + req.body.shopId);

                    let chatMessage = responseMessages.chatMessage(createdObject);
                    socketSever.sendChatNotification(req.body.receiverId, chatMessage, function(status) {
                        var doUpdateStatus = false;
                        if (req.user.userType != User.UT_NORMAL_USER && status != 'success') {
                            // Assume request is comming from shop manager and send push notification to car owner, if offline 
                            doUpdateStatus = true;

                            Shop.get({_id: req.body.shopId}, function (err, shop) {
                                if (!shop) {
                                        // Shop doesn't exists
                                        let response = responseMessages.commonResponse(responseMessages.USER_NOT_SUBSCRIBED);
                                        return res.status(400).json(response);
                                } else {
                                    let pnRequestPayload = {
                                        createdById: req.user.userId,
                                        title: shop.businessName,
                                        text: req.body.message ? req.body.message : config.get('pushNotificationServer.imageOnlyMessage'),
                                        users: [req.body.receiverId],
                                        shopId: req.body.shopId,
                                        type: PushNotificationRequest.CHAT
                                    };
        
                                    PushNotificationRequest.create(pnRequestPayload, function (err, pushNotificationRequest) {
                                        if (!err) {
                                            logger.writeLog('Created Push notification request for chat message');
                                        } else {
                                            logger.writeLog('Faield to create Push notification request for chat message');
                                        }
                                    });
                                }
                            });
                        } else if (status == 'success') {
                            // Request is comming from car owner
                            doUpdateStatus = true;
                        }

                        if (doUpdateStatus) {
                            Chat.updateById({ _id: createdObject._id }, {isNotified: Chat.IS_NOTIFIED_YES}, function (err, result) {
                                if (!err) {
                                    logger.writeLog('Notified status updated.');
                                } else {
                                    logger.writeLog('Notified status update failed.');
                                }
                            });
                        }
                    });

                    let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'chat': chatMessage });
                    return res.status(200).json(response);
                } else {
                    logger.writeLog('Failed to create chat request for user: ' + req.body.userId + ' to shop: ' + req.body.shopId);
                    let errorData = mongooseErrorExtractor.getErrorData(err);
                    let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                    return res.status(400).json(response);
                }
            });
        });
    };

    /* PUT update specific chat details. */
    exports.update = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Update specific chat');

        // Do not allow to update these attributes
        delete req.shopId;
        delete req.receiverId;
        delete req.isNotified;

        req.body.updatedById = req.user.userId;

        async.waterfall([
            function (callback) {
                Chat.get({ _id: req.params.id, createdById: req.user.userId }, (err, chat) => {
                    if (chat) {
                        callback(); 
                    } else {
                        logger.writeLog('Chat not found or permission denied. UserId: ' + req.user.userId);
                        var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                        return res.status(403).json(response);
                    }
                });
            }
        ], function () {
            Chat.updateById({ _id: req.params.id }, req.body, function (err, result) {
                if (!err) {
                    var response = responseMessages.commonResponse(responseMessages.SUCCESS);
                    res.status(200).json(response);
                } else {
                    var errorData = mongooseErrorExtractor.getErrorData(err);
                    var response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                    res.status(400).json(response);
                }
            });
        });
    };

    /* GET chat history */
    exports.list = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('List chat history');

        var query = {};
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
                if (util.hasPermission('chat.list-shop', req.user.pemissions)) {
                    // Shop owner
                    if (isEmpty(req.query.senderId)) {
                        var response = responseMessages.commonResponse(responseMessages.MISSING_MANDATORY_ATTRIBUTE, 'senderId');
                        return res.status(400).json(response);
                    }

                    query = Chat.getSearchQuery(req.query.shopId, req.query.senderId, req.user.userId);

                    Shop.get({_id: req.query.shopId, shopOwner: req.user.userId}, function (err, shop) {
                        if (!shop) {
                            var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                            return res.status(403).json(response);
                        } else {
                            callback(null);
                        }
                    });
                } else if (util.hasPermission('chat.list-own', req.user.pemissions)) {
                    // Car owner
                    CarOwnerSubscription.get({ userId: req.user.userId, shopId: req.query.shopId, status: CarOwnerSubscription.APPROVED }, (err, subscription) => {
                        if (err) {
                            logger.writeLog('Unable to retrieve subscription record: ' + JSON.stringify(err));
                            let response = responseMessages.commonResponse(responseMessages.FAIL);
                            return res.status(500).json(response);
                        } else if (!subscription) {
                            let response = responseMessages.commonResponse(responseMessages.USER_NOT_SUBSCRIBED);
                            return res.status(400).json(response);
                        } else {
                            Shop.get({_id: req.query.shopId}, function (err, shop) {
                                if (!shop) {
                                    var response = responseMessages.commonResponse(responseMessages.FAIL);
                                    return res.status(400).json(response);
                                } else {
                                    query = Chat.getSearchQuery(req.query.shopId, shop.shopOwner, req.user.userId);
                                    callback(null);
                                }
                            });
                        }
                    });
                }
            },
            function (callback) {
                Chat.getCount(query, function (err, count) {
                    callback(err, count);
                });
            }
        ], function (err, count) {
            if (err) {
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                return res.status(400).json(response);
            } else {
                Chat.getAll(query, pageNo, limit, sort, function (err, chatMessages) {
                    if (!err) {
                        var data = [];
                        for (var i = 0; i < chatMessages.length; i++) {
                            var chatMessage = responseMessages.chatMessage(chatMessages[i]);
                            data.push(chatMessage);
                        }
                        response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'chatMessages': { 'total': count, 'data': data } });
                        return res.status(200).json(response);
                    } else {
                        var response = responseMessages.commonResponse(responseMessages.FAIL);
                        return res.status(400).json(response);
                    }
                });
            }
        });
    };
    
    /* GET chat buddies */
    exports.buddies = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('List chat buddies');

        var pageNo = req.query.pageNo ? req.query.pageNo : 1;
        var limit = req.query.limit ? req.query.limit : 10;

        async.waterfall([
            function (callback) {
                if (util.hasPermission('chat.buddies-shop', req.user.pemissions)) {
                    // Shop owner
                    Shop.get({_id: req.query.shopId, shopOwner: req.user.userId}, function (err, shop) {
                        if (!shop) {
                            var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                            return res.status(403).json(response);
                        } else {
                            callback(null);
                        }
                    });
                }
            },
            function (callback) {
                // Get chat buddies by sender
                Chat.getChatBuddies(req.query.shopId, 'sender', function (err, buddiesBySender) {
                    if (buddiesBySender) {
                        callback(null, buddiesBySender);
                    } else {
                        callback(null, []);
                    }
                });
            },
            function (buddiesBySender, callback) {
                // Get chat buddies by receiver
                Chat.getChatBuddies(req.query.shopId, 'receiver', function (err, buddiesByReceiver) {
                    if (buddiesByReceiver) {
                        callback(null, buddiesBySender, buddiesByReceiver);
                    } else {
                        callback(null, [], []);
                    }
                });
            }
        ], function (err, buddiesBySender, buddiesByReceiver) {
            if (err) {
                logger.writeLog('Unexpected error occur');
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                return res.status(400).json(response);
            } else {
                var allBuddies = _.unionBy(buddiesBySender, buddiesByReceiver);
                allBuddies = JSON.parse(JSON.stringify(allBuddies));
                let uniqueBuddies = _.uniqBy(allBuddies, '_id');
                let count = uniqueBuddies.length;

                Chat.popuplateChatBuddies(uniqueBuddies, function (err, chatBuddies) {
                    if (err) {
                        logger.writeLog('Error while retrieving chat buddies. Error: ' + JSON.stringify(err));
                        var response = responseMessages.commonResponse(responseMessages.FAIL);
                        return res.status(400).json(response);
                    } else {
                        var data = [];
                        for (var i = 0; i < chatBuddies.length; i++) {
                            // Avoid sending shop owner`s own details
                            if (!isEmpty(chatBuddies[i]._id)) {
                                if (chatBuddies[i]._id._id != req.user.userId) {
                                    var chatBuddy = responseMessages.chatBuddy(chatBuddies[i]._id);
                                    data.push(chatBuddy);
                                }
                            }
                        }
                        response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'chatBuddies': { 'total': data.length, 'data': data } });
                        return res.status(200).json(response);
                    }
                });
            }
        });
    };

})();

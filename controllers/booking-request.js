(function () {

    'use strict';

    var async = require('async');
    var BookingRequest = require('../models/booking-request');
    var _ = require('lodash');
    var CarOwnerSubscription = require('../models/car-owner-subscription');
    var UserManagedShop = require('../models/user-managed-shop');
    var Shop = require('../models/shop');
    var responseMessages = require('../lib/response-messages');
    var mongooseErrorExtractor = require('../lib/mongoose-error-extractor');
    var util = require('../lib/util');
    let config = require('config');
    var isEmpty = require('is-empty');
    var PushNotificationRequest = require('../models/push-notification-request');

    /* 
    * GET single booking request record. 
    * User should have booking-request.view to view any booking request record
    * booking-request.view-own to view their own the record
    * booking-request.view-managed-shop to view User managed shop's booking request
    * booking-request.view-shop to view Shop's booking request (User has to be the shop owner)
    * booking-request.view-own to view User's own booking request
    */
    exports.get = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Get booking request: ' + req.params.id);

        BookingRequest.get({ _id: req.params.id }, (err, bookingRequest) => {
            if (bookingRequest) {
                async.waterfall([
                    function (callback) {
                        // Check if User has view permission or own the record
                        if ((bookingRequest.userId && req.user.userId == bookingRequest.userId.id) ||
                            util.hasPermission('booking-request.view', req.user.pemissions)) {
                            return callback(true);
                        } else {
                            return callback(null);
                        }
                    }, function (callback) {
                        // Area manager can access booking request data belongs to his managed shop
                        if (util.hasPermission('booking-request.view-managed-shop', req.user.pemissions)) {
                            UserManagedShop.getShopIdsByManagedUserId(req.user.userId, function (err, managedShopIds) {
                                if (!err) {
                                    let ids = [];
                                    for (let i = 0; i < managedShopIds.length; i++) {
                                        if (bookingRequest.shopId.toString() == managedShopIds[i].shopId.toString()) {
                                            return callback(true);
                                        }
                                    }
                                    return callback(null);
                                } else {
                                    let response = responseMessages.commonResponse(responseMessages.FAIL);
                                    return res.status(500).json(response);
                                }
                            });
                        } else {
                            return callback(null);
                        }
                    }, function (callback) {
                        // Shop owner has permission to access booking request record belongs to his shop
                        if (util.hasPermission('booking-request.view-shop', req.user.pemissions)) {
                            Shop.getIdsByShopOwner(req.user.userId, function (err, ids) {
                                if (!err) {
                                    for (let i = 0; i < ids.length; i++) {
                                        if (bookingRequest.shopId.toString() == ids[i]._id.toString()) {
                                            return callback(true);
                                        }
                                    }
                                    return callback(false);
                                } else {
                                    let response = responseMessages.commonResponse(responseMessages.FAIL);
                                    return res.status(500).json(response);
                                }
                            });
                        } else {
                            return callback(false);
                        }
                    }], function (hasPermission) {
                        if (!hasPermission) {
                            let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                            return res.status(403).json(response);
                        } else {
                            let data = responseMessages.bookingRequest(bookingRequest);
                            let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'bookingRequest': data });
                            return res.status(200).json(response);
                        }
                    });
            } else {
                let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                return res.status(404).json(response);
            }
        });
    };

    /**
     * Update booking request
     * Car owner can update message, bookingDateTime or cancel request
     * ShopOwner/ Area manager can reply, accept/reject booking request
     */
    exports.update = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Update booking request: ' + req.params.id);

        BookingRequest.get({ _id: req.params.id }, (err, bookingRequest) => {
            if (bookingRequest) {
                async.waterfall([
                    function (callback) {
                        // Check if the user is superadmin
                        if (util.hasPermission('booking-request.update', req.user.pemissions)) {
                            return callback(true, null);
                        } else if (!isEmpty(bookingRequest.userId) && req.user.userId == bookingRequest.userId.id) {
                            // User is the car owner
                            delete req.body.reply;
                            if (req.body.status != BookingRequest.CANCELLED) {
                                // Car owner can only cancel the request
                                delete req.body.status;
                            }
                            return callback(true, null);
                        } else {
                            return callback(null);
                        }
                    }, function (callback) {
                        if (util.hasPermission('booking-request.update-managed-shop', req.user.pemissions) ||
                            util.hasPermission('booking-request.update-shop', req.user.pemissions)) {
                            if (req.body.status != BookingRequest.APPROVED && req.body.status != BookingRequest.REJECTED) {
                                // Shop owner or Area manager can only approve/reject request
                                delete req.body.status;
                            }
                            if (!isEmpty(req.body.reply) || (req.body.status && req.body.status != bookingRequest.status)) {
                                // Either the reply or status was update. Create a push notification request to be send to car owner
                                logger.writeLog('Creating Push notification request for booking request: ' + req.params.id + ' update');
                                let reply = isEmpty(req.body.reply) ? bookingRequest.reply : req.body.reply;
                                let pnRequestPayload = {
                                    createdById: req.user.userId,
                                    title: config.get('pushNotificationServer.bookingRequestTitle'),
                                    text: reply,
                                    users: [bookingRequest.userId],
                                    shopId: bookingRequest.shopId
                                };
                                PushNotificationRequest.create(pnRequestPayload, function (err, pushNotificationRequest) {
                                    if (!err) {
                                        logger.writeLog('Created Push notification request for booking request update');
                                    } else {
                                        logger.writeLog('Faield to create Push notification request for booking request update');
                                    }
                                });
                            }
                            delete req.body.message;
                            delete req.body.bookingDateTime;
                        }
                        // Area manager can accept/reject booking request data belongs to his managed shop
                        if (util.hasPermission('booking-request.update-managed-shop', req.user.pemissions)) {
                            UserManagedShop.get({ userId: req.user.userId, shopId: bookingRequest.shopId }, function (err, shop) {
                                if (err) {
                                    return callback(false, err);
                                } else if (shop) {
                                    return callback(true, err);
                                } else {
                                    return callback(null);
                                }
                            });
                        } else {
                            return callback(null);
                        }
                    }, function (callback) {
                        // Shop owner has permission to accept/reject booking request record belongs to his shop
                        if (util.hasPermission('booking-request.update-shop', req.user.pemissions)) {
                            Shop.get({ _id: bookingRequest.shopId }, function (err, shop) {
                                if (err) {
                                    return callback(false, err);
                                } else if (shop) {
                                    if (!shop.shopOwner || (shop.shopOwner && shop.shopOwner._id != req.user.userId)) {
                                        return callback(false, err);
                                    } else {
                                        return callback(true, err);
                                    }
                                } else {
                                    return callback(null);
                                }
                            });
                        } else {
                            return callback(false, null);
                        }
                    }], function (hasPermission, err) {
                        if (err) {
                            let response = responseMessages.commonResponse(responseMessages.FAIL);
                            return res.status(500).json(response);
                        }
                        else if (!hasPermission) {
                            let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                            return res.status(403).json(response);
                        } else {
                            req.body.updateById = req.user.userId;
                            delete req.body.createdById;
                            delete req.body.shopId;
                            delete req.body.userId;
                            BookingRequest.updateById({ _id: req.params.id }, req.body, function (err, result) {
                                if (!err) {
                                    let response = responseMessages.commonResponse(responseMessages.SUCCESS);
                                    return res.status(200).json(response);
                                } else {
                                    let errorData = mongooseErrorExtractor.getErrorData(err);
                                    let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                                    return res.status(400).json(response);
                                }
                            });
                        }
                    });
            } else {
                let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                return res.status(404).json(response);
            }
        });
    };

    /**
    * List booking request recommendation records. If user doesn't have booking-request.list permission records belongs to requested userId would be returned
    */
    exports.list = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('List booking request recommendations');

        var query,
            pageNo = req.query.pageNo ? req.query.pageNo : 1,
            limit = req.query.limit ? req.query.limit : 10,
            sort = { createdAt: -1 },
            ids = [];
        if (req.query.sort) {
            let sortOrder = req.query.sort.charAt(0) == '-' ? '-1' : 1;
            let sortField = _.trim(req.query.sort, '-');
            sort = { [sortField]: sortOrder };
        }

        var updateNotifiedStatus = false;

        async.waterfall([
            function (callback) {
                // If user has list permission no need to enforce any restriction
                if (util.hasPermission('booking-request.list', req.user.pemissions)) {
                    return callback(true);
                } else if (!util.hasPermission('booking-request.list-shop', req.user.pemissions) &&
                    !util.hasPermission('booking-request.list-managed-shop', req.user.pemissions)) {
                    req.query.userId = req.user.userId;
                    return callback(true);
                } else {
                    return callback(null);
                }
            }, function (callback) {
                if (util.hasPermission('booking-request.list-managed-shop', req.user.pemissions)) {
                    // Area manager has permission to access vehicle records belongs to shop managed by him
                    UserManagedShop.getShopIdsByManagedUserId(req.user.userId, function (err, managedShopIds) {
                        if (err) {
                            let response = responseMessages.commonResponse(responseMessages.FAIL);
                            return res.status(500).json(response);
                        }
                        for (let i = 0; i < managedShopIds.length; i++) {
                            ids.push(managedShopIds[i].shopId);
                        }
                        req.query.shopIds = ids;
                        return callback(err);
                    });
                } else { return callback(null); }
            }, function (callback) {
                if (util.hasPermission('booking-request.list-shop', req.user.pemissions)) {
                    // Shop owner has permission to access vechile records belongs to his shop
                    updateNotifiedStatus = true;
                    Shop.getIdsByShopOwner(req.user.userId, function (err, shopIds) {
                        if (err) {
                            let errorData = mongooseErrorExtractor.getErrorData(err);
                            let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                            return res.status(400).json(response);
                        }
                        for (let i = 0; i < shopIds.length; i++) {
                            if (ids.indexOf(shopIds[i].id) < 0) {
                                ids.push(shopIds[i].id);
                            }
                        }
                        req.query.shopIds = ids;
                        return callback(err);
                    });
                } else { return callback(null); }
            }
        ], function () {
            query = BookingRequest.getSearchQuery(req.query);
            // Get record count associated with this query
            BookingRequest.getCount(query, function (err, count) {
                if (err) {
                    logger.writeLog('Error getting booking request count: ' + err);
                    let response = responseMessages.commonResponse(responseMessages.FAIL);
                    return res.status(400).json(response);
                } else {
                    BookingRequest.getAll(query, pageNo, limit, sort, function (err, bookingRequests) {
                        if (!err) {
                            let data = [];
                            var ids = [];
                            for (let i = 0; i < bookingRequests.length; i++) {
                                let booking = responseMessages.bookingRequest(bookingRequests[i]);
                                data.push(booking);
                                ids.push(bookingRequests[i]._id);
                            }

                            if (updateNotifiedStatus) {
                                BookingRequest.updateAll({_id: {$in:ids}}, {isNotified: BookingRequest.IS_NOTIFIED_YES}, function(err, res) {
                                    if (!err) {
                                        logger.writeLog('Booking request isNotified status updated.');
                                    } else {
                                        logger.writeLog('Booking request isNotified status update failed.');
                                    }
                                });
                            }

                            let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'bookingRequests': { 'total': count, 'data': data } });
                            return res.status(200).json(response);
                        } else {
                            logger.writeLog('Failed to retrieve booking request records: ' + JSON.stringify(err));
                            let response = responseMessages.commonResponse(responseMessages.FAIL);
                            return res.status(400).json(response);
                        }
                    });
                }
            });
        });
    };

    /* POST Create new booking request to shop */
    exports.create = function (req, res, next) {
        var logger = req.logger;
        let socketSever = req.socketServer;

        logger.writeLog('Create new Booking request');

        async.waterfall([
            function (callback) {
                CarOwnerSubscription.get({ userId: req.user.userId, shopId: req.body.shopId, status: CarOwnerSubscription.APPROVED }, (err, subscription) => {
                    if (err) {
                        logger.writeLog('Unable to retrieve subscription record: ' + JSON.stringify(err));
                        let response = responseMessages.commonResponse(responseMessages.FAIL);
                        return res.status(500).json(response);
                    } else if (!subscription) {
                        // Shop doesn't exists
                        let response = responseMessages.commonResponse(responseMessages.USER_NOT_SUBSCRIBED);
                        return res.status(400).json(response);
                    } else { return callback(); }
                });
            },
            function (callback) {
                // Get shop owner to send socket notification
                Shop.get({ _id: req.body.shopId }, (err, shop) => {
                    if (shop) {
                        callback(shop.shopOwner._id);
                    } else {
                        callback(null);
                    }
                });
            }
        ], function (shopOwnerId) {
            req.body.userId = req.user.userId;
            req.body.createdById = req.user.userId;
            req.body.status = BookingRequest.PENDING;

            BookingRequest.create(req.body, function (err, createdObject) {
                if (!err) {
                    logger.writeLog('Booking request created for user: ' + req.user.userId + ' to shop: ' + req.body.shopId);

                    // Notify about booking request to shop manager
                    if (shopOwnerId) {
                        BookingRequest.get({ _id: createdObject._id }, (err, bookingRequest) => {
                            if (bookingRequest) {
                                let booking = responseMessages.bookingRequest(bookingRequest);
                                socketSever.sendAppointmentNotification(shopOwnerId.toString(), booking, function(status) {
                                    if (status == 'success') {
                                        BookingRequest.updateById({ _id: createdObject._id }, {isNotified: BookingRequest.IS_NOTIFIED_YES}, function (err, result) {
                                            if (!err) {
                                                logger.writeLog('Notified status updated.');
                                            } else {
                                                logger.writeLog('Notified status update failed.');
                                            }
                                        });
                                    }
                                });
                            } else {
                                logger.writeLog('Booking request not found');
                            }
                        });
                    }

                    let data = responseMessages.formatCreatedObject(createdObject);
                    let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'bookingRequest': data });
                    return res.status(200).json(response);
                } else {
                    logger.writeLog('Failed to create booking request for user: ' + req.body.userId + ' to shop: ' + req.body.shopId);
                    let errorData = mongooseErrorExtractor.getErrorData(err);
                    let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                    return res.status(400).json(response);
                }
            });
        });
    };

    /* Delete booking request */
    exports.delete = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Delete Booking request');

        BookingRequest.removeById({ _id: req.params.id }, function (err, result) {
            if (!err) {
                var response = responseMessages.commonResponse(responseMessages.SUCCESS);
                res.status(200).json(response);
            } else {
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                res.status(400).json(response);
            }
        });
    };

})();

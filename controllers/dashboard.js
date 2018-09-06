(function () {

    'use strict';

    var isEmpty = require('is-empty');
    var async = require('async');
    var Shop = require('../models/shop');
    var Chat = require('../models/chat');
    var CarOwnerSubscription = require('../models/car-owner-subscription');
    var responseMessages = require('../lib/response-messages');
    var mongooseErrorExtractor = require('../lib/mongoose-error-extractor');
    var Vehicle = require('../models/vehicle');
    var BookingRequest = require('../models/booking-request');

    /** Get statistics for shopowner dashboard */
    exports.getShopOwnerStatistics = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Get shop-owner dashboard statistics for user: ' + req.user.userId);

        async.waterfall([
            function (callback) {
                Shop.getIdsByShopOwner(req.user.userId, function (err, ids) {
                    if (err) {
                        let errorData = mongooseErrorExtractor.getErrorData(err);
                        let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                        return res.status(400).json(response);
                    } else if (ids.length === 0) {
                        let response = responseMessages.commonResponse(responseMessages.SUCCESS, '', responseMessages.shopOwnerDashboardStatistics(0, 0));
                        return res.status(200).json(response);
                    }
                    return callback(err, ids);
                });
            }, function (ids, callback) {
                CarOwnerSubscription.getUserCountByShopIds(ids, CarOwnerSubscription.APPROVED, function (err, users) {
                    if (!err) {
                        let response = responseMessages.commonResponse(responseMessages.SUCCESS, '', responseMessages.shopOwnerDashboardStatistics(ids.length, users.length));
                        return res.status(200).json(response);
                    } else {
                        let errorData = mongooseErrorExtractor.getErrorData(err);
                        let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                        return res.status(400).json(response);
                    }
                });
            }
        ]);
    };

    /** Get shop statistics for shopowner dashboard */
    exports.getShopStatistics = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Get statistics for shop: ' + req.params.id);

        async.waterfall([
            function (callback) {
                Shop.get({ _id: req.params.id }, (err, shop) => {
                    if (shop) {
                        if (shop.shopOwner && shop.shopOwner._id != req.user.userId) {
                            let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                            return res.status(403).json(response);
                        } else {
                            return callback(null, shop);
                        }
                    } else {
                        var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                        return res.status(404).json(response);
                    }
                });
            },
            function (shop, callback) {
                // Vehicle count
                Vehicle.getCount({shopId: shop._id}, function(err, vehicleCount) {
                    callback(null, shop, vehicleCount)
                });
            },
            function (shop, vehicleCount, callback) {
                // Unread booking request count
                BookingRequest.getCount({shopId: shop._id, readStatus: BookingRequest.UNREAD}, function(err, bookingRequestCount) {
                    callback(null, shop, vehicleCount, bookingRequestCount)
                });
            },
            function (shop, vehicleCount, bookingRequestCount, callback) {
                // Unread chat count
                Chat.getCount({shopId: shop._id, readStatus: Chat.UNREAD, receiverId: shop.shopOwner}, function(err, chatCount) {
                    callback(null, shop, vehicleCount, bookingRequestCount, chatCount)
                });
            },
            function (shop, vehicleCount, bookingRequestCount, chatCount, callback) {
                CarOwnerSubscription.getUserCountByShopId(shop._id, CarOwnerSubscription.APPROVED, function (err, users) {
                    if (!err) {
                        let response = responseMessages.commonResponse(responseMessages.SUCCESS, '', 
                        responseMessages.shopOwnerDashboardStatistics(1, users.length, vehicleCount, bookingRequestCount, chatCount));
                        return res.status(200).json(response);
                    } else {
                        let errorData = mongooseErrorExtractor.getErrorData(err);
                        let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                        return res.status(400).json(response);
                    }
                });
            }
        ]);
    };

})();

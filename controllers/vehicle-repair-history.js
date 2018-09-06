(function () {

    'use strict';

    var async = require('async');
    var isEmpty = require('is-empty');
    var _ = require('lodash');
    var util = require('../lib/util');
    var Vehicle = require('../models/vehicle');
    var VehicleRepairHistory = require('../models/vehicle-repair-history');
    var Shop = require('../models/shop');
    var User = require('../models/user');
    var UserManagedShop = require('../models/user-managed-shop');
    var responseMessages = require('../lib/response-messages');
    var mongooseErrorExtractor = require('../lib/mongoose-error-extractor');

    /* 
    * GET single vehicle repair history record. 
    * User should have vehicle-repair-history.view to view any vehicle history record
    * vehicle-repair-history.view-own to view their own the record
    * vehicle-repair-history.view-managed-shop to view User managed shop's vehicle history
    * vehicle-repair-history.view-shop to view Shop's vehicle history (User has to be the shop owner)
    * vehicle-repair-history.view-own to view User's own vehicle history
    */
    exports.get = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Get Vehicle Repair History: ' + req.params.id);

        VehicleRepairHistory.get({ _id: req.params.id }, (err, vehicleRepairHistory) => {
            if (vehicleRepairHistory) {
                async.waterfall([
                    function (callback) {
                        // Check if User has view permission or own the record
                        if ((vehicleRepairHistory.userId && req.user.userId == vehicleRepairHistory.userId.id) ||
                            util.hasPermission('vehicle-repair-history.view', req.user.pemissions)) {
                            return callback(true);
                        } else {
                            return callback(null);
                        }
                    }, function (callback) {
                        // Area manager can access vehicle data belongs to his managed shop
                        if (util.hasPermission('vehicle-repair-history.view-managed-shop', req.user.pemissions)) {
                            UserManagedShop.getShopIdsByManagedUserId(req.user.userId, function (err, managedShopIds) {
                                if (!err) {
                                    let ids = [];
                                    for (let i = 0; i < managedShopIds.length; i++) {
                                        if (vehicleRepairHistory.shopId.toString() == managedShopIds[i].shopId.toString()) {
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
                        // Shop owner has permission to access vechile records belongs to his shop
                        if (util.hasPermission('vehicle-repair-history.view-shop', req.user.pemissions)) {
                            Shop.getIdsByShopOwner(req.user.userId, function (err, ids) {
                                if (!err) {
                                    for (let i = 0; i < ids.length; i++) {
                                        if (vehicleRepairHistory.shopId.toString() == ids[i]._id.toString()) {
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
                            let data = responseMessages.vehicleRepairHistory(vehicleRepairHistory);
                            let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'vehicleRepairHistory': data });
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
    * List vehicles repair history records. If user doesn't have vehicle-repair-history.list permission records belongs to requested userId would be returned
    */
    exports.list = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('List vehicles repair histories');

        var query,
            pageNo = req.query.pageNo ? req.query.pageNo : 1,
            limit = req.query.limit ? req.query.limit : 10,
            sort = { createdAt: -1 },
            ids = [];
        if (req.query.sort) {
            let sortOrder = req.query.sort.charAt(0) == '-' ? '-1' : 1;
            let sortField = _.trim(req.query.sort, '-');
            sort = { [sortField]: sortOrder, "invoiceNo": '-1', "lineItemId": 1 };
        }

        async.waterfall([
            function (callback) {
                // If user has list permission no need to enforce any restriction
                if (util.hasPermission('vehicle-repair-history.list', req.user.pemissions)) {
                    return callback(true);
                } else if (!util.hasPermission('vehicle-repair-history.list-shop', req.user.pemissions) &&
                    !util.hasPermission('vehicle-repair-history.list-managed-shop', req.user.pemissions)) {
                    req.query.userId = req.user.userId;
                    return callback(true);
                } else {
                    return callback(null);
                }
            }, function (callback) {
                if (util.hasPermission('vehicle-repair-history.list-managed-shop', req.user.pemissions)) {
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
                if (util.hasPermission('vehicle-repair-history.list-shop', req.user.pemissions)) {
                    // Shop owner has permission to access vechile records belongs to his shop
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
            query = VehicleRepairHistory.getSearchQuery(req.query);
            // Get record count associated with this query
            VehicleRepairHistory.getCount(query, function (err, count) {
                if (err) {
                    logger.writeLog('Error getting vehicle repair history count: ' + err);
                    let response = responseMessages.commonResponse(responseMessages.FAIL);
                    return res.status(400).json(response);
                } else {
                    VehicleRepairHistory.getAll(query, pageNo, limit, sort, function (err, vehicleRepairHistories) {
                        if (!err) {
                            let data = [];
                            for (let i = 0; i < vehicleRepairHistories.length; i++) {
                                let history = responseMessages.vehicleRepairHistory(vehicleRepairHistories[i]);
                                data.push(history);
                            }
                            let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'vehicleRepairHistory': { 'total': count, 'data': data } });
                            return res.status(200).json(response);
                        } else {
                            logger.writeLog('Failed to retrieve vehicle  repair history records: ' + JSON.stringify(err));
                            let response = responseMessages.commonResponse(responseMessages.FAIL);
                            return res.status(400).json(response);
                        }
                    });
                }
            });
        });
    };

    /* Sync M1 vehicle repair history details */
    exports.syncVehicleRepairHistories = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Sync vehicle repair history details');

        let vehicleRepairHistories = req.body.vehicleRepairHistories,
            totalRecords = vehicleRepairHistories.length,
            successCount = 0,
            vehicleRepairHistoryIds = [];

        async.each(vehicleRepairHistories, function (vehicleRepairHistory, callback) {
            Vehicle.get({ "shopId": req.user.shopId, "vehicleId": vehicleRepairHistory.m1VehicleId }, function (err, vehicle) {
                if (vehicle) {
                    vehicleRepairHistory.userId = vehicle.userId;
                    vehicleRepairHistory.shopId = req.user.shopId;
                    vehicleRepairHistory.vehicleId = vehicle._id;
                    if (vehicleRepairHistory.action == null || vehicleRepairHistory.action == 'A' || vehicleRepairHistory.action == 'U') {
                        // Add or update modified or new records
                        VehicleRepairHistory.createOrUpdate(vehicleRepairHistory, function (err, response) {
                            if (err) {
                                logger.writeLog('Error while updating vehicle repair history:' + JSON.stringify(err));
                            } else {
                                successCount++;
                                vehicleRepairHistoryIds.push(response._id);
                                logger.writeLog('Vehicle repair history details updated');
                            }
                            callback(null);
                        })
                    } else if (vehicleRepairHistory.action == 'D') {
                        // Delete deleted records
                        VehicleRepairHistory.removeByPrams({repairOrderid: vehicleRepairHistory.repairOrderId, shopId: req.user.shopId}, function (err, result) {
                            if (!err) {
                                logger.writeLog('Vehicle repair history deleted. vehicleRepairHistoryId:' +  vehicleRepairHistory.repairOrderId);
                            } else {
                                logger.writeLog('Vehicle repair history delete failed. vehicleRepairHistoryId:' +  vehicleRepairHistory.repairOrderId);
                            }
                            callback(null);
                        });
                    } else {
                        callback(null);
                    }
                } else {
                    logger.writeLog('No associated vehicle record found');
                    callback(null);
                }
            });
        }, function (err) {
            logger.writeLog('Vechicle repair history batch processing is over');
            let resData = { "vehiclesRepairHistories": vehicleRepairHistoryIds };
            if (totalRecords == successCount) {
                var response = responseMessages.commonResponse(responseMessages.SUCCESS, null, resData);
                return res.status(200).json(response);
            } else if (successCount > 0) {
                var response = responseMessages.commonResponse(responseMessages.SOME_RECORDS_SYNCED, null, resData);
                return res.status(200).json(response);
            } else {
                var response = responseMessages.commonResponse(responseMessages.FAIL, null, resData);
                return res.status(200).json(response);
            }
        });
    };

    /* Delete vehicle repair history */
    exports.delete = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Delete vehicle repair history');

        VehicleRepairHistory.removeById({ _id: req.params.id }, function (err, result) {
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

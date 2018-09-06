(function () {

    'use strict';

    var async = require('async');
    var isEmpty = require('is-empty');
    var util = require('../lib/util');
    var Vehicle = require('../models/vehicle');
    var VehicleRecommendation = require('../models/vehicle-recommendation');
    var Shop = require('../models/shop');
    var User = require('../models/user');
    var _ = require('lodash');
    var UserManagedShop = require('../models/user-managed-shop');
    var responseMessages = require('../lib/response-messages');
    var mongooseErrorExtractor = require('../lib/mongoose-error-extractor');

    /* 
    * GET single vehicle recommendation record. 
    * User should have vehicle-recommendation.view to view any vehicle recommendation record
    * vehicle-recommendation.view-own to view their own the record
    * vehicle-recommendation.view-managed-shop to view User managed shop's vehicle recommendation
    * vehicle-recommendation.view-shop to view Shop's vehicle recommendation (User has to be the shop owner)
    * vehicle-recommendation.view-own to view User's own vehicle recommendation
    */
    exports.get = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Get Vehicle Recommendation: ' + req.params.id);

        VehicleRecommendation.get({ _id: req.params.id }, (err, vehicleRecommendation) => {
            if (vehicleRecommendation) {
                async.waterfall([
                    function (callback) {
                        // Check if User has view permission or own the record
                        if ((vehicleRecommendation.userId && req.user.userId == vehicleRecommendation.userId.id) ||
                            util.hasPermission('vehicle-recommendation.view', req.user.pemissions)) {
                            return callback(true);
                        } else {
                            return callback(null);
                        }
                    }, function (callback) {
                        // Area manager can access vehicle recommendation data belongs to his managed shop
                        if (util.hasPermission('vehicle-recommendation.view-managed-shop', req.user.pemissions)) {
                            UserManagedShop.getShopIdsByManagedUserId(req.user.userId, function (err, managedShopIds) {
                                if (!err) {
                                    let ids = [];
                                    for (let i = 0; i < managedShopIds.length; i++) {
                                        if (vehicleRecommendation.shopId.toString() == managedShopIds[i].shopId.toString()) {
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
                        // Shop owner has permission to access vechile recommendation record belongs to his shop
                        if (util.hasPermission('vehicle-recommendation.view-shop', req.user.pemissions)) {
                            Shop.getIdsByShopOwner(req.user.userId, function (err, ids) {
                                if (!err) {
                                    for (let i = 0; i < ids.length; i++) {
                                        if (vehicleRecommendation.shopId.toString() == ids[i]._id.toString()) {
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
                            let data = responseMessages.vehicleRecommendation(vehicleRecommendation);
                            let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'vehicleRecommendation': data });
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
    * List vehicles repair recommendation records. If user doesn't have vehicle-recommendation.list permission records belongs to requested userId would be returned
    */
    exports.list = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('List vehicle repair recommendations');

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

        async.waterfall([
            function (callback) {
                // If user has list permission no need to enforce any restriction
                if (util.hasPermission('vehicle-recommendation.list', req.user.pemissions)) {
                    return callback(true);
                } else if (!util.hasPermission('vehicle-recommendation.list-shop', req.user.pemissions) &&
                    !util.hasPermission('vehicle-recommendation.list-managed-shop', req.user.pemissions)) {
                    //req.query.userId = req.user.userId;
                    return callback(true);
                } else {
                    return callback(null);
                }
            }, function (callback) {
                if (util.hasPermission('vehicle-recommendation.list-managed-shop', req.user.pemissions)) {
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
                if (util.hasPermission('vehicle-recommendation.list-shop', req.user.pemissions)) {
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
            query = VehicleRecommendation.getSearchQuery(req.query);
            // Get record count associated with this query
            VehicleRecommendation.getCount(query, function (err, count) {
                if (err) {
                    logger.writeLog('Error getting vehicle repair recommendation count: ' + err);
                    let response = responseMessages.commonResponse(responseMessages.FAIL);
                    return res.status(400).json(response);
                } else {
                    VehicleRecommendation.getAll(query, pageNo, limit, sort, function (err, vehicleRecommendations) {
                        if (!err) {
                            let data = [];
                            for (let i = 0; i < vehicleRecommendations.length; i++) {
                                let recommendation = responseMessages.vehicleRecommendation(vehicleRecommendations[i]);
                                data.push(recommendation);
                            }
                            let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'vehicleRecommendations': { 'total': count, 'data': data } });
                            return res.status(200).json(response);
                        } else {
                            logger.writeLog('Failed to retrieve vehicle  repair recommendation records: ' + JSON.stringify(err));
                            let response = responseMessages.commonResponse(responseMessages.FAIL);
                            return res.status(400).json(response);
                        }
                    });
                }
            });
        });
    };

    /* Sync M1 vehicle recommendation details */
    exports.syncVehicleRecommendations = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Sync vehicle repair recommendation details');

        let vehicleRecommendations = req.body.vehicleRecommendations,
            totalRecords = vehicleRecommendations.length,
            successCount = 0,
            vehicleRecommendationIds = [];

        async.each(vehicleRecommendations, function (vehicleRecommendation, callback) {
            Vehicle.get({ "shopId": req.user.shopId, "vehicleId": vehicleRecommendation.m1VehicleId }, function (err, vehicle) {
                if (vehicle) {
                    vehicleRecommendation.userId = vehicle.userId;
                    vehicleRecommendation.shopId = req.user.shopId;
                    vehicleRecommendation.vehicleId = vehicle._id;
                    let recommendationId = vehicleRecommendation.recommendationId;

                    if (vehicleRecommendation.action == null || vehicleRecommendation.action == 'A' || vehicleRecommendation.action == 'U') {
                        // New or modified records
                        VehicleRecommendation.createOrUpdate(vehicleRecommendation, function (err, response) {
                            if (err) {
                                logger.writeLog('Error while updating vehicle recommendation. Err:' + JSON.stringify(err));
                            } else {
                                successCount++;
                                vehicleRecommendationIds.push(response._id);
                                logger.writeLog('Vehicle recommendation details updated. Recommendation id:' + recommendationId);
                            }
                            callback(null);
                        });
                    } else if (vehicleRecommendation.action == 'D') {
                        // Deleted records
                        VehicleRecommendation.removeByPrams({recommendationId: recommendationId, shopId: req.user.shopId}, function (err, result) {
                            if (!err) {
                                logger.writeLog('Recommendation deleted. recommendationId:' +  recommendationId);
                            } else {
                                logger.writeLog('Recommendation delete failed. recommendationId:' +  recommendationId);
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
            logger.writeLog('Vechicle recommendation batch processing is over');
            let resData = { "vehiclesRecommendations": vehicleRecommendationIds };
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

    /* Delete vehicle recommendation */
    exports.delete = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Delete vehicle recommendation');

        VehicleRecommendation.removeById({ _id: req.params.id }, function (err, result) {
            if (!err) {
                var response = responseMessages.commonResponse(responseMessages.SUCCESS);
                res.status(200).json(response);
            } else {
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                res.status(400).json(response);
            }
        });
    };

    /* Compare & delete deleted recommendations from SF DB */
    exports.syncDeleted = function(req, res, next) {
        var logger = req.logger;
        logger.writeLog('Sync deleted recommendations');

        let recommendationIds = req.body.recommendationIds;
        let date = req.body.date;
        VehicleRecommendation.getRecommendationsToBeDeleted(date, req.user.shopId, recommendationIds, function (err, vehicleRecommendations) {
            if (!err) {
                if (!isEmpty(vehicleRecommendations)) {
                    async.mapSeries(vehicleRecommendations, function(vehicleRecommendation, callback) {
                        let recommendationId = vehicleRecommendation.recommendationId;
                        logger.writeLog('Deleting recommendation. recommendationId:' +  recommendationId);
                        VehicleRecommendation.removeByPrams({recommendationId: recommendationId, shopId: req.user.shopId}, function (err, result) {
                            if (!err) {
                                logger.writeLog('Recommendation deleted. recommendationId:' +  recommendationId);
                            } else {
                                logger.writeLog('Recommendation delete failed. recommendationId:' +  recommendationId);
                            }
                            callback(null);
                        });
                    }, function(err) {
                        logger.writeLog('Recommendation deletion process is over');
                        let response = responseMessages.commonResponse(responseMessages.SUCCESS);
                        return res.status(200).json(response);
                    });
                } else {
                    logger.writeLog('No recommendations found for deleting');
                    let response = responseMessages.commonResponse(responseMessages.SUCCESS);
                    return res.status(200).json(response);
                }
            } else {
                logger.writeLog('Failed to retrieve recommendation records: ' + JSON.stringify(err));
                let response = responseMessages.commonResponse(responseMessages.FAIL);
                return res.status(400).json(response);
            }
        });
    }

})();

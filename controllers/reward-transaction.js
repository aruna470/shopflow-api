(() => {

    'use strict';

    var async = require('async');
    var _ = require('lodash');
    var Reward = require('../models/reward');
    var RewardTransaction = require('../models/reward-transaction');
    var CarOwnerSubscription = require('../models/car-owner-subscription');
    var Shop = require('../models/shop');
    var responseMessages = require('../lib/response-messages');
    var mongooseErrorExtractor = require('../lib/mongoose-error-extractor');
    var util = require('../lib/util');
    var isEmpty = require('is-empty');

    /* POST Create/perform new reward transaction */
    exports.create = (req, res, next) => {
        var logger = req.logger;
        logger.writeLog('Performing new reward transaction');

        async.waterfall([
            (callback) => {
                if ((util.hasPermission('reward-transaction.add', req.user.pemissions) && req.body.action === RewardTransaction.ADD) ||
                    (util.hasPermission('reward-transaction.redeem', req.user.pemissions) && req.body.action === RewardTransaction.REDEEM)) {
                    // User is authenticated to add or redeem points (has permission)
                    return callback(null);
                } else {
                    var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                    return res.status(403).json(response);
                }
            },
            (callback) => {
                // Check if user is authorized to add or redeem points (user is the shop owner for the given shop)
                Shop.get({
                    _id: req.body.shopId,
                    shopOwner: req.user.userId
                }, (err, shop) => {
                    if (!shop) {
                        var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                        return res.status(403).json(response);
                    } else {
                        return callback(null);
                    }
                });
            },
            (callback) => {
                // Check if user has active subscription
                CarOwnerSubscription.get({
                    userId: req.body.userId,
                    shopId: req.body.shopId,
                    status: CarOwnerSubscription.APPROVED
                }, (err, subscription) => {
                    if (err) {
                        logger.writeLog('Unable to retrieve subscription record: ' + JSON.stringify(err));
                        let response = responseMessages.commonResponse(responseMessages.FAIL);
                        return res.status(500).json(response);
                    } else if (!subscription) {
                        // Active subscription doesn't exists
                        let response = responseMessages.commonResponse(responseMessages.USER_NOT_SUBSCRIBED);
                        return res.status(400).json(response);
                    } else {
                        return callback();
                    }
                });
            },
            (callback) => {

                // Get reward record if exists otherwise create
                Reward.findOneOrCreate({
                    shopId: req.body.shopId,
                    userId: req.body.userId
                }, {
                    shopId: req.body.shopId,
                    userId: req.body.userId,
                    points: 0,
                    createdById: req.user.userId
                }, (err, reward) => {
                    if (reward) {
                        if (req.body.action === RewardTransaction.REDEEM) {
                            // Redeem rewards
                            if (!util.hasPermission('reward-transaction.redeem', req.user.pemissions)) {
                                let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                                return res.status(403).json(response);
                            }
                            if (reward.points < req.body.points) {
                                // Insufficient reward points
                                let response = responseMessages.commonResponse(responseMessages.INSUFFICIENT_POINTS);
                                return res.status(400).json(response);
                            }
                            reward.points -= parseInt(req.body.points);
                            return callback(null, reward);
                        } else {
                            // Add reward points
                            if (!util.hasPermission('reward-transaction.add', req.user.pemissions)) {
                                let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                                return res.status(403).json(response);
                            }
                            reward.points += parseInt(req.body.points);
                            return callback(null, reward);
                        }
                    } else {
                        let response = responseMessages.commonResponse(responseMessages.FAIL);
                        return res.status(500).json(response);
                    }
                });
            },
            (reward) => {

                // Create reward transaction record
                RewardTransaction.create({
                    rewardId: reward._id,
                    points: req.body.points,
                    remarks: req.body.remarks,
                    action: req.body.action,
                    shopId: req.body.shopId,
                    userId: req.body.userId,
                    createdById: req.user.userId
                }, (err, createdObject) => {
                    if (err) {
                        logger.writeLog('Failed to create reward transaction. User: ' + req.body.userId + ', Shop: ' + req.body.shopId);
                        let errorData = mongooseErrorExtractor.getErrorData(err);
                        let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                        return res.status(400).json(response);
                    } else {
                        // Update reward object
                        logger.writeLog('Reward transaction record has been created');
                        reward.updatedById = req.user.userId;
                        reward.save();
                        // Prepare response
                        let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", {
                            'rewardTransaction': responseMessages.rewardTransaction(createdObject)
                        });
                        return res.status(200).json(response);
                    }
                });
            }
        ]);
    };

    /* GET List reward transactions */
    exports.list = (req, res) => {
        var logger = req.logger;
        logger.writeLog('List reward transactions');

        var query;
        var pageNo = req.query.pageNo ? req.query.pageNo : 1;
        var limit = req.query.limit ? req.query.limit : 10;
        var sort = { createdAt: -1 };

        if (req.query.sort) {
            let sortOrder = req.query.sort.charAt(0) == '-' ? '-1' : 1;
            let sortField = _.trim(req.query.sort, '-');
            sort = {
                [sortField]: sortOrder
            };
        }

        async.waterfall([
            (callback) => {
                if (util.hasPermission('reward.list', req.user.pemissions)) {
                    // User is a super admin allow listing any transaction
                    return callback(null);
                } else if (util.hasPermission('reward.list-shop', req.user.pemissions)) {
                    // User is a shop owner allow getting transactions of rewards belongs only to his shop
                    if (isEmpty(req.query.shopId)) {
                        let response = responseMessages.commonResponse(responseMessages.MISSING_MANDATORY_ATTRIBUTE, "shopId");
                        return res.status(400).json(response);
                    }
                    Shop.get({
                        _id: req.query.shopId,
                        shopOwner: req.user.userId
                    }, (err, shop) => {
                        if (!shop) {
                            let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                            return res.status(403).json(response);
                        } else {
                            return callback(null);
                        }
                    });
                } else {
                    // Car owner is authorized to access his own reward transaction details
                    req.query.userId = req.user.userId;
                    return callback(null);
                }
            },
            (callback) => {
                // Get count
                query = RewardTransaction.getSearchQuery(req.query);
                RewardTransaction.getCount(query, (err, count) => {
                    if (err) {
                        let response = responseMessages.commonResponse(responseMessages.FAIL);
                        return res.status(500).json(response);
                    } else {
                        return callback(count);
                    }
                });
            }
        ], (count) => {
            // Get reward transaction records
            RewardTransaction.getAll(query, pageNo, limit, sort, (err, transactions) => {
                if (!err) {
                    let data = [];
                    for (let i = 0; i < transactions.length; i++) {
                        let transaction = responseMessages.rewardTransaction(transactions[i]);
                        data.push(transaction);
                    }
                    let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, {
                        'rewardTransactions': {
                            'total': count,
                            'data': data
                        }
                    });
                    return res.status(200).json(response);
                } else {
                    let response = responseMessages.commonResponse(responseMessages.FAIL);
                    return res.status(500).json(response);
                }
            });
        });
    };
})();
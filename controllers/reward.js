(() => {

    'use strict';

    var async = require('async');
    var _ = require('lodash');
    var Reward = require('../models/reward');
    var Shop = require('../models/shop');
    var responseMessages = require('../lib/response-messages');
    var util = require('../lib/util');
    var isEmpty = require('is-empty');


    /* GET reward */
    exports.get = (req, res) => {
        var logger = req.logger;
        logger.writeLog('Get reward id: ' + req.params.id);

        async.waterfall([
            (callback) => {
                // Get reward record if exists otherwise create
                Reward.findOneOrCreate({
                    shopId: req.query.shopId,
                    userId: req.query.userId
                }, {
                        shopId: req.query.shopId,
                        userId: req.query.userId,
                        points: 0,
                        createdById: req.user.userId
                    }, (err, reward) => {
                        if (!err && reward) {
                            return callback(null, reward);
                        } else {
                            let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                            return res.status(404).json(response);
                        }
                    });
            },
            (reward, callback) => {
                if (util.hasPermission('reward.view', req.user.pemissions)) {
                    // User is a super admin allow getting any reward
                    return callback(reward);
                } else if (util.hasPermission('reward.view-shop', req.user.pemissions)) {
                    // User is a shop owner allow getting reward belongs only to his shop
                    Shop.get({ _id: reward.shopId }, (err, shop) => {
                        if (!shop) {
                            let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                            return res.status(403).json(response);
                        }
                        return callback(reward);
                    });
                } else {
                    // Car owner is authorized to access his own reward
                    if (reward.userId.id != req.user.userId) {
                        let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                        return res.status(403).json(response);
                    }
                    return callback(reward);
                }
            },
        ], (reward) => {
            // Prepare response object
            let rewardInfo = responseMessages.reward(reward);
            let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", {
                'reward': rewardInfo
            });
            return res.status(200).json(response);
        });
    };

    /* GET List rewards */
    exports.list = (req, res) => {
        var logger = req.logger;
        logger.writeLog('List rewards');

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
                    // User is a super admin allow listing any rewards
                    return callback(null);
                } else if (util.hasPermission('reward.list-shop', req.user.pemissions)) {
                    // ShopId is mandatory param when request is being made by shop owner
                    if (isEmpty(req.query.shopId)) {
                        let response = responseMessages.commonResponse(responseMessages.MISSING_MANDATORY_ATTRIBUTE, "shopId");
                        return res.status(400).json(response);
                    }
                    // User is a shop owner allow getting rewards belongs only to his shop
                    Shop.get({
                        _id: req.query.shopId,
                        shopOwner: req.user.userId
                    }, (err, shop) => {
                        if (!shop) {
                            let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                            return res.status(403).json(response);
                        }
                        return callback(null);
                    });
                } else {
                    // Car owner is authorized to access his own reward detail
                    req.query.userId = req.user.userId;
                    return callback(null);
                }
            },
            (callback) => {
                // Get count
                query = Reward.getSearchQuery(req.query);
                Reward.getCount(query, (err, count) => {
                    if (err) {
                        let response = responseMessages.commonResponse(responseMessages.FAIL);
                        return res.status(500).json(response);
                    }
                    return callback(count);
                });
            }
        ], (count) => {
            // Get rewards records
            Reward.getAll(query, pageNo, limit, sort, (err, rewards) => {
                if (!err) {
                    let data = [];
                    for (let i = 0; i < rewards.length; i++) {
                        let reward = responseMessages.reward(rewards[i]);
                        data.push(reward);
                    }
                    let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, {
                        'rewards': {
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
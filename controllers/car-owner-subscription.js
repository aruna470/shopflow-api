(function () {

    'use strict';

    var _ = require('lodash');
    var isEmpty = require('is-empty');
    var async = require('async');
    var CarOwnerSubscription = require('../models/car-owner-subscription');
    var responseMessages = require('../lib/response-messages');
    var mongooseErrorExtractor = require('../lib/mongoose-error-extractor');
    var passwordGenerator = require('generate-password');
    var config = require('config');
    var sha1 = require('sha1');
    var aws = require('../lib/aws');
    var Shop = require('../models/shop');
    var util = require('../lib/util');
    var User = require('../models/user');
    var mail = require('../lib/mail');

    /* POST Create new car owner subscription to shop */
    exports.create = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Create new car owner subscription');

        async.waterfall([
            function (callback) {
                Shop.get({ _id: req.body.shopId }, (err, shop) => {
                    if (!shop) {
                        // Shop doesn't exists
                        let response = responseMessages.commonResponse(responseMessages.INVALID_SHOP_ID);
                        return res.status(400).json(response);
                    } else if (req.user.userId != req.body.userId && shop.shopOwner && shop.shopOwner._id != req.user.userId
                        && req.user.userType != User.UT_SYS_USER) {
                        // User is not a shop owner/subscriber/system user
                        let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                        return res.status(403).json(response);
                    } else if (req.user.userId !== req.body.userId) {
                        // Check if user exists
                        User.get({ _id: req.body.userId }, (err, user) => {
                            if (user) { return callback(null, shop); }
                            else {
                                let response = responseMessages.commonResponse(responseMessages.INVALID_USER_ID);
                                return res.status(404).json(response);
                            }
                        });
                    } else { return callback(null, shop); }
                });
            }, function (shop, callback) {
                CarOwnerSubscription.get({ userId: req.body.userId, shopId: req.body.shopId }, (err, subscription) => {
                    if (subscription) {
                        // There is already a subscription exists
                        if (subscription.status == CarOwnerSubscription.UNSUBSCRIBED) {
                            // Unsubscribed user trying to subscribe again
                            subscription.createdById = req.user.userId;
                            if (req.user.userId == req.body.userId) {
                                subscription.status = CarOwnerSubscription.PENDING;
                                let name = req.user.firstName + ' ' + req.user.lastName;
                                mail.sendSubscribedNotification(shop.email, shop.businessName, name, function (err, data) {
                                    if (!err) {
                                        logger.writeLog('User Subscription request notification sent to ' + shop.email);
                                    } else {
                                        logger.writeLog('User Subscription request notification sending failed to ' + shop.email);
                                    }
                                });
                            } else {
                                subscription.status = CarOwnerSubscription.APPROVED;
                            }
                            subscription.save(function (err, createdObject) {
                                if (!err) {
                                    logger.writeLog('Subscribed user: ' + req.body.userId + ' to shop: ' + req.body.shopId);
                                    let data = responseMessages.subscription(createdObject);
                                    let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'subscription': data });
                                    return res.status(200).json(response);
                                } else {
                                    logger.writeLog('Failed subscribing user: ' + req.body.userId + ' to shop: ' + req.body.shopId);
                                    let errorData = mongooseErrorExtractor.getErrorData(err);
                                    let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                                    return res.status(400).json(response);
                                }
                            });
                        } else {
                            // Subscription is either approved/pending/rejected
                            logger.writeLog('User: ' + req.body.userId + ' already has a subscription to shop: ' + req.body.shopId);
                            let response = responseMessages.commonResponse(responseMessages.ALREADY_SUBSCRIBED);
                            return res.status(400).json(response);
                        }
                    } else { return callback(null, shop); }
                });
            }], function (error, shop) {
                logger.writeLog('Adding subscription for user: ' + req.body.userId + ' to Shop: ' + req.body.shopId);
                req.body.status = CarOwnerSubscription.PENDING;
                if (req.user.userId === shop.shopOwner._id || req.user.userType == User.UT_SYS_USER) {
                    // Shop owner/ Sys user trying to add subscription for user
                    req.body.status = CarOwnerSubscription.APPROVED;
                } else {
                    let name = req.user.firstName + ' ' + req.user.lastName;
                    mail.sendSubscribedNotification(shop.email, shop.businessName, name, function (err, data) {
                        if (!err) {
                            logger.writeLog('User Subscription request notification sent to ' + shop.email);
                        } else {
                            logger.writeLog('User Subscription request notification sending failed to ' + shop.email);
                        }
                    });
                }
                req.body.createdById = req.user.userId;

                CarOwnerSubscription.create(req.body, function (err, createdObject) {
                    if (!err) {
                        logger.writeLog('Subscribed user: ' + req.body.userId + ' to shop: ' + req.body.shopId);
                        let data = responseMessages.subscription(createdObject);
                        let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'subscription': data });
                        return res.status(200).json(response);
                    } else {
                        logger.writeLog('Failed subscribing user: ' + req.body.userId + ' to shop: ' + req.body.shopId);
                        let errorData = mongooseErrorExtractor.getErrorData(err);
                        let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                        return res.status(400).json(response);
                    }
                });
            });
    };

    /* GET list/search all carOwnerSubscription. */
    exports.list = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('List CarOwnerSubscriptions');

        var query = CarOwnerSubscription.getSearchQuery(req.query);
        var pageNo = req.query.pageNo ? parseInt(req.query.pageNo) : 1;
        var limit = req.query.limit ? parseInt(req.query.limit) : 10;
        var sort = CarOwnerSubscription.getSortQuery(req.query.sort);

        async.waterfall([
            function (callback) {
                CarOwnerSubscription.getCount(query, function (err, count) {
                    callback(err, count);
                });
            }
        ], function (err, count) {

            if (err) {
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                res.status(400).json(response);
            } else {
                CarOwnerSubscription.getAll(query, pageNo, limit, sort, function (err, subscriptions) {
                    if (!err) {
                        let total = 0;
                        if (count[0] && count[0].count) {
                            total = count[0].count;
                        }
                        // Remove full name from all the object as it contains company as well.
                        subscriptions = _.map(subscriptions, function(o) { return _.omit(o, 'user.fullName'); });
                        response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'subscriptions': { 'total': total, 'data': subscriptions } });
                        res.status(200).json(response);
                    } else {
                        var response = responseMessages.commonResponse(responseMessages.FAIL);
                        res.status(400).json(response);
                    }
                });
            }
        });
    };

    /* Get Car owner subscription */
    exports.get = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Get car owner subscription: ' + req.params.id);

        async.waterfall([
            function (callback) {
                CarOwnerSubscription.get({ _id: req.params.id }, (err, subscription) => {
                    if (subscription) { return callback(null, subscription); }
                    else {
                        logger.writeLog('Subscription: ' + req.params.id + ' not found');
                        let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                        return res.status(404).json(response);
                    }
                });
            }, function (subscription, callback) {
                Shop.get({ _id: subscription.shopId }, (err, shop) => {
                    if (!shop) {
                        return callback();
                    } else if (!util.hasPermission('car-owner-subscription.view') && req.user.userId != subscription.userId
                        && shop.shopOwner && shop.shopOwner._id != req.user.userId) {
                        // User is not a shop owner/subscriber/system user
                        let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                        return res.status(403).json(response);
                    } else {
                        let data = responseMessages.subscription(subscription);
                        let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'subscription': data });
                        res.status(200).json(response);
                    }
                });
            }]);
    };

    /* PUT Update Car owner subscription */
    exports.update = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Update car owner subscription: ' + req.params.id);

        async.waterfall([
            function (callback) {
                Shop.get({ _id: req.body.shopId }, (err, shop) => {
                    if (!shop) {
                        // Shop doesn't exists
                        let response = responseMessages.commonResponse(responseMessages.INVALID_SHOP_ID);
                        return res.status(400).json(response);
                    } else if (req.user.userId != req.body.userId && shop.shopOwner && shop.shopOwner._id != req.user.userId
                        && req.user.userType != User.UT_SYS_USER) {
                        // User is not a shop owner/subscriber/system user
                        let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                        return res.status(403).json(response);
                    } else if (req.user.userId !== req.body.userId) {
                        // Check if user exists
                        User.get({ _id: req.body.userId }, (err, user) => {
                            if (user) { return callback(null, shop); }
                            else {
                                let response = responseMessages.commonResponse(responseMessages.INVALID_USER_ID);
                                return res.status(400).json(response);
                            }
                        });
                    } else { return callback(null, shop); }
                });
            }, function (shop, callback) {
                CarOwnerSubscription.get({ _id: req.params.id }, (err, subscription) => {
                    if (subscription) { return callback(null, shop, subscription); }
                    else {
                        logger.writeLog('Subscription: ' + req.params.id + ' not found');
                        let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                        return res.status(404).json(response);
                    }
                });
            }], function (error, shop, subscription) {
                logger.writeLog('Updating subscription for user: ' + req.body.userId + ' to Shop: ' + req.body.shopId);
                if (req.user.userId != shop.shopOwner._id && req.user.userType != User.UT_SYS_USER) {
                    // Car owner can only unsubscribe
                    if (subscription.status != CarOwnerSubscription.UNSUBSCRIBED && req.body.status == CarOwnerSubscription.UNSUBSCRIBED) {
                        let name = req.user.firstName + ' ' + req.user.lastName;
                        mail.sendUnsubscribedNotification(shop.email, shop.businessName, name, function (err, data) {
                            if (!err) {
                                logger.writeLog('User Unsubscribed notification sent to ' + shop.email);
                            } else {
                                logger.writeLog('User Unsubscribed notification sending failed to ' + shop.email);
                            }
                        });
                    } else {
                        req.body.status = subscription.status;
                    }
                }

                subscription.userId = req.body.userId;
                subscription.shopId = req.body.shopId;
                subscription.status = req.body.status;
                subscription.updatedById = req.user.userId;
                subscription.save(function (err) {
                    if (!err) {
                        let response = responseMessages.commonResponse(responseMessages.SUCCESS);
                        return res.status(200).json(response);
                    } else {
                        let errorData = mongooseErrorExtractor.getErrorData(err);
                        let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                        return res.status(400).json(response);
                    }
                });
            });
    };

    /* Delete Car owner subscription to shop */
    exports.delete = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Delete car owner subscription: ' + req.params.id);

        async.waterfall([
            function (callback) {
                CarOwnerSubscription.get({ _id: req.params.id }, (err, subscription) => {
                    if (subscription) { return callback(null, subscription); }
                    else {
                        logger.writeLog('Subscription: ' + req.params.id + ' not found');
                        let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                        return res.status(404).json(response);
                    }
                });
            }, function (subscription, callback) {
                Shop.get({ _id: subscription.shopId }, (err, shop) => {
                    if (!shop) {
                        return callback();
                    } else if (req.user.userId != subscription.userId && shop.shopOwner && shop.shopOwner._id != req.user.userId
                        && req.user.userType != User.UT_SYS_USER) {
                        // User is not a shop owner/subscriber/system user
                        let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                        return res.status(403).json(response);
                    } else { return callback(); }
                });
            }], function () {
                CarOwnerSubscription.removeById({ _id: req.params.id }, function (err) {
                    if (!err) {
                        let response = responseMessages.commonResponse(responseMessages.SUCCESS);
                        return res.status(200).json(response);
                    } else {
                        let errorData = mongooseErrorExtractor.getErrorData(err);
                        let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                        return res.status(400).json(response);
                    }
                });
            });
    };

    /* POST Send invite to M1 synced user */
    exports.inviteM1User = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Invite M1 synced user');

        let subscriptionId = req.params.id;
        async.waterfall([
            // Get subscription record
            function (callback) {
                CarOwnerSubscription.get({_id: subscriptionId}, function (err, carOwnerSubscription) {                    
                    if (carOwnerSubscription) {
                        callback(err, carOwnerSubscription);
                    } else {
                        logger.writeLog('Subscription not found');
                        let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                        return res.status(404).json(response);
                    }
                });
            },
            // Get user record
            function (carOwnerSubscription, callback) {
                User.get({_id: carOwnerSubscription.userId._id}, function (err, user) {
                    if (user) {
                        callback(err, carOwnerSubscription, user);
                    } else {
                        logger.writeLog('User not found');
                        let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                        return res.status(404).json(response);
                    }
                });
            },
            // Get shop record & check correct shop owner
            function (carOwnerSubscription, user, callback) {
                Shop.get({_id: carOwnerSubscription.shopId}, function (err, shop) {
                    if (shop) {
                        if (shop.shopOwner._id == req.user.userId) {
                            callback(err, carOwnerSubscription, user, shop);
                        } else {
                            logger.writeLog('Invalid shop owner');
                            let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                            return res.status(403).json(response);
                        }
                    } else {
                        logger.writeLog('Shop not found');
                        let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                        return res.status(404).json(response);
                    }
                });
            },
            // Generate encrypted password
            function (carOwnerSubscription, user, shop, callback) {
                let password = passwordGenerator.generate({
                    length: 6,
                    numbers: true
                });

                User.getEncryptedPassword(sha1(password), function (err, bcryptedPassword) {
                    callback(err, carOwnerSubscription, user, shop, bcryptedPassword, password);
                });
            },
            // Update password & subscription status
            function (carOwnerSubscription, user, shop, bcryptedPassword, password, callback) {
                let hasPassword = user.password ? true : false;
                CarOwnerSubscription.updateById({_id: carOwnerSubscription._id}, {status: CarOwnerSubscription.APPROVED}, function (err, result) {
                    if (!err) {
                        if (!hasPassword) {
                            // Sending an invite to the user first time from any shop.
                            User.updateById({_id: user._id}, {password: bcryptedPassword}, function (err, result) {
                                if (!err) {
                                    callback(err, user, shop, password, hasPassword);
                                } else {
                                    logger.writeLog('Error updating user password.');
                                    let response = responseMessages.commonResponse(responseMessages.FAIL);
                                    return res.status(400).json(response);
                                }
                            });
                        } else {
                            // Already invited or user has password
                            callback(err, user, shop, password, hasPassword);
                        }
                    } else {
                        logger.writeLog('Error updating subscription status.');
                        let response = responseMessages.commonResponse(responseMessages.FAIL);
                        return res.status(400).json(response);
                    }
                })
            },
        ], function (err, user, shop, password, hasPassword) {
            if (err) {
                logger.writeLog('Error occur while sending invitation.');
                let response = responseMessages.commonResponse(responseMessages.FAIL);
                return res.status(400).json(response);
            } else {
                if (hasPassword) {
                    let name = user.firstName + ' ' + user.lastName;
                    mail.sendInvitationToM1User(name, shop.businessName, 
                        config.get('email.playStoreLink'), config.get('email.appStoreLink'), user.email,function(err, response) {
                            if (!err) {
                                logger.writeLog('Invite sent.');
                                let response = responseMessages.commonResponse(responseMessages.SUCCESS);
                                return res.status(200).json(response);
                            } else {
                                logger.writeLog('Invite sending failed.');
                                let response = responseMessages.commonResponse(responseMessages.FAIL);
                                return res.status(500).json(response);
                            }
                        });
                } else {
                    let name = user.firstName + ' ' + user.lastName;
                    mail.sendInvitationToM1UserFirstTime(name, shop.businessName, 
                        config.get('email.playStoreLink'), config.get('email.appStoreLink'), user.email, password, function(err, response) {
                            if (!err) {
                                logger.writeLog('Invite sent.');
                                let response = responseMessages.commonResponse(responseMessages.SUCCESS);
                                return res.status(200).json(response);
                            } else {
                                logger.writeLog('Invite sending failed.');
                                let response = responseMessages.commonResponse(responseMessages.FAIL);
                                return res.status(400).json(response);
                            }
                        });
                }
            }
        });
    }
})();
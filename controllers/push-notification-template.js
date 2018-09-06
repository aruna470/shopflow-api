
(function () {

    'use strict';

    var async = require('async');
    let config = require('config');
    var isEmpty = require('is-empty');
    var util = require('../lib/util');
    var PushNotificationTemplate = require('../models/push-notification-template');
    var Shop = require('../models/shop');
    var responseMessages = require('../lib/response-messages');
    var mongooseErrorExtractor = require('../lib/mongoose-error-extractor');

    /* POST Create new push notification template */
    exports.create = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Create push notification template');

        async.waterfall([
            function (callback) {
                if (util.hasPermission('push-notification-template.create-shop', req.user.pemissions)) {
                    // Allowed only for shop owner owns shops
                    Shop.get({_id: req.body.shopId, shopOwner: req.user.userId}, function (err, shop) {
                        if (!shop) {
                            var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                            return res.status(403).json(response);
                        } else {
                            callback(null);
                        }
                    });
                }
            }
        ], function () {

            delete req.body.isDefault;

            req.body.createdById = req.user.userId;
            req.body.updatedById = null;
            PushNotificationTemplate.create(req.body, function (err, pushNotificationTemplate) {
                if (!err) {
                    var data = responseMessages.formatCreatedObject(pushNotificationTemplate);
                    var response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'pushNotificationTemplate': data });
                    res.status(200).json(response);
                } else {
                    var errorData = mongooseErrorExtractor.getErrorData(err);
                    var response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                    res.status(400).json(response);
                }
            });
        });
    };

    /* GET List push notification templates */
    exports.list = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('List push notification templates');

        var query = PushNotificationTemplate.getSearchQuery(req.query);
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
                if (util.hasPermission('push-notification-template.list-shop', req.user.pemissions)) {
                    // Allowed only for shop owner owns shops
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
                PushNotificationTemplate.getCount(query, function (err, count) {
                    callback(err, count);
                });
            }
        ], function (err, count) {
            if (err) {
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                return res.status(400).json(response);
            } else {
                PushNotificationTemplate.getAll(query, pageNo, limit, sort, function (err, pushNotificationTemplates) {
                    if (!err) {
                        var data = [];
                        for (var i = 0; i < pushNotificationTemplates.length; i++) {
                            var pushNotificationTemplate = responseMessages.pushNotificationTemplate(pushNotificationTemplates[i]);
                            data.push(pushNotificationTemplate);
                        }
                        response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'pushNotificationTemplates': { 'total': count, 'data': data } });
                        return res.status(200).json(response);
                    } else {
                        var response = responseMessages.commonResponse(responseMessages.FAIL);
                        return res.status(400).json(response);
                    }
                });
            }
        });
    };
    
    /* PUT Update push notification template */
    exports.update = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Update push notification template');

        async.waterfall([
            function (callback) {
                if (util.hasPermission('push-notification-template.update-shop', req.user.pemissions)) {
                    // Allowed only for shop owner owns shops
                    Shop.get({_id: req.body.shopId, shopOwner: req.user.userId}, function (err, shop) {
                        if (!shop) {
                            logger.writeLog('Permission denied. Record is not own by the updater.');
                            var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                            return res.status(403).json(response);
                        } else {
                            callback(null);
                        }
                    });
                }
            },
            function (callback) {
                PushNotificationTemplate.get({_id: req.params.id}, function (err, template) {
                    if (!template) {
                        var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                        return res.status(404).json(response);
                    } else {
                        if (template.isDefault == PushNotificationTemplate.DEFAULT_YES) {
                            logger.writeLog('Permission denied. Not allow to update default record.');
                            var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                            return res.status(403).json(response);
                        } else {
                            callback(null);
                        }
                    }
                });
            }
        ], function () {
            delete req.body.isDefault;
            req.body.updatedById = req.user.userId;

            PushNotificationTemplate.updateById({ _id: req.params.id }, req.body, function (err, result) {
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

    /* GET single push notifications template details */
    exports.get = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('View push notification template details');

        let userId = req.user.userId;
        let pushNotificationTemplateId = req.params.id;

        async.waterfall([
            function (callback) {
                PushNotificationTemplate.get({_id: pushNotificationTemplateId}, function (err, pushNotificationTemplate) {
                    if (pushNotificationTemplate) {
                        callback(null, pushNotificationTemplate);
                    } else {
                        var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                        return res.status(404).json(response);
                    }
                });
            },
            function (pushNotificationTemplate, callback) {
                if (util.hasPermission('push-notification-template.view-shop', req.user.pemissions)) {
                    // Allowed only for shop owner owns shops
                    Shop.get({_id: pushNotificationTemplate.shopId, shopOwner: req.user.userId}, function (err, shop) {
                        if (!shop) {
                            var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                            return res.status(403).json(response);
                        } else {
                            callback(null, pushNotificationTemplate);
                        }
                    });
                } else {
                    var response = responseMessages.commonResponse(responseMessages.FAIL);
                    return res.status(400).json(response);
                }
            }
        ], function (err, pushNotificationTemplate) {
            if (err) {
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                return res.status(400).json(response);
            } else {
                let data = responseMessages.pushNotificationTemplate(pushNotificationTemplate);
                let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'pushNotificationTemplate': data });
                return res.status(200).json(response);
            }
        });
    };

    /* DELETE single push notifications template details */
    exports.delete = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Delete push notification template');

        let userId = req.user.userId;
        let pushNotificationTemplateId = req.params.id;

        async.waterfall([
            function (callback) {
                PushNotificationTemplate.get({_id: pushNotificationTemplateId}, function (err, pushNotificationTemplate) {
                    if (pushNotificationTemplate) {
                        if (pushNotificationTemplate.isDefault == PushNotificationTemplate.DEFAULT_YES) {
                            logger.writeLog('Permission denied. Not allow to delete default record.');
                            var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                            return res.status(403).json(response);
                        } else {
                            callback(null, pushNotificationTemplate);
                        }
                    } else {
                        var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                        return res.status(404).json(response);
                    }
                });
            },
            function (pushNotificationTemplate, callback) {
                if (util.hasPermission('push-notification-template.delete-shop', req.user.pemissions)) {
                    // Allowed only for shop owner owns shops
                    Shop.get({_id: pushNotificationTemplate.shopId, shopOwner: req.user.userId}, function (err, shop) {
                        if (!shop) {
                            var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                            return res.status(403).json(response);
                        } else {
                            callback(null, pushNotificationTemplate);
                        }
                    });
                } else {
                    var response = responseMessages.commonResponse(responseMessages.FAIL);
                    return res.status(400).json(response);
                }
            }
        ], function (err, pushNotificationTemplate) {
            if (err) {
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                return res.status(400).json(response);
            } else {
                PushNotificationTemplate.removeById({ _id: req.params.id }, function (err, result) {
                    if (!err) {
                        var response = responseMessages.commonResponse(responseMessages.SUCCESS);
                        res.status(200).json(response);
                    } else {
                        var response = responseMessages.commonResponse(responseMessages.FAIL);
                        res.status(400).json(response);
                    }
                });
            }
        });
    };

})();

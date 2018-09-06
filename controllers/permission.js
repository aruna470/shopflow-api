
(function () {

    'use strict';

    var async = require('async');
    var util = require('../lib/util');
    var Permission = require('../models/permission');
    var Role = require('../models/role');
    var responseMessages = require('../lib/response-messages');
    var mongooseErrorExtractor = require('../lib/mongoose-error-extractor');


    /* GET list/search all permissions. */
    exports.list = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('List permissions');

        async.waterfall([
            function (callback) {
                Permission.getCount({}, function (err, count) {
                    callback(err, count);
                });
            }
        ], function (err, count) {
            if (err) {
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                res.status(400).json(response);
            } else {
                Permission.getAll({}, function (err, permissions) {
                    if (!err) {
                        var data = [];
                        for (var i = 0; i < permissions.length; i++) {
                            var permission = responseMessages.permission(permissions[i]);
                            data.push(permission);
                        }
                        response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'permissions': { 'total': count, 'data': data } });
                        res.status(200).json(response);
                    } else {
                        var response = responseMessages.commonResponse(responseMessages.FAIL);
                        res.status(400).json(response);
                    }
                });
            }
        });
    };

    /* GET single permission model. */
    exports.get = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Get permission');

        Permission.get({ _id: req.params.id }, (err, permission) => {
            if (permission) {
                var data = responseMessages.permission(permission);
                response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'permission': data });
                res.status(200).json(response);
            } else if (err) {
                console.log(err);
                var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                res.status(404).json(response);
            } else {
                var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                res.status(404).json(response);
            }
        });
    };

    /* POST Create new permission */
    exports.create = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Create permission');

        // Set createdById
        req.body.createdById = req.user.userId;

        Permission.create(req.body, function (err, permission) {
            if (!err) {
                var data = responseMessages.formatCreatedObject(permission);
                var response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'permission': data });
                res.status(200).json(response);
            } else {
                var errorData = mongooseErrorExtractor.getErrorData(err);
                var response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                res.status(400).json(response);
            }
        });
    };

    /* PUT update permission details. */
    exports.update = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Update permission');

        req.body.updatedById = req.user.userId;

        Permission.updateById({ _id: req.params.id }, req.body, function (err, result) {
            if (!err) {
                var response = responseMessages.commonResponse(responseMessages.SUCCESS);
                res.status(200).json(response);
            } else {
                var errorData = mongooseErrorExtractor.getErrorData(err);
                var response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                res.status(400).json(response);
            }
        });
    };

    /* DELETE delete permission. */
    exports.delete = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Delete permission');

        async.waterfall([
            function (callback) {
                // Check whether permission is assigned to any role
                Role.getCount({ 'permissions': req.params.id }, function (err, count) {
                    callback(err, count);
                });
            }
        ], function (err, count) {
            if (err) {
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                res.status(400).json(response);
            } else {
                if (count > 0) {
                    var response = responseMessages.commonResponse(responseMessages.PERMISSION_IN_USE);
                    res.status(400).json(response);
                } else {
                    Permission.removeById({ _id: req.params.id }, function (err, result) {
                        if (!err) {
                            var response = responseMessages.commonResponse(responseMessages.SUCCESS);
                            res.status(200).json(response);
                        } else {
                            var response = responseMessages.commonResponse(responseMessages.FAIL);
                            res.status(400).json(response);
                        }
                    });
                }
            }
        });

    };

})();

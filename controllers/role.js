
(function () {

    'use strict';

    var async = require('async');
    var util = require('../lib/util');
    var Role = require('../models/role');
    var User = require('../models/user');
    var responseMessages = require('../lib/response-messages');
    var mongooseErrorExtractor = require('../lib/mongoose-error-extractor');


    /* GET list/search all permissions. */
    exports.list = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('List roles');

        async.waterfall([
            function (callback) {
                Role.getCount({}, function (err, count) {
                    callback(err, count);
                });
            }
        ], function (err, count) {
            if (err) {
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                res.status(400).json(response);
            } else {
                Role.getAll({}, function (err, roles) {
                    if (!err) {
                        var data = [];
                        for (var i = 0; i < roles.length; i++) {
                            var role = responseMessages.role(roles[i]);
                            data.push(role);
                        }
                        response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'roles': { 'total': count, 'data': data } });
                        res.status(200).json(response);
                    } else {
                        var response = responseMessages.commonResponse(responseMessages.FAIL);
                        res.status(400).json(response);
                    }
                });
            }
        });
    };

    /* POST Create new role */
    exports.create = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Create role');

        // Set createdById
        req.body.createdById = req.user.userId;

        Role.create(req.body, function (err, role) {
            if (!err) {
                var data = responseMessages.formatCreatedObject(role);
                var response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'role': data });
                res.status(200).json(response);
            } else {
                var errorData = mongooseErrorExtractor.getErrorData(err);
                var response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                res.status(400).json(response);
            }
        });
    };

    /* GET single role model. */
    exports.get = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Get role');

        Role.get({ _id: req.params.id }, (err, role) => {
            if (role) {
                var data = responseMessages.role(role);
                response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'role': data });
                res.status(200).json(response);
            } else if (err) {
                var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                res.status(404).json(response);
            } else {
                var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                res.status(404).json(response);
            }
        });
    };

    /* PUT update role details. */
    exports.update = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Update role');

        req.body.updatedById = req.user.userId;

        Role.updateById({ _id: req.params.id }, req.body, function (err, result) {
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

    /* DELETE delete role. */
    exports.delete = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Delete role');

        async.waterfall([
            function (callback) {
                // Check whether role is assigned to any user
                User.getCount({ 'roleId': req.params.id }, function (err, count) {
                    if (count > 0) {
                        var response = responseMessages.commonResponse(responseMessages.ROLE_IN_USE);
                        return res.status(400).json(response);
                    } else {
                        callback();
                    }
                });
            },
            function (callback) {
                Role.get({ _id: req.params.id }, (err, role) => {
                    if (role) {
                        if (role.isDefault == Role.IS_DEFAULT) {
                            var response = responseMessages.commonResponse(responseMessages.DEFAULT_ROLE);
                            return res.status(400).json(response);
                        } else {
                            callback();
                        }
                    } else {
                        var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                        return res.status(400).json(response);
                    }
                });
            }
        ], function (err) {
            if (err) {
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                res.status(400).json(response);
            } else {
                Role.removeById({ _id: req.params.id }, function (err, result) {
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

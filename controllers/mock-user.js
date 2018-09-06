
(function () {

    'use strict';

    var async = require('async');
    var responseMessages = require('../lib/response-messages');
    var MockUser = require('../models/mock-user');
    var mongooseErrorExtractor = require('../lib/mongoose-error-extractor');

    /* POST Create mock user */
    exports.create = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Create mock user');

        var mUser = new MockUser(req.body);

        mUser.validate(function (err) {
            if (!err) {
                var response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'mockUser': { 'id': '5a56fe9a1605fa1ab8677e14' } });
                res.status(200).json(response);
            } else {
                var errorData = mongooseErrorExtractor.getErrorData(err);
                var response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                res.status(400).json(response);
            }
        });
    };

    /* PUT Update mock user */
    exports.update = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Update mock user');

        var mUser = new MockUser(req.body);

        mUser.validate(function (err) {
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

    /* GET list all mock users. */
    exports.list = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('List mock users');

        var data = {
            "total": 2,
            "data": [
                {
                    "firstName": "Jhon",
                    "email": "jhon@gmail.com",
                    "lastName": "Smith"
                },
                {
                    "firstName": "Gavin",
                    "email": "gavin@gmail.com",
                    "lastName": "Smith"
                }
            ]
        };

        var response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'mockUsers': data });
        res.status(200).json(response);
    };

    /* GET single mock user model. */
    exports.get = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Get mock user');

        var data = {
            "firstName": "Jhon",
            "email": "jhon@gmail.com",
            "lastName": "Smith"
        };

        var response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'mockUser': data });
        res.status(200).json(response);
    };

    /* Delete single mock user model. */
    exports.delete = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Delete mock user');

        var response = responseMessages.commonResponse(responseMessages.SUCCESS);
        res.status(200).json(response);
    };

})();

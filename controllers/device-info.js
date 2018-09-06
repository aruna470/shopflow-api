(function () {

    'use strict';

    var isEmpty = require('is-empty');
    var async = require('async');
    var DeviceInfo = require('../models/device-info');
    var responseMessages = require('../lib/response-messages');
    var mongooseErrorExtractor = require('../lib/mongoose-error-extractor');
    var aws = require('../lib/aws');
    var pushNotification = require('../lib/push-notification');


    /* POST Create new device info */
    exports.create = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Create device info');

        async.waterfall([
            function (callback) {
                // If the token is already in use delete it
                DeviceInfo.deleteMany({ token: req.body.token }, (err, deviceInfo) => {
                    callback();
                });
            }
        ], function () {

            logger.writeLog('Registering user with deviceId: ' + req.body.token);
            pushNotification.register(req.body.token, req.body.deviceType, function (err, endpointArn) {
                if (!err) {
                    req.body.endpointArn = endpointArn;
                    DeviceInfo.create(req.body, function (err, createdObject) {
                        if (!err) {
                            let response = responseMessages.commonResponse(responseMessages.SUCCESS);
                            return res.status(200).json(response);
                        } else {
                            let errorData = mongooseErrorExtractor.getErrorData(err);
                            let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                            return res.status(400).json(response);
                        }
                    });
                } else {
                    // Notification server error
                    logger.writeLog('Error registering device with notification server. deviceId: ' + req.body.token);
                    return res.sendStatus(400);
                }
            });
        });
    };

})();

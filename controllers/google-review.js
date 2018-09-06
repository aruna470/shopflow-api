/**
 * Handle google review invite related queries
 * @author Layansan Rajendram
 */
(function () {

    'use strict';

    var async = require('async');
    var config = require('config');
    var isEmpty = require('is-empty');
    var responseMessages = require('../lib/response-messages');
    var googleReview = require('../lib/google-review');
    var Shop = require('../models/shop');
    var User = require('../models/user');
    var CarOwnerSubscription = require('../models/car-owner-subscription');
    var DeviceInfo = require('../models/device-info');

    // Notification server related params
    let rsBaseUrl = config.get('reviewServer.baseUrl');
    let rsApiKey = config.get('reviewServer.apiKey');
    let rsApiSecret = config.get('reviewServer.apiSecret');

    /* POST Invite a user to leave google business review for shop */
    exports.invite = function (req, res, next) {
        let logger = req.logger;
        logger.writeLog('Invite User to Submit Google Business Review');

        async.waterfall([
            function (callback) {
                // Get shop and check if user whether has subscribed
                Shop.get({ _id: req.body.shopId }, (err, shop) => {
                    if (shop) {
                        CarOwnerSubscription.get({ shopId: shop._id, userId: req.body.userId }, (err, subscription) => {
                            if (!subscription || subscription.status != CarOwnerSubscription.APPROVED) {
                                let response = responseMessages.commonResponse(responseMessages.USER_NOT_SUBSCRIBED);
                                return res.status(400).json(response);
                            } else { return callback(null, shop); }
                        });
                    } else {
                        var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND, 'shopId');
                        return res.status(404).json(response);
                    }
                });
            }, function (shop) {
                // Get the placeId from shop or from the request
                if (isEmpty(shop.googlePlaceId) && isEmpty(req.body.googlePlaceId)) {
                    let response = responseMessages.commonResponse(responseMessages.MISSING_MANDATORY_ATTRIBUTE, 'googlePlaceId');
                    return res.status(400).json(response);
                }
                let placeId = isEmpty(req.body.googlePlaceId) ? shop.googlePlaceId : req.body.googlePlaceId;

                DeviceInfo.getAll({ userId: req.body.userId }, (err, devices) => {
                    if (devices) {
                        googleReview.sendInvite(devices, placeId, req.body.shopId, shop.businessName, req.body.title, req.body.text, req.user.userId, function (err) {
                            if (err) {
                                logger.writeLog('Error sending review invites:' + err);
                                let response = responseMessages.commonResponse(responseMessages.FAIL);
                                return res.status(500).json(response);
                            } else {
                                let response = responseMessages.commonResponse(responseMessages.SUCCESS);
                                return res.status(200).json(response);
                            }
                        });
                    } else {
                        let response = responseMessages.commonResponse(responseMessages.NO_DEVICE_FOUND);
                        return res.status(400).json(response);
                    }
                });
            }
        ], function (err) {
            if (err) {
                logger.writeLog('Couldn\'t process invite request: ' + err);
                let response = responseMessages.commonResponse(responseMessages.FAIL);
                return res.status(500).json(response);
            }
        });
    };

})();

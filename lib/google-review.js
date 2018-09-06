
/**
 * @name google-review.js
 * @fileOverview Handle google review related tasks
 * @author Layansan Rajendram
 */

(function () {

    'use strict';

    let Client = require('node-rest-client').Client;
    let config = require('config');
    let async = require('async');
    let isEmpty = require('is-empty');

    let Logger = require('./logger').Logger;
    var DeviceInfo = require('../models/device-info');

    // Notification server related params
    let rsBaseUrl = config.get('reviewServer.baseUrl');
    let rsApiKey = config.get('reviewServer.apiKey');
    let rsApiSecret = config.get('reviewServer.apiSecret');
    let rsDefTitle = config.get('reviewServer.defaultTitle');
    let rsDefMsg = config.get('reviewServer.defaultMessage');

    // Initialize logger
    let log = new Logger();
    log.logData.logType = log.API;
    log.logData.action = 'googleReview';


    /**
     * Submit review invite request to review server
     * @param {DeviceInfo[]} devices - Array of user's DeviceInfo Objects
     * @param {String} placeId - Shop's google PlaceId
     * @param {ObjectId} shopId - Shop ID
     * @param {String} shopName - Shop's business name
     * @param {string} title - Notification message title
     * @param {string} body - Notification body text
     * @param {string} createdById - Shop owner userId
     * @callback request callback
     */
    function sendInvite(devices, placeId, shopId, shopName, title, body, createdById, callback) {

        // Set default title & message if they are missing
        let msgTitle = isEmpty(title) ? rsDefTitle : title;
        let msgBody = isEmpty(body) ? rsDefMsg.replace('<shopName>', shopName) : body;

        let client = new Client();
        let endpointArn = [];
        let deviceType = [];
        let userId = devices[0].userId;

        for (let i = 0; i < devices.length; i++) {
            endpointArn.push(devices[i].endpointArn);
            deviceType.push(devices[i].deviceType);
        }
        let args = {
            data: {
                'endpointArn': endpointArn,
                'title': msgTitle,
                'message': msgBody,
                'deviceType': deviceType,
                'businessName': shopName,
                'placeId': placeId,
                'userId': userId,
                'shopId': shopId,
                'createdById': createdById
            },
            headers: { "api-key": rsApiKey, "api-secret": rsApiSecret, "Content-Type": "application/json" }
        };

        let req = client.post(rsBaseUrl + '/v1/google-review/invite', args, function (data, response) {
            if (data.code == "SUCCESS") {
                log.writeLog('Push notification sent. Data:' + JSON.stringify(args.data));
                callback(null);
            } else {
                log.writeLog('Push notification sending failed. Data:' + JSON.stringify(args.data));
                callback('error');
            }
        });

        req.on('requestTimeout', function (req) {
            log.writeLog('request has expired');
            req.abort();
            callback('error');
        });

        req.on('responseTimeout', function (res) {
            log.writeLog('response has expired');
            callback('error');
        });

        req.on('error', function (err) {
            log.writeLog('request error', err);
            callback('error');
        });
    }

    /**
     * Export module functions to be accessed from outside
     */
    module.exports = {
        sendInvite: sendInvite
    }

})();
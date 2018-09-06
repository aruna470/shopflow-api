(function () {

	'use strict';

	var async = require('async');
	var isEmpty = require('is-empty');
	var multer = require('multer');
	var config = require('config');
	var aws = require('../lib/aws');
	var upload = multer({ dest: config.get('tmpPath') });
	var responseMessages = require('../lib/response-messages');
	var VehicleRecommendation = require('../models/vehicle-recommendation');
	var VehicleRepairHistory = require('../models/vehicle-repair-history');
	var Vehicle = require('../models/vehicle');
	var CarOwnerSubscription = require('../models/car-owner-subscription');

	/* POST upload file to S3. */
	exports.s3Upload = function (req, res, next) {

		var logger = req.logger;
		logger.writeLog('Upload file to S3 bucket');

		var isPublic = (req.query.public && req.query.public == true) ? true : false;

		if (!isEmpty(req.file)) {
			logger.writeLog('Upload file details:', JSON.stringify(req.file));
			aws.s3UploadOjbect(req.file.originalname, req.file.path, logger, function (err, awsResponse) {
				if (!err) {
					response = responseMessages.s3Response(awsResponse.key, awsResponse.signedUrl);
					res.status(200).json(response);
				} else {
					logger.writeLog('error: ' + JSON.stringify(err));
					var response = responseMessages.commonResponse(responseMessages.FAIL);
					res.status(500).json(response);
				}
			}, isPublic);
		} else {
			var response = responseMessages.commonResponse(responseMessages.MISSING_MANDATORY_ATTRIBUTE, 'fileData');
			res.status(400).json(response);
		}
	};

	/* GET Retrieves Presigned URL for given file. */
	exports.s3Download = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('S3 Download, Generate Presigned Url');

		if (!isEmpty(req.params.fileName)) {
			aws.s3GetSignedUrl(req.params.fileName, function (err, awsResponse) {
				if (!err) {
					response = responseMessages.s3Response(req.params.fileName, awsResponse);
					res.status(200).json(response);
				} else {
					logger.writeLog('Error occured while getting presigned URL for file: ' + req.params.fileName + ' ' + err);
					var response = responseMessages.commonResponse(responseMessages.FAIL);
					res.status(500).json(response);
				}
			});
		} else {
			var response = responseMessages.commonResponse(responseMessages.MISSING_MANDATORY_ATTRIBUTE, 'fileName');
			res.status(400).json(response);
		}
	};

	/* Check API connectivity. */
	exports.syncToolApiConCheck = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('Synctool API connectivity check');

		var response = responseMessages.commonResponse(responseMessages.SUCCESS);
		res.status(200).json(response);
	}

	/* Retrieve last sync information for sync tool. Such as last sync date, ids etc... */
	exports.getLastSyncInfo = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('Synctool get last sync info');

		async.waterfall([
			// Get maximum recommendation id
			function (callback) {
				VehicleRecommendation.getMaxRecommendationId(req.user.shopId, function(err, recommendation) {
					if (!err) {
						var recommendationId = recommendation ? recommendation.recommendationId : 0;
						callback(null, recommendationId);
					} else {
						callback(err);
					}
				});
			},
			// Get maximum history id
			function (recommendationId, callback) {
				VehicleRepairHistory.getMaxRepairOrderId(req.user.shopId, function(err, history) {
					if (!err) {
						var repairOrderId = history ? history.repairOrderId : 0;
						callback(null, recommendationId, repairOrderId);
					} else {
						callback(err);
					}
				});
			},
			// Check whether customers already being synced
			function (recommendationId, repairOrderId, callback) {
				CarOwnerSubscription.getCustomerSyncedStatus(req.user.shopId, function(err, isCustSynced) {
					if (!err) {
						callback(null, recommendationId, repairOrderId, isCustSynced);
					} else {
						callback(err);
					}
				});
			},
			// Get max vehicle id
			function (recommendationId, repairOrderId, isCustSynced, callback) {
				Vehicle.getMaxVehicleId(req.user.shopId, function(err, vehicle) {
					if (!err) {
						var vehicleId = vehicle ? vehicle.vehicleId : 0;
						callback(null, recommendationId, repairOrderId, isCustSynced, vehicleId);
					} else {
						callback(err);
					}
				});
			}
		], function (err, recommendationId, repairOrderId, isCustSynced, vehicleId) {
			if (err) {
				var response = responseMessages.commonResponse(responseMessages.FAIL);
				res.status(400).json(response);
			} else {
				let syncInfo = {
					'syncInfo': responseMessages.getLastSyncInfo(recommendationId, repairOrderId, isCustSynced, vehicleId)
				}
				var response = responseMessages.commonResponse(responseMessages.SUCCESS, null, syncInfo);
				res.status(200).json(response);				
			}
		});
	}
	
})();

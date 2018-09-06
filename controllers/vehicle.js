
(function () {

	'use strict';

	var async = require('async');
	var util = require('../lib/util');
	var isEmpty = require('is-empty');
	var Vehicle = require('../models/vehicle');
	var Shop = require('../models/shop');
	var User = require('../models/user');
	var responseMessages = require('../lib/response-messages');
	var mongooseErrorExtractor = require('../lib/mongoose-error-extractor');
	var UserManagedShop = require('../models/user-managed-shop');
	var VehicleRecommendation = require('../models/vehicle-recommendation');
	var VehicleRepairHistory = require('../models/vehicle-repair-history');

	/**
	 * List vehicles. If user doesn't have vehicle.list permission records belongs to requested userId would be returned
	 */
	exports.list = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('List vehicles');

		var query,
			pageNo = req.query.pageNo ? req.query.pageNo : 1,
			limit = req.query.limit ? req.query.limit : 10,
			sort = Vehicle.getSortQuery(req.query.sort);

		async.waterfall([
			function (callback) {
				// If user has list permission no need to enforce any restriction
				if (util.hasPermission('vehicle.list', req.user.pemissions)) {
					return callback(null);
				} else if (util.hasPermission('vehicle.list-managed-shop-vehicles', req.user.pemissions)) {
					// Area manager has permission to access vehicle records belongs to shop managed by him
					UserManagedShop.getShopIdsByManagedUserId(req.user.userId, function (err, managedShopIds) {
						if (err) {
							let response = responseMessages.commonResponse(responseMessages.FAIL);
							return res.status(500).json(response);
						} else if (managedShopIds.length === 0) {
							let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'vehicles': { 'total': 0, 'data': [] } });
							res.status(200).json(response);
						} else {
							let ids = [];
							for (let i = 0; i < managedShopIds.length; i++) {
								ids.push(managedShopIds[i].shopId);
							}
							req.query.shopIds = ids;
							return callback(err);
						}
					});
				} else if (util.hasPermission('vehicle.list-shop-vehicles', req.user.pemissions)) {
					// Shop owner has permission to access vechile records belongs to his shop
					Shop.getIdsByShopOwner(req.user.userId, function (err, ids) {
						if (err) {
							let errorData = mongooseErrorExtractor.getErrorData(err);
							let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
							return res.status(400).json(response);
						} else if (ids.length === 0) {
							let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'vehicles': { 'total': 0, 'data': [] } });
							res.status(200).json(response);
						}
						req.query.shopIds = ids;
						return callback(err);
					});
				} else {
					// Car owner access their own vehicle records
					req.query.userId = req.user.userId;
					return callback(null);
				}
			}, function (callback) {
				query = Vehicle.getSearchQuery(req.query);
				// Get record count associated with this query
				Vehicle.getCount(query, function (err, count) {
					callback(err, count);
				});
			}
		], function (err, count) {
			if (err) {
				logger.writeLog('Error getting vehicle count: ' + err);
				let response = responseMessages.commonResponse(responseMessages.FAIL);
				return res.status(400).json(response);
			} else {
				Vehicle.getAll(query, pageNo, limit, sort, function (err, vehicles) {
					if (!err) {
						let data = [];
						for (let i = 0; i < vehicles.length; i++) {
							let vehicle = responseMessages.vehicle(vehicles[i]);
							data.push(vehicle);
						}
						let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'vehicles': { 'total': count, 'data': data } });
						return res.status(200).json(response);
					} else {
						logger.writeLog('Failed to retrieve vehicle records: ' + err);
						let response = responseMessages.commonResponse(responseMessages.FAIL);
						return res.status(400).json(response);
					}
				});
			}
		});
	};

	/* GET single vehicle model. User should have vehicle.view or should own the record */
	exports.get = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('Get Vehicle: ' + req.params.id);

		Vehicle.get({ _id: req.params.id }, (err, vehicle) => {
			if (vehicle) {
				async.waterfall([
					function (callback) {
						if ((vehicle.userId && req.user.userId == vehicle.userId._id) || util.hasPermission('vehicle.view', req.user.pemissions)) {
							// User has view permission
							return callback(null, true);
						} else if (util.hasPermission('vehicle.view-managed-shop-vehicle', req.user.pemissions)) {
							// Area manager can access vehicle data belongs to his managed shop
							UserManagedShop.getShopIdsByManagedUserId(req.user.userId, function (err, managedShopIds) {
								if (!err) {
									let ids = [];
									for (let i = 0; i < managedShopIds.length; i++) {
										if (vehicle.shopId.toString() == managedShopIds[i].shopId.toString()) {
											return callback(err, true);
										}
									}
								}
								callback(err, null);
							});
						} else if (util.hasPermission('vehicle.view-shop-vehicle', req.user.pemissions)) {
							// Shop owner has permission to access vechile records belongs to his shop
							Shop.getIdsByShopOwner(req.user.userId, function (err, ids) {
								if (!err) {
									for (let i = 0; i < ids.length; i++) {
										if (vehicle.shopId.toString() == ids[i]._id.toString()) {
											return callback(err, true);
										}
									}
								}
								callback(err, null);
							});
						}
					}], function (err, hasPermission) {
						if (err) {
							let response = responseMessages.commonResponse(responseMessages.FAIL);
							return res.status(500).json(response);
						} else if (!hasPermission) {
							let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
							return res.status(403).json(response);
						} else {
							let data = responseMessages.vehicle(vehicle);
							let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'vehicle': data });
							return res.status(200).json(response);
						}
					});
			} else {
				let response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
				return res.status(404).json(response);
			}
		});
	};

	/* POST sync M1 vehicle details */
	exports.syncVehicles = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('Sync vehicle details');

		let vehicles = req.body.vehicles,
			totalRecords = vehicles.length,
			successCount = 0,
			vehicleIds = [];

		async.each(vehicles, function (vehicle, callback) {
			vehicle.custEmail = vehicle.custEmail.toLowerCase();
			User.get({"email": vehicle.custEmail}, function (err, user) {
				if (!err) {
					let userId = !isEmpty(user) ? user._id : null;
					vehicle.userId = userId;
					vehicle.shopId = req.user.shopId;

					if (vehicle.action == null || vehicle.action == 'A' || vehicle.action == 'U') {
						Vehicle.createOrUpdate(vehicle, function (err, response) {
							if (err) {
								logger.writeLog('Error while updating vehicle. Err:' + JSON.stringify(err));
							} else {
								successCount++;
								vehicleIds.push(response._id);
								logger.writeLog('Vehicle details updated');
							}
							callback(null);
						})
					} else if (vehicle.action == 'D') {
						async.waterfall([
							function(callback) {
								// Delete associated recommendation records
								VehicleRecommendation.removeByPrams({m1VehicleId: vehicle.vehicleId, shopId: req.user.shopId}, function (err, result) {
									if (!err) {
										logger.writeLog('Deleted associated vehicle recommendations. vehicleId:' +  vehicle.vehicleId);
									} else {
										logger.writeLog('Deleting associated vehicle recommendations failed. vehicleId:' +  vehicle.vehicleId);
									}
									callback(null);
								});
							},
							function(callback) {
								// Delete associated history records
								VehicleRepairHistory.removeByPrams({m1VehicleId: vehicle.vehicleId, shopId: req.user.shopId}, function (err, result) {
									if (!err) {
										logger.writeLog('Deleted associated vehicle history records. vehicleId:' +  vehicle.vehicleId);
									} else {
										logger.writeLog('Deleting associated vehicle history records failed. vehicleId:' +  vehicle.vehicleId);
									}
									callback(null);
								});
							},
							function(callback) {
								// Delete vehicle record
								Vehicle.removeByPrams({vehicleId: vehicle.vehicleId, shopId: req.user.shopId}, function (err, result) {
									if (!err) {
										logger.writeLog('Vehicle deleted. vehicleId:' +  vehicle.vehicleId);
									} else {
										logger.writeLog('Vehicle delete failed. vehicleId:' +  vehicle.vehicleId);
									}
									callback(null);
								});
							}
						], function (err, result) {
							if (err) {
								logger.writeLog('Error: ' + JSON.stringify(err));
							}
							callback(null);
						});
					} else {
						callback(null);
					}
				} else {
					logger.writeLog('Error while getting user');
					callback(null);
				}
			});
		}, function (err) {
			logger.writeLog('Vechicle batch processing is over');
			let resData = { "vehicles": vehicleIds };
			if (totalRecords == successCount) {
				var response = responseMessages.commonResponse(responseMessages.SUCCESS, null, resData);
				return res.status(200).json(response);
			} else if (successCount > 0) {
				var response = responseMessages.commonResponse(responseMessages.SOME_RECORDS_SYNCED, null, resData);
				return res.status(200).json(response);
			} else {
				var response = responseMessages.commonResponse(responseMessages.FAIL, null, resData);
				return res.status(200).json(response);
			}
		});
	};

	/* DELETE delete vehicle. */
	exports.delete = function (req, res, next) {
		var logger = req.logger;
		logger.writeLog('Delete vehicle');

		Vehicle.removeById({ _id: req.params.id }, function (err, result) {
			if (!err) {
				var response = responseMessages.commonResponse(responseMessages.SUCCESS);
				res.status(200).json(response);
			} else {
				var response = responseMessages.commonResponse(responseMessages.FAIL);
				res.status(400).json(response);
			}
		});
	};

})();

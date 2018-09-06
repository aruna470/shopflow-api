/**
 * @name vehicle.js
 * @fileOverview Vehicle model
 * @author Aruna Attanayake
 */

(function() {

	'use strict';

	var mongoose = require('mongoose');
	var responseMessages = require('../lib/response-messages');
	var isEmpty = require('is-empty');
	var _ = require('lodash');

	var vehicleSchema = new mongoose.Schema({
		shopId: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			ref: 'Shop'
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		make: {
			type: String,
			default: null
		},
		licenseNumber: {
			type: String,
			default: null
		},
		year: {
			type: Number,
			default: null
		},
		name: {
			type: String,
			default: null
		},
		model: {
			type: String,
			default: null
		},
		vehicleId: {
			// M1 Vehicle id
			type: Number,
			default: null
		},
		custEmail: {
			// M1 Customer email address
			type: String,
			default: null
		},
		odometer: {
			type: Number,
			default: null
		},
		inspDate: {
			type: Date,
			default: null
		},
		lastInDate: {
			type: Date,
			default: null
		},
		mfgDate: {
			type: Date,
			default: null
		}
	}, {
		collection: 'vehicle',
		usePushEach: true,
		timestamps: true,
		collation: {
			locale: 'en_US',
			strength: 1
		}
	});

	vehicleSchema.statics = {
		createOrUpdate: function(vehicle, callback) {
			this.findOneAndUpdate(
				{"vehicleId": vehicle.vehicleId, "shopId": vehicle.shopId}, 
				vehicle, 
				{runValidators: true, upsert: true, new: true},
				callback
			);
		},
		
		removeById: function(removeData, callback) {
			this.remove(removeData, callback);
		},

		removeByPrams: function (removeData, callback) {
			this.remove(removeData, callback);
		},

		get: function(query, callback) {
			this.findOne(query)
				.populate('userId', ['firstName', 'lastName'])
				.exec(callback);
		},

		getCount: function(query, callback) {
			this.count(query, callback);
		},
		
		getAll: function (query, pageNo, limit, sort, callback) {

			var skip = (pageNo - 1) * limit;

			this.aggregate([
				{
					$lookup: {
						from: 'user',
						localField: 'userId',
						foreignField: '_id',
						as: 'user'
					}
				},
				{
					$addFields: {
						user: {
							$let: {
								vars: {
									firstUser: {
										$arrayElemAt: ['$user', 0]
									}
								},
								in: {
									id: '$$firstUser._id',
									firstName: '$$firstUser.firstName',
									lastName: '$$firstUser.lastName',
								}
							}
						},
					}
				},
				{ $match: query },
				{ $sort: sort },
				{ $skip: skip },
				{ $limit: parseInt(limit) },
			], callback);
		},

		getSearchQuery: function (queryParams) {
			let qModel = {};
			let qMake = {};
			let qShopId = {};
			let qUserId = {};
			let qShopIds = {};
			if (!isEmpty(queryParams.model)) {
				qModel = { model: { $regex: '.*' + queryParams.model + '.*', $options: 'i' } };
			}
			if (!isEmpty(queryParams.make)) {
				qMake = { make: { $regex: '.*' + queryParams.make + '.*', $options: 'i' } };
			}
			if (!isEmpty(queryParams.shopId)) {
				qShopId = { shopId: queryParams.shopId };
			}
			if (!isEmpty(queryParams.userId)) {
				qUserId = { userId: queryParams.userId }
			}
			if (queryParams.shopIds && queryParams.shopIds.length > 0) {
				qShopIds = { shopId: { $in: queryParams.shopIds } };
			}

			let query = { $and: [qModel, qMake, qShopId, qUserId, qShopIds] };
			return query;
		},

		getSortQuery: function (sortParams) {
			let sort = { createdAt: -1 };
			if (sortParams) {
				let sortOrder = sortParams.charAt(0) == '-' ? -1 : 1;
				let sortField = _.trim(sortParams, '-');
				sortField = sortField === ('firstName' || 'lastName') ? 'user.' + sortField : sortField;
				sort = { [sortField]: sortOrder };
			}
			return sort;
		},

		getMaxVehicleId: function (shopId, callback) {
			this.findOne({'shopId': shopId})
				.sort({vehicleId: -1})
				.limit(1)
				.exec(callback);
		}
	}

	// Create indexes for unique fields
	vehicleSchema.set('autoIndex', true);
	module.exports = mongoose.model('Vehicle', vehicleSchema);

})();

/**
 * @name car-owner-subscription.js
 * @fileOverview CarOwnerSubscription model
 * @author Layansan Rajendram
 */

(function () {

	'use strict';

	var mongoose = require('mongoose');
	var responseMessages = require('../lib/response-messages');
	var isEmpty = require('is-empty');
	var _ = require('lodash');

	// Subscription Status types
	const PENDING = 0,
		APPROVED = 1,
		REJECTED = 2,
		UNSUBSCRIBED = 3,
		SYNCED = 4; // This status is not actually maintain on db

	var carOwnerSubscriptionSchema = new mongoose.Schema({
		shopId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shop',
			required: true
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		status: {
			// 0 - PENDING, 1 - APPROVED, 2 - REJECTED , 3 - UNSUBSCRIBED
			type: Number,
			min: 0,
			max: 3,
			default: 0,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE]
		},
		createdById: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			default: null
		},
		updatedById: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			default: null
		}
	}, {
		collection: 'carOwnerSubscription',
		usePushEach: true,
		timestamps: true,
		collation: {
			locale: 'en_US',
			strength: 1
		}
	});

	carOwnerSubscriptionSchema.statics = {

		PENDING: PENDING,
		APPROVED: APPROVED,
		REJECTED: REJECTED,
		UNSUBSCRIBED: UNSUBSCRIBED,

		get: function (query, callback) {
			this.findOne(query)
				.populate('userId', ['firstName', 'lastName', 'email'])
				.populate('createdById', ['firstName', 'lastName'])
				.populate('updatedById', ['firstName', 'lastName'])
				.exec(callback);
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
					$lookup: {
						from: 'shop',
						localField: 'shopId',
						foreignField: '_id',
						as: 'shop'
					}
				},
				{
					$lookup: {
						from: 'user',
						localField: 'createdById',
						foreignField: '_id',
						as: 'createdBy'
					}
				},
				{
					$lookup: {
						from: 'user',
						localField: 'updatedById',
						foreignField: '_id',
						as: 'updatedBy'
					}
				},
				{
					$project: {
						_id: 0,
						id: '$_id',
						status: 1,
						createdAt: 1,
						updatedAt: 1,
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
									email: '$$firstUser.email',
									mobile: '$$firstUser.mobile',
									createdAt: '$$firstUser.createdAt',
									isM1SyncedUser: '$$firstUser.isM1SyncedUser',
									company: '$$firstUser.company',
									fullName: {
										$concat: ["$$firstUser.firstName", " ", "$$firstUser.lastName"]
									}
								}
							}
						},
						shop: {
							$let: {
								vars: {
									firstShop: {
										$arrayElemAt: ['$shop', 0]
									}
								},
								in: {
									id: '$$firstShop._id',
									brandName: '$$firstShop.brandName',
									businessName: '$$firstShop.businessName',
									createdAt: '$$firstShop.createdAt'
								}
							}
						},
						createdBy: {
							$let: {
								vars: {
									firstCreatedBy: {
										$arrayElemAt: ['$createdBy', 0]
									}
								},
								in: {
									id: '$$firstCreatedBy._id',
									firstName: '$$firstCreatedBy.firstName',
									lastName: '$$firstCreatedBy.lastName'
								}
							}
						},
						updatedBy: {
							$let: {
								vars: {
									firstUpdateddBy: {
										$arrayElemAt: ['$updatedBy', 0]
									}
								},
								in: {
									id: '$$firstUpdateddBy._id',
									firstName: '$$firstUpdateddBy.firstName',
									lastName: '$$firstUpdateddBy.lastName'
								}
							}
						}
					}
				},
				{ $match: query },
				{ $sort: sort },
				{ $skip: skip },
				{ $limit: limit },
			], callback);
		},

		getShopIdsAndStatusByUserId: function (userId, queryParams, callback) {
			let qStatus = {};
			if (!isEmpty(queryParams.subscriptionStatus)) {
				let statusArr = new Array();
				statusArr = queryParams.subscriptionStatus.split(",");
				for (let a in statusArr) {
					statusArr[a] = parseInt(statusArr[a], 10);
				}
				qStatus = { status: { $in: statusArr } }
			}
			this.find({ userId: userId, $and: [qStatus] }, callback).select('shopId status -_id');
		},

		getUserIdsByShopId: function (shopId, queryParams, callback) {
			let qStatus = {};
			if (!isEmpty(queryParams.status)) {
				qStatus = { status: queryParams.status }
			}
			this.find({ shopId: shopId, $and: [qStatus] }, callback).select('userId -_id');
		},

		getUserCountByShopIds: function (shopIds, status, callback) {
			let qStatus = {};
			if (!isEmpty(status)) {
				qStatus = { status: status }
			}
			this.distinct('userId', { shopId: { $in: shopIds }, $and: [qStatus] }).exec(callback);
		},

		getUserCountByShopId: function (shopId, status, callback) {
			let qStatus = {};
			if (!isEmpty(status)) {
				qStatus = { status: status }
			}
			this.distinct('userId', { shopId: { $eq: shopId }, $and: [qStatus] }).exec(callback);
		},

		updateById: function (id, updateData, callback) {
			this.update(id, { $set: updateData }, { runValidators: true }, callback);
		},

		removeById: function (removeData, callback) {
			this.remove(removeData, callback);
		},

		create: function (data, callback) {
			var carOwnerSubscription = new this(data);
			carOwnerSubscription.save(callback);
		},

		getCount: function (query, callback) {
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
					$lookup: {
						from: 'shop',
						localField: 'shopId',
						foreignField: '_id',
						as: 'shop'
					}
				},
				{
					$project: {
						_id: 0,
						id: '$_id',
						status: 1,
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
									email: '$$firstUser.email',
									isM1SyncedUser: '$$firstUser.isM1SyncedUser',
									company: '$$firstUser.company',
									fullName: {
										$concat: ["$$firstUser.firstName", " ", "$$firstUser.lastName"]
									}
								}
							}
						},
						shop: {
							$let: {
								vars: {
									firstShop: {
										$arrayElemAt: ['$shop', 0]
									}
								},
								in: {
									id: '$$firstShop._id'
								}
							}
						}
					}
				},
				{ $match: query },
				{
					$count: "count"
				}
			], callback);
		},

		getSearchQuery: function (queryParams) {
			let qShopId = {};
			let qUserId = {};
			let qStatus = {};
			let qFirstName = {};
			let qLastName = {};
			let qEmail = {};
			let qIsM1Synced = {};
			let qFullName = {};
			let qCompany = {};

			if (!isEmpty(queryParams.shopId)) {
				let id = mongoose.Types.ObjectId(queryParams.shopId);
				qShopId = { 'shop.id': id };
			}
			if (!isEmpty(queryParams.status)) {
				if (queryParams.status == PENDING) {
					// Filter pending but not synced via M1
					qStatus = { 'status': parseInt(queryParams.status) };
					qIsM1Synced = { 'user.isM1SyncedUser': 0 }
				} else if (queryParams.status == SYNCED) {
					// Filter pending and M1 synced users
					qStatus = { 'status': this.PENDING };
					qIsM1Synced = { 'user.isM1SyncedUser': 1 };
				} else {
					// Any other
					qStatus = { 'status': parseInt(queryParams.status) }
				}
			}
			if (!isEmpty(queryParams.userId)) {
				let id = mongoose.Types.ObjectId(queryParams.userId);
				qUserId = { 'user.id': id };
			}
			if (!isEmpty(queryParams.firstName)) {
				qFirstName = { 'user.firstName': { $regex: '.*' + queryParams.firstName + '.*', $options: 'i' } }
			}
			if (!isEmpty(queryParams.lastName)) {
				qLastName = { 'user.lastName': { $regex: '.*' + queryParams.lastName + '.*', $options: 'i' } }
			}
			if (!isEmpty(queryParams.email)) {
				qEmail = { 'user.email': { $regex: '.*' + queryParams.email + '.*', $options: 'i' } }
			}
			if (!isEmpty(queryParams.fullName)) {
				qFullName = { $or: [{ 'user.fullName': { $regex: '.*' + queryParams.fullName + '.*', $options: 'i' } }, 
				{ 'user.company': { $regex: '.*' + queryParams.fullName + '.*', $options: 'i' } }] };
			}
			if (!isEmpty(queryParams.company)) {
				qCompany = { 'user.company': { $regex: '.*' + queryParams.company + '.*', $options: 'i' } }
			}

			let query = { $and: [qShopId, qUserId, qStatus, qFirstName, qLastName, qEmail, qIsM1Synced, qFullName, qCompany] };

			return query;
		},

		getSortQuery: function (sortParams) {
			let sort = { createdAt: -1 };
			if (sortParams) {
				let sortOrder = sortParams.charAt(0) == '-' ? -1 : 1;
				let sortField = _.trim(sortParams, '-');
				switch (sortField) {
					case 'firstName':
					case 'lastName':
					case 'email':
					case 'company':
						sortField = 'user.' + sortField;
						break;
				}
				sort = { [sortField]: sortOrder };
			}
			return sort;
		},

		getCustomerSyncedStatus: function(shopId, callback) {
			let query = { $and: [{ 'shop.id': shopId }, { 'user.isM1SyncedUser': 1 }] };
			this.getAll(query, 1, 1, { createdAt: -1 }, function(err, res) {
				if (!err && !isEmpty(res)) {
					callback(null, 1);
				} else {
					callback(err, 0);
				}
			});
		}
	}

	// Create indexes for unique fields
	carOwnerSubscriptionSchema.set('autoIndex', true);
	module.exports = mongoose.model('CarOwnerSubscription', carOwnerSubscriptionSchema);

})();
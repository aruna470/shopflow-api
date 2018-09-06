/**
 * @name rewardTransaction.js
 * @fileOverview rewardTransaction model
 * @author Layansan Rajendram
 */

(() => {

	'use strict';

	var mongoose = require('mongoose');
	var responseMessages = require('../lib/response-messages');
	var isEmpty = require('is-empty');
	var _ = require('lodash');

	const ADD = 0,
		REDEEM = 1;

	var rewardTransactionSchema = new mongoose.Schema({
		rewardId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Reward',
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
		},
		action: {
			// 0 - Add, 1 - Redeem
			type: Number,
			min: 0,
			max: 1,
			default: 0,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE]
		},
		points: {
			type: Number,
			min: 0,
			default: 0
		},
		shopId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shop',
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
		},
		remarks: {
			type: String,
			default: null
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
			collection: 'rewardTransaction',
			usePushEach: true,
			timestamps: true,
			collation: {
				locale: 'en_US',
				strength: 1
			}
		});

	rewardTransactionSchema.statics = {

		REDEEM: REDEEM,
		ADD: ADD,

		get: function (query, callback) {
			this.findOne(query)
				.populate('createdById', ['firstName', 'lastName'])
				.populate('userId', ['firstName', 'lastName', 'company'])
				.exec(callback);
		},
		getAll: function (query, pageNo, limit, sort, callback) {
			var skip = (pageNo - 1) * limit;
			this.find(query)
				.populate('createdById', ['firstName', 'lastName', 'userId'])
				.populate('userId', ['firstName', 'lastName', 'company'])
				.sort(sort)
				.skip(skip)
				.limit(parseInt(limit))
				.exec(callback);
		},
		create: function (data, callback) {
			var rewardTransaction = new this(data);
			rewardTransaction.save((err, createdObj) => {
				this.get(createdObj._id, callback);
			});
		},

		getCount: function (query, callback) {
			this.count(query, callback);
		},

		getSearchQuery: function (queryParams) {
			let qRewardId = {};
			let qShopId = {};
			let qUserId = {};

			if (!isEmpty(queryParams.rewardId)) {
				qRewardId = {
					rewardId: queryParams.rewardId
				};
			}
			if (!isEmpty(queryParams.shopId)) {
				qShopId = {
					shopId: queryParams.shopId
				};
			}
			if (!isEmpty(queryParams.userId)) {
				qUserId = {
					userId: queryParams.userId
				};
			}

			return {
				$and: [qRewardId, qShopId, qUserId]
			};
		}
	}

	// Create indexes for unique fields
	rewardTransactionSchema.set('autoIndex', true);
	module.exports = mongoose.model('rewardTransaction', rewardTransactionSchema);

})();
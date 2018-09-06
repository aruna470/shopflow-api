/**
 * @name reward.js
 * @fileOverview reward model
 * @author Layansan Rajendram
 */

(() => {

	'use strict';

	var mongoose = require('mongoose');
	var responseMessages = require('../lib/response-messages');
	var isEmpty = require('is-empty');
	var _ = require('lodash');

	var rewardSchema = new mongoose.Schema({
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
		points: {
			type: Number,
			min: 0,
			default: 0
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
			collection: 'reward',
			usePushEach: true,
			timestamps: true,
			collation: {
				locale: 'en_US',
				strength: 1
			}
		});

	rewardSchema.statics = {

		get: function (query, callback) {
			this.findOne(query)
				.populate('userId', ['firstName', 'lastName', 'email'])
				.populate('createdById', ['firstName', 'lastName'])
				.populate('updatedById', ['firstName', 'lastName'])
				.exec(callback);
		},

		getAll: function (query, pageNo, limit, sort, callback) {
			var skip = (pageNo - 1) * limit;
			this.find(query)
				.populate('userId', ['firstName', 'lastName'])
				.populate('createdById', ['firstName', 'lastName'])
				.sort(sort)
				.skip(skip)
				.limit(parseInt(limit))
				.exec(callback);
		},

		getCount: function (query, callback) {
			this.count(query, callback);
		},

		findOneOrCreate: function (condition, doc, callback) {
			const self = this;
			self.get(condition, (err, result) => {
				return result ?
					callback(err, result) :
					self.create(doc, (err, result) => {
						this.get({ _id: result._id }, (err, res) => {
							return callback(err, res);
						});
					});
			});
		},

		getSearchQuery: function (queryParams) {
			let qShopId = {};
			let qUserId = {};

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
				$and: [qShopId, qUserId]
			};
		}
	}

	// Create indexes for unique fields
	rewardSchema.set('autoIndex', true);
	module.exports = mongoose.model('Reward', rewardSchema);

})();
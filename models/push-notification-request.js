
/**
 * @name push-notification-request.js
 * @fileOverview PushNotificationRequest model
 * @author Aruna Attanayake
 */

(function() {

	'use strict';

	var mongoose = require('mongoose');
	var responseMessages = require('../lib/response-messages');
	var isEmpty = require('is-empty');

	const PENDING = 0;
	const INPROGRESS = 1;
	const FINISHED = 2;

	const NORMAL = 0;
	const CHAT = 1;

	var pushNotificationRequestSchema = new mongoose.Schema({
		shopId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shop', 
			default: null
		},
		shopIds: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shop',
			default: null
		}],
		users: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			default: null
		}],
		status: {
			// 0 - Pending, 1 - Inprogress, 2 - Finished
			type: Number,
			min:0,
			max:2,
			default: 0
		},
		title: {
			type: String,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			trim: true
		},
		text: {
			type: String,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			trim: true
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
		},
		type: {
			// 0 - Normal, 1 - Chat
			type: Number,
			min: 0,
			max: 1,
			default: 0
		}
	}, { collection: 'pushNotificationRequest', usePushEach: true, timestamps: true });

	pushNotificationRequestSchema.statics = {

		PENDING: PENDING,
		INPROGRESS: INPROGRESS,
		FINISHED: FINISHED,

		NORMAL: NORMAL,
		CHAT: CHAT,

		get: function(query, callback) {
			this.findOne(query)
				.populate('createdById', ['firstName', 'lastName'])
				.populate('updatedById', ['firstName', 'lastName'])
				.exec(callback);
		},

		getAll: function(query, pageNo, limit, sort, callback) {
			var skip = (pageNo-1) * limit;
			this.find(query)
				.sort(sort)
				.skip(skip)
				.populate('createdById', ['firstName', 'lastName'])
				.populate('updatedById', ['firstName', 'lastName'])
				.populate('users', ['firstName', 'lastName'])
				.limit(parseInt(limit))
				.exec(callback);
		},
		
		updateById: function(id, updateData, callback) {
			this.update(id, {$set: updateData}, {runValidators: true}, callback);
		},

		removeById: function(removeData, callback) {
			this.remove(removeData, callback);
		},

		create: function(data, callback) {
			var pushNotificationRequest = new this(data);
			pushNotificationRequest.save(callback);
		},
		
		getCount: function(query, callback) {
			this.count(query, callback);
		},
		
		getSearchQuery: function(queryParams) {
			var qShopId = {};

			if (!isEmpty(queryParams.shopId)) {
				qShopId = { shopId: queryParams.shopId};
			}

			var query = { $and: [qShopId] };

			return query;
		}
	};

	// Create indexes for unique fields
	pushNotificationRequestSchema.set('autoIndex', true);
	module.exports = mongoose.model('PushNotificationRequest', pushNotificationRequestSchema);

})();
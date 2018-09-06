/**
 * @name push-notification-info.js
 * @fileOverview PushNotificationInfo model
 * @author Aruna Attanayake
 */

(function() {

	'use strict';

	var mongoose = require('mongoose');
	var responseMessages = require('../lib/response-messages');
	var isEmpty = require('is-empty');

	const PENDING = 0;
	const DELIVERED = 1;
	const FAILED = 2;

	const READ = 1;
	const UNREAD = 0;

	const DUPLICATE = 1;
	const NOT_DUPLICATE = 0;

	var pushNotificationInfoSchema = new mongoose.Schema({
		pushNotificationRequestId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'PushNotificationRequest',
			default: null
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User', 
			default: null
		},
		shopId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shop', 
			default: null
		},
		status: {
			// 0 - Pending, 1 - Delivered, 2 - Failed
			type: Number,
			min: 0,
			max: 2,
			default: 0
		},
		token: {
			type: String,
			trim: true,
			default: null
		},
		isDuplicate: {
			// 0 - NO, 1 - Yes
			type: Number,
			min: 0,
			max: 1,
			default: 0
		},
		readStatus: {
			// 0 - Unread, 1 - Read
			type: Number,
			min: 0,
			max: 1,
			default: 0
		}
	}, { collection: 'pushNotificationInfo', usePushEach: true, timestamps: true });

	pushNotificationInfoSchema.statics = {

		PENDING: PENDING,
		DELIVERED: DELIVERED,
		FAILED: FAILED,
		READ: READ,
		UNREAD: UNREAD,
		DUPLICATE: DUPLICATE,
		NOT_DUPLICATE: NOT_DUPLICATE,

		get: function (query, callback) {
			this.findOne(query)
				.populate({ path: 'pushNotificationRequestId', select: 'text title' })
				.populate({path: 'shopId', select: 'logoName businessName brandName'})
				.exec(callback);
		},

	    getAll: function(query, pageNo, limit, sort, callback) {
	    	var skip = (pageNo-1) * limit;
	        this.find(query)
				.populate({path: 'pushNotificationRequestId', select: 'text title'})
				.populate({path: 'shopId', select: 'logoName businessName brandName'})
	        	.sort(sort)
	        	.skip(skip)
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
	        var pushNotificationInfo = new this(data);
	        pushNotificationInfo.save(callback);
	    },

	   	getSearchQuery: function(queryParams) {
	    	var qUserId = {};
	    	var qToken = {};
	    	var qShopId = {};

			if (!isEmpty(queryParams.userId)) {
				qUserId = { userId: queryParams.userId };
			}
			if (!isEmpty(queryParams.token)) {
				qToken = { token: queryParams.token };
			}
			if (!isEmpty(queryParams.shopId)) {
				qShopId = { shopId: queryParams.shopId };
			}

			var query = { $and: [ qUserId, qToken, qShopId, {isDuplicate: 0}] };

			return query;
	    },
	    
	    getCount: function(query, callback) {
	        this.count(query, callback);
	    }
	}

	// Create indexes for unique fields
	pushNotificationInfoSchema.set('autoIndex', true);
	module.exports = mongoose.model('PushNotificationInfo', pushNotificationInfoSchema);

})();

/**
 * @name shop.js
 * @fileOverview Shop model
 * @author Aruna Attanayake
 */

(function() {

  	'use strict';

	var mongoose = require('mongoose');
	var emailValidator = require("email-validator");
	var responseMessages = require('../lib/response-messages');
	var isEmpty = require('is-empty');
	var config = require('config');
	var CarOwnerSubscription = require('../models/car-owner-subscription');
	var PushNotificationRequest = require('../models/push-notification-request');
	var ShopInvite = require('../models/shop-invite');
	var Vehicle = require('../models/vehicle');
	var VehicleRepairHistory = require('../models/vehicle-repair-history');
	var VehicleRecommendation = require('../models/vehicle-recommendation');
	var BookingRequest = require('../models/booking-request');
	var UserManagedShop = require('../models/user-managed-shop');
	var PushNotificationInfo = require('../models/push-notification-info');

	// Validate email.
	function email(value) {
		if (!isEmpty(value)) {
			return emailValidator.validate(value);
		}
	}

	// Validate phone.
	function phone(value) {
		var regEx = /^[+]?\d+$/;
		if (!isEmpty(value)) {
			return regEx.test(value);
		}
	}

	var shopSchema = new mongoose.Schema({
		brandName: {
			type: String,
			required: false,
			maxlength: [150, responseMessages.EXCEED_CHARACTER_LENGTH],
			trim: true
		},
		businessName: {
			type: String, 
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			maxlength: [150, responseMessages.EXCEED_CHARACTER_LENGTH],
			trim: true
		},
		registrationNumber: {
			type: String,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			maxlength: [60, responseMessages.EXCEED_CHARACTER_LENGTH],
			unique : [true, responseMessages.DUPLICATE_RECORD],
			trim: true
		},
		streetName: {
			type: String,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			trim: true
		},
		city: {
			type: String,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			maxlength: [100, responseMessages.EXCEED_CHARACTER_LENGTH],
			trim: true
		},
		state: {
			type: String,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			maxlength: [100, responseMessages.EXCEED_CHARACTER_LENGTH]
		},
		zip: {
			type: String,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			maxlength: [15, responseMessages.EXCEED_CHARACTER_LENGTH]
		},
		phoneNumber: {
			type: String,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			maxlength: [30, responseMessages.EXCEED_CHARACTER_LENGTH],
			validate: [phone, responseMessages.INVALID_PHONE],
		},
		alternatePhoneNumber: {
			type: String,
			maxlength: [30, responseMessages.EXCEED_CHARACTER_LENGTH],
			validate: [phone, responseMessages.INVALID_PHONE],
			default: null
		},
		faxNumber: {
			type: String,
			maxlength: [30, responseMessages.EXCEED_CHARACTER_LENGTH],
			validate: [phone, responseMessages.INVALID_FAX],
			default: null
		},
		email: {
			type: String,
			maxlength: [100, responseMessages.EXCEED_CHARACTER_LENGTH],
			validate: [email, responseMessages.INVALID_EMAIL],
			default: null
		},
		alternateEmail: {
			type: String,
			maxlength: [100, responseMessages.EXCEED_CHARACTER_LENGTH],
			validate: [email, responseMessages.INVALID_EMAIL],
			default: null
		},
		gmail: {
			type: String,
			maxlength: [100, responseMessages.EXCEED_CHARACTER_LENGTH],
			validate: [email, responseMessages.INVALID_EMAIL],
			default: null
		},
		googlePlaceId: {
			type: String,
			trim: true,
			default: null
		},
		googlePlusUrl: {
			type: String,
			trim: true,
			default: null
		},
		facebookPageUrl: {
			type: String,
			trim: true,
			default: null
		},
		twitterPageUrl: {
			type: String,
			trim: true,
			default: null
		},
		instagramPageUrl: {
			type: String,
			trim: true,
			default: null
		},
		logoName: {
			type: String,
			trim: true,
			default: null
		},
		bannerName: {
			type: String,
			trim: true,
			default: null
		},
		description: {
			type: String,
			default: null,
			trim: true
		},
		businessDays: {
			type: Array,
			// 1-Sunday, 7-Saturday
      		default: config.get('shop.defaultBusinessDays')
		},
		businessHours: {
			openTime: {
				type: Number,
				min: 0,
				max: 2400,
				default: config.get('shop.defaultOpenTime')
			},
			closeTime: {
				type: Number,
				min: 0,
				max: 2400,
				default: config.get('shop.defaultCloseTime')
			}
		},
		shopManager: {
			name: {
				type: String,
				default: null,
				trim: true
			},
			email: {
				type: String,
				maxlength: [100, responseMessages.EXCEED_CHARACTER_LENGTH],
				validate: [email, responseMessages.INVALID_EMAIL],
				default: null
			},
			phone: {
				type: String,
				maxlength: [30, responseMessages.EXCEED_CHARACTER_LENGTH],
				validate: [phone, responseMessages.INVALID_PHONE],
				default: null
			}
		},
		shopOwner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
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
		},
		geoLocation: {
			type: String,
			default: null,
			trim: true
		},
		rewardStatus: {
			type: Number,
			// 0:Disabled, 1:Enabled
			default: 0,
			min: 0,
			max: 1
		}
	}, {
		collection: 'shop',
		usePushEach: true,
		timestamps: true,
		collation: {
			locale: 'en_US',
			strength: 1
		}
	});

	shopSchema.statics = {

	    get: function(query, callback) {
	        this.findOne(query)
	        	.populate('createdById', ['firstName', 'lastName'])
	        	.populate('updatedById', ['firstName', 'lastName'])
	        	.populate('shopOwner', ['firstName', 'lastName'])
	        	.exec(callback);
	    },

	    getAll: function(query, pageNo, limit, sort, callback) {
	    	var skip = (pageNo-1) * limit;
			this.find(query)
				// This is to make the sorting case insensitive
				.collation({locale: "en" })
	        	.sort(sort)
	        	.skip(skip)
	        	.populate('createdById', ['firstName', 'lastName'])
	        	.populate('updatedById', ['firstName', 'lastName'])
	        	.populate('shopOwner', ['firstName', 'lastName'])
				.limit(parseInt(limit))
				.exec(callback);
	    },
	    
	    updateById: function(id, updateData, callback) {
	        this.update(id, {$set: updateData}, {runValidators: true}, callback);
	    },

		removeById: function (removeData, callback) {
			this.remove(removeData, callback);
		},

	    create: function(data, callback) {
	        var shop = new this(data);
	        shop.save(callback);
	    },

	   	getCount: function(query, callback) {
	        this.count(query, callback);
	    },

		getIdsByShopOwner: function (shopOwner, callback) {
			this.find({ shopOwner: shopOwner }, callback).select('_id');
		},

	   	getSearchQuery: function(queryParams) {
	    	var qBrandName = {};
			var qBusinessName = {};
			var qRegistrationNumber = {};
			var qEmail = {};
			let qShopIds = {};
			let qManagedShopIds = {};
			let qshopOwner = {};
			if (!isEmpty(queryParams.brandName)) {
				qBrandName = { brandName: { $regex: '.*' + queryParams.brandName + '.*', $options: 'i' } };
			} 
			if (!isEmpty(queryParams.businessName)) {
				qBusinessName = { businessName: { $regex: '.*' + queryParams.businessName + '.*', $options: 'i' } };
			}
			if (!isEmpty(queryParams.email)) {
				qEmail = { email: { $regex: '.*' + queryParams.email + '.*', $options: 'i' } };
			}
				  if (!isEmpty(queryParams.registrationNumber)) {
					  qRegistrationNumber = { registrationNumber: { $regex: '^' + queryParams.registrationNumber + '$', $options: 'i' } };
				  }
			if (queryParams.shopIds && queryParams.shopIds.length > 0) {
				qShopIds = { '_id': { $in: queryParams.shopIds } };
			}
			if (queryParams.shopOwner) {
				qshopOwner = { $or: [{ shopOwner: queryParams.shopOwner }, { '_id': { $in: queryParams.managedShopIds } }] }
			}
			var query = { $and: [qBrandName, qBusinessName, qRegistrationNumber, qEmail, qShopIds, qshopOwner] };

			return query;
	    },
	}

	shopSchema.pre('remove', function (next) {
		PushNotificationRequest.remove({ shopId: this._id }).exec();
		CarOwnerSubscription.remove({ shopId: this._id }).exec();
		ShopInvite.remove({ shop: this._id }).exec();
		Vehicle.remove({ shopId: this._id }).exec();
		VehicleRecommendation.remove({ shop: this._id }).exec();
		VehicleRepairHistory.remove({ shopId: this._id }).exec();
		BookingRequest.remove({ shopId: this._id }).exec();
		UserManagedShop.remove({ shopId: this._id }).exec();
		PushNotificationInfo.remove({ shopId: this._id }).exec();
		next();
	});
	
	// Create indexes for unique fields
	shopSchema.set('autoIndex', true);
	module.exports = mongoose.model('Shop', shopSchema);

})();
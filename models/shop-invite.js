
/**
 * @name shop.js
 * @fileOverview Shop Invite Model
 * @author Layansan Rajendram
 */

(function() {

  	'use strict';

	var mongoose = require('mongoose');
	var emailValidator = require("email-validator");
	var responseMessages = require('../lib/response-messages');
	var isEmpty = require('is-empty');

	var config = require('config');
	module.inviteExpirationTimeHrs = config.get('email.inviteExpirationTime') * 3600000;

	// Validate email.
	function email(value) {
		if (!isEmpty(value)) {
			return emailValidator.validate(value);
		}
	}

	var shopInviteSchema = new mongoose.Schema({
		email: {
			type: String,
			maxlength: [100, responseMessages.EXCEED_CHARACTER_LENGTH],
			validate: [email, responseMessages.INVALID_EMAIL],
			default: null
		},
		shop: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shop',
			default: null
		},
		status: {
			// 1 - pending, 2 - joined
			type: Number,
			min:1,
			max:2,
			default: 1,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
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
	}, { collection: 'shopInvite', usePushEach: true, timestamps: true });

	shopInviteSchema.statics = {

		// Invitation status
		STATUS_PENDING: 1, 
		STATUS_JOINED: 2,

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
	        var shop = new this(data);
	        shop.save(callback);
	    },

	   	getCount: function(query, callback) {
	        this.count(query, callback);
		},
	}

	/**
	* Check if given shop invitation is expired.
	* Returns true if it is expired false otherwise.
	* @param {ShopInvite} invite
	*/
	var isInvitationExpired = function (invite) {
		if ((new Date(invite.createdAt).getTime() < Date.now() - module.inviteExpirationTimeHrs) &&
			(!invite.updatedAt || new Date(invite.updatedAt).getTime() < Date.now() - module.inviteExpirationTimeHrs)) {
			return true;
		}
		return false;
	}

	// Create indexes for unique fields
	shopInviteSchema.set('autoIndex', true);
	module.exports = mongoose.model('ShopInvite', shopInviteSchema);
	module.exports.isInvitationExpired = isInvitationExpired;

})();
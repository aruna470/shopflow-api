
/**
 * @name mock-user.js
 * @fileOverview MockUser model
 * @author Aruna Attanayake
 */

(function() {

  	'use strict';

	var mongoose = require('mongoose');
	var emailValidator = require('email-validator');
	var isEmpty = require('is-empty');
	var responseMessages = require('../lib/response-messages');

	// Validate email.
	function email(value) {
		if (!isEmpty(value)) {
			return emailValidator.validate(value);
		}
	}

	var mockUserSchema = new mongoose.Schema({  
		firstName: { 
			type: String, 
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			maxlength: [30, responseMessages.EXCEED_CHARACTER_LENGTH]
		},
		lastName: { 
			type: String,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			maxlength: [60, responseMessages.EXCEED_CHARACTER_LENGTH],
			default: null
		},
		email: { 
			type: String,
			unique: true,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			maxlength: [150, responseMessages.EXCEED_CHARACTER_LENGTH],
			validate: [email, responseMessages.INVALID_EMAIL]
		}
	}, {collection:'MockUser'});

	mockUserSchema.statics = {

	    get: function(query, callback) {
	        this.findOne(query)
	        	.populate('createdById', ['firstName', 'lastName'])
	        	.populate('updatedById', ['firstName', 'lastName'])
	        	.exec(callback);
	    },

	    getAll: function(query, callback) {
	        this.find(query)
	        	.populate('createdById', ['firstName', 'lastName'])
	        	.populate('updatedById', ['firstName', 'lastName'])
	        	.exec(callback);
	    },
	    
	    updateById: function(id, updateData, callback) {
	        this.update(id, {$set: updateData}, callback);
	    },

	    removeById: function(removeData, callback) {
	        this.remove(removeData, callback);
	    },

	    create: function(data, callback) {
	        var permission = new this(data);
	        permission.save(callback);
	    },

	   	getCount: function(query, callback) {
	        this.count(query, callback);
	    },
	}

	// Create indexes for unique fields
	module.exports = mongoose.model('MockUser', mockUserSchema);

})();

/**
 * @name permission.js
 * @fileOverview Permission model
 * @author Aruna Attanayake
 */

(function() {

  	'use strict';

	var mongoose = require('mongoose');
	var responseMessages = require('../lib/response-messages');

	var permissionSchema = new mongoose.Schema({  
		name: {
			type: String, 
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			unique: true,
			trim: true
		},
		category: {
			type: String, 
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			trim: true
		},
	  	description: {
			  type: String,
			  trim: true,
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
	}, { collection: 'permission', timestamps: true });

	permissionSchema.statics = {

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
	        	.sort({category: 1})
	        	.exec(callback);
	    },
	    
	    updateById: function(id, updateData, callback) {
	        this.update(id, {$set: updateData}, { runValidators: true }, callback);
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
	permissionSchema.set('autoIndex', true);
	module.exports = mongoose.model('Permission', permissionSchema);

})();
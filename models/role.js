
/**
 * @name role.js
 * @fileOverview Role model
 * @author Aruna Attanayake
 */

(function() {

  	'use strict';

	var mongoose = require('mongoose');
	var responseMessages = require('../lib/response-messages');

	var roleSchema = new mongoose.Schema({  
		name: {
			type: String, 
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			maxlength: [30, responseMessages.EXCEED_CHARACTER_LENGTH],
			unique: true,
			trim: true
		},
		description: {
			type: String,
			trim: true,
			default: null
		},
	  	permissions: [{
	  		type: mongoose.Schema.Types.ObjectId,
	  		ref: 'Permission',
	  		default: null
	  	}],
	  	isDefault: {
	  		type: Number,
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
	  	},
	}, { collection: 'role', timestamps: true });

	roleSchema.statics = {

		IS_DEFAULT: 1,

	    get: function(query, callback) {
	        this.findOne(query)
	        	.populate('createdById', ['firstName', 'lastName'])
	        	.populate('updatedById', ['firstName', 'lastName'])
	        	.populate('permissions', ['_id', 'name'])
	        	.exec(callback);
	    },

	    getAll: function(query, callback) {
	        this.find(query)
	        	.populate('createdById', ['firstName', 'lastName'])
	        	.populate('updatedById', ['firstName', 'lastName'])
	        	.populate('permissions', ['_id', 'name'])
	        	.exec(callback);
	    },
	    
	    updateById: function(id, updateData, callback) {
	        this.update(id, {$set: updateData}, { runValidators: true }, callback);
	    },

	    removeById: function(removeData, callback) {
	        this.remove(removeData, callback);
	    },

	    create: function(data, callback) {
	        var role = new this(data);
	        role.save(callback);
	    },

	   	getCount: function(query, callback) {
	        this.count(query, callback);
	    },
	}

	// Create indexes for unique fields
	roleSchema.set('autoIndex', true);
	module.exports = mongoose.model('Role', roleSchema);

})();
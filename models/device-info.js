
/**
 * @name device-info.js
 * @fileOverview Device info model
 * @author Layansan Rajendram
 */

(function () {

	'use strict';

	// User types
	const DT_ANDROID = 1;
	const DT_IOS = 2;

	var mongoose = require('mongoose');
	var isEmpty = require('is-empty');
	var responseMessages = require('../lib/response-messages');

	var deviceInfoSchema = new mongoose.Schema({
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			default: null
		},
		token: {
			type: String,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			maxlength: [500, responseMessages.EXCEED_CHARACTER_LENGTH],
			unique: true,
			trim: true
		},
		deviceType: {
			// Device type. 1 - Android, 2 - IOS
			type: Number,
			min: 1,
			max: 2,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
		},
		endpointArn: {
			type: String,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
			maxlength: [1000, responseMessages.EXCEED_CHARACTER_LENGTH],
			unique: true,
			trim: true
		}
	}, { collection: 'deviceInfo', timestamps: true });

	deviceInfoSchema.statics = {

		// Device types
		DT_ANDROID: DT_ANDROID,
		DT_IOS: DT_IOS,

		get: function (query, callback) {
			this.findOne(query)
				.exec(callback);
		},

		getAll: function (query, callback) {
			this.find(query, callback);
		},

		updateById: function (id, updateData, callback) {
			this.update(id, { $set: updateData }, { runValidators: true }, callback);
		},

		removeById: function (removeData, callback) {
			this.remove(removeData, callback);
		},

		create: function (data, callback) {
			var shop = new this(data);
			shop.save(callback);
		},

		getCount: function (query, callback) {
			this.count(query, callback);
		}
	}

	// Create indexes for unique fields
	deviceInfoSchema.set('autoIndex', true);
	module.exports = mongoose.model('DeviceInfo', deviceInfoSchema);

})();
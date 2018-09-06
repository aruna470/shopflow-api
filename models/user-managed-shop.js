
/**
 * @name user-managed-shop.js
 * @fileOverview UserManagedShop model.
 * @author Layansan Rajendram
 */

(function () {

	'use strict';

	var mongoose = require('mongoose');
	var isEmpty = require('is-empty');
	var responseMessages = require('../lib/response-messages');
	var config = require('config');

	var userManagedShopSchema = new mongoose.Schema({
		shopId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shop',
			default: null
		},
		userId: {
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
		}
	}, { collection: 'userManagedShop', timestamps: true });

	// Methods & constants
	userManagedShopSchema.statics = {

		get: function (query, callback) {
			this.findOne(query)
				.populate('createdById', ['firstName', 'lastName'])
				.populate('updatedById', ['firstName', 'lastName'])
				.exec(callback);
		},

		getAll: function (query, pageNo, limit, sort, callback) {
			var skip = (pageNo - 1) * limit;
			this.find(query)
				.populate('createdById', ['firstName', 'lastName'])
				.populate('updatedById', ['firstName', 'lastName'])
				.sort(sort)
				.skip(skip)
				.limit(parseInt(limit))
				.exec(callback);
		},

		getShopIdsByManagedUserId: function (userId, callback) {
			this.find({ userId:  mongoose.Types.ObjectId(userId) }, callback).select('shopId -_id');
		},

		updateById: function (id, updateData, callback) {
			this.update(id, { $set: updateData }, { runValidators: true }, callback);
		},

		removeById: function (removeData, callback) {
			this.remove(removeData, callback);
		},

		create: function (data, callback) {
			var user = new this(data);
			user.save(callback);
		},

		getCount: function (query, callback) {
			this.count(query, callback);
		}
	}

	// Create indexes for unique fields
	userManagedShopSchema.set('autoIndex', true);
	module.exports = mongoose.model('UserManagedShop', userManagedShopSchema);

})();

/**
 * @name vehicle-repair-history.js
 * @fileOverview VehicleRepairHistory model
 * @author Aruna Attanayake
 */

(function() {

    'use strict';

    var mongoose = require('mongoose');
    var responseMessages = require('../lib/response-messages');
    var isEmpty = require('is-empty');

    var vehicleRepairHistorySchema = new mongoose.Schema({
        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            ref: 'Vehicle'
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            ref: 'User'
        },
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            ref: 'Shop'
        },
        m1VehicleId: {
            type: Number,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            default: null
        },
        repairOrderId: {
            type: Number,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            default: null
        },
        lineItemId: {
            type: Number,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            default: null
        },
        invoiceNo: {
            type: Number,
            default: null
        },
        dateOfService: {
            type: Date,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            default: null
        },
        odometer: {
            type: Number,
            default: null
        },
        description: {
            type: String,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            default: null
        }
    }, { collection: 'vehicleRepairHistory', usePushEach: true, timestamps: true });

    vehicleRepairHistorySchema.statics = {
        createOrUpdate: function(vehicleRepairHistory, callback) {
            this.findOneAndUpdate(
                {
                    'vehicleId': vehicleRepairHistory.vehicleId, 
                    'shopId': vehicleRepairHistory.shopId, 
                    'repairOrderId': vehicleRepairHistory.repairOrderId,
                    'lineItemId': vehicleRepairHistory.lineItemId
                }, 
                vehicleRepairHistory, 
                {runValidators: true, upsert: true, new: true},
                callback
            );
        },
        get: function (query, callback) {
            this.findOne(query)
                .populate('userId', ['firstName', 'lastName'])
                .exec(callback);
        },
        removeById: function(removeData, callback) {
           this.remove(removeData, callback);
        },
        removeByPrams: function (removeData, callback) {
            this.remove(removeData, callback);
        },
        getCount: function(query, callback) {
           this.count(query, callback);
        },
        getAll: function (query, pageNo, limit, sort, callback) {
            let skip = (pageNo - 1) * limit;
            //this.find(query, callback).sort(sort).skip(skip).limit(parseInt(limit));
            this.find(query)
                .populate('userId', ['firstName', 'lastName'])
                .sort(sort)
                .skip(skip)
                .limit(parseInt(limit))
                .exec(callback);
        },
        getSearchQuery: function (queryParams) {
            let qVehicleId = {};
            let qUserId = {};
            let qShopId = {};
            let qShopIds = {};

            if (!isEmpty(queryParams.vehicleId)) {
                qVehicleId = { vehicleId: queryParams.vehicleId };
            }
            if (!isEmpty(queryParams.shopId)) {
                qShopId = { shopId: queryParams.shopId };
            }
            if (queryParams.shopIds && queryParams.shopIds.length > 0) {
                qShopIds = { shopId: { $in: queryParams.shopIds } };
            }
            if (!isEmpty(queryParams.userId)) {
                qUserId = { userId: queryParams.userId }
            }

            let query = { $and: [qVehicleId, qShopId, qUserId, qShopIds] };
            return query;
        },
        getMaxRepairOrderId: function (shopId, callback) {
            this.findOne({'shopId': shopId})
                .sort({repairOrderId: -1})
                .exec(callback);
        },
        removeByPrams: function (removeData, callback) {
            this.remove(removeData, callback);
        }
    }

  // Create indexes for unique fields
  vehicleRepairHistorySchema.set('autoIndex', true);
  module.exports = mongoose.model('VehicleRepairHistory', vehicleRepairHistorySchema);

})();
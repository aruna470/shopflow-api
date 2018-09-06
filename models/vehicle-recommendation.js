/**
 * @name vehicle-recommendation.js
 * @fileOverview VehicleRecommendation model
 * @author Aruna Attanayake
 */

(function () {

    'use strict';

    var mongoose = require('mongoose');
    var responseMessages = require('../lib/response-messages');
    var isEmpty = require('is-empty');

    var vehicleRecommendationSchema = new mongoose.Schema({
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
        recommendationId: {
            type: Number,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            default: null
        },
        m1VehicleId: {
            type: Number,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            default: null
        },
        recommendDate: {
            type: Date,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            default: null
        },
        description: {
            type: String,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            default: null
        },
        isNotified: {
            type: Number,
            default: 0
        }
    }, { collection: 'vehicleRecommendation', usePushEach: true, timestamps: true });

    vehicleRecommendationSchema.statics = {
        get: function (query, callback) {
            this.findOne(query)
                .populate('userId', ['firstName', 'lastName'])
                .exec(callback);
        },
        createOrUpdate: function (vehicleRecommendation, callback) {
            this.findOneAndUpdate(
                {
                    'shopId': vehicleRecommendation.shopId,
                    'recommendationId': vehicleRecommendation.recommendationId
                },
                vehicleRecommendation,
                { runValidators: true, upsert: true, new: true },
                callback
            );
        },
        removeById: function (removeData, callback) {
            this.remove(removeData, callback);
        },
        removeByPrams: function (removeData, callback) {
            this.remove(removeData, callback);
        },
        getCount: function (query, callback) {
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
        getRecommendationsToBeDeleted: function (date, shopId, recommendationIds, callback) {
            this.find({
                shopId: shopId, 
                recommendDate: { $gte: date },
                recommendationId: { $nin:  recommendationIds}
            }).exec(callback);
        },
        getSearchQuery: function (queryParams) {
            let qVehicleId = {};
            let qUserId = {};
            let qShopId = {};
            let qShopIds = {};
            let qStart = {};
            let qEnd = {};

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
            if (!isEmpty(queryParams.start)) {
                let dateArr = queryParams.start.split('-');
                let start = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
                start.setHours(0, 0, 0, 0);
                qStart = { recommendDate: { $gte: start } };
            }
            if (!isEmpty(queryParams.end)) {
                let dateArr = queryParams.end.split('-');
                let end = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
                end.setHours(23, 59, 59, 999);
                qEnd = { recommendDate: { $lte: end } };
            }
            let query = { $and: [qVehicleId, qShopId, qUserId, qShopIds, qStart, qEnd] };
            return query;
        },
        getMaxRecommendationId: function (shopId, callback) {
            this.findOne({'shopId': shopId})
                .sort({recommendationId: -1})
                .exec(callback);
        }
    }

    // Create indexes for unique fields
    vehicleRecommendationSchema.set('autoIndex', true);
    module.exports = mongoose.model('VehicleRecommendation', vehicleRecommendationSchema);

})();
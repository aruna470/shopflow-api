
/**
 * @name push-notification-template.js
 * @fileOverview PushNotificationTemplate model
 * @author Aruna Attanayake
 */

(function() {

    'use strict';

    var mongoose = require('mongoose');
    var responseMessages = require('../lib/response-messages');
    var isEmpty = require('is-empty');

    const DEFAULT_YES = 1;
    const DEFAULT_NO = 0;

    var pushNotificationTemplateSchema = new mongoose.Schema({
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shop', 
            default: null
        },
        title: {
            type: String,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            trim: true
        },
        subject: {
            type: String,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            trim: true
        },
        text: {
            type: String,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            trim: true
        },
        isDefault: {
            // 0 - No, 1 - Yes
            type: Number,
            min:0,
            max:1,
            default: DEFAULT_NO
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
    }, { collection: 'pushNotificationTemplate', usePushEach: true, timestamps: true });

    pushNotificationTemplateSchema.statics = {

        DEFAULT_YES: DEFAULT_YES,
        DEFAULT_NO: DEFAULT_NO,

        create: function(data, callback) {
            var pushNotificationTemplate = new this(data);
            pushNotificationTemplate.save(callback);
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
        
        getCount: function(query, callback) {
            this.count(query, callback);
        },
        
        getSearchQuery: function(queryParams) {
            var qShopId = {};

            if (!isEmpty(queryParams.shopId)) {
                qShopId = { shopId: queryParams.shopId};
            }

            var query = { $or: [qShopId, { isDefault: DEFAULT_YES }] };

            return query;
        },

        updateById: function(id, updateData, callback) {
            this.update(id, {$set: updateData}, { runValidators: true }, callback);
        },

        get: function(query, callback) {
            this.findOne(query)
                .populate('createdById', ['firstName', 'lastName'])
                .populate('updatedById', ['firstName', 'lastName'])
                .exec(callback);
        },

        removeById: function(removeData, callback) {
            this.remove(removeData, callback);
        }
    };

    // Create indexes for unique fields
    pushNotificationTemplateSchema.set('autoIndex', true);
    module.exports = mongoose.model('PushNotificationTemplate', pushNotificationTemplateSchema);

})();
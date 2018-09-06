/**
 * @name chat.js
 * @fileOverview Chat model
 * @author Aruna Attanayake
 */

(function() {

    'use strict';

    var mongoose = require('mongoose');
    var isEmpty = require('is-empty');
    var _ = require('lodash');

    var responseMessages = require('../lib/response-messages');
    let User = require('./user');

    const IS_NOTIFIED_YES = 1;
    const IS_NOTIFIED_NO = 0;

    const READ = 1;
    const UNREAD = 0;

    var chatSchema = new mongoose.Schema({
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            ref: 'Shop'
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        isNotified: {
            // 0 - No, 1 - Yes
            type: Number,
            default: 0
        },
        readStatus: {
            // 0 - Unread, 1 - Read
            type: Number,
            default: 0
        },
        message: {
            type: String,
            default: null
        },
        attachments: [{
            type: String,
            default: null
        }],
        createdById: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            ref: 'User'
        },
        updatedById: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        }
    }, { collection: 'chat', usePushEach: true, timestamps: true });

    chatSchema.statics = {

        IS_NOTIFIED_YES: IS_NOTIFIED_YES,
        IS_NOTIFIED_NO: IS_NOTIFIED_NO,

        READ: READ,
        UNREAD: UNREAD,

        create: function(data, callback) {
            var thisObj = this;
            var chat = new this(data);
            chat.save(function (err, data) {
                if (data) {
                    thisObj.findOne({_id: data._id})
                        .populate('createdById', ['firstName', 'lastName'])
                        .populate('receiverId', ['firstName', 'lastName'])
                        .populate('senderId', ['firstName', 'lastName'])
                        .exec(callback);
                } else {
                    callback(err, data);
                }
            });
        },

        get: function(query, callback) {
            this.findOne(query)
                .populate('createdById', ['firstName', 'lastName'])
                .populate('receiverId', ['firstName', 'lastName'])
                .populate('senderId', ['firstName', 'lastName'])
                .exec(callback);
        },

        getCount: function(query, callback) {
            this.count(query, callback);
        },

        getAll: function(query, pageNo, limit, sort, callback) {
            var skip = (pageNo-1) * limit;
            this.find(query)
                .sort(sort)
                .skip(skip)
                .populate('createdById', ['firstName', 'lastName'])
                .populate('receiverId', ['firstName', 'lastName'])
                .populate('senderId', ['firstName', 'lastName'])
                .limit(parseInt(limit))
                .exec(callback);
        },

        getSearchQuery: function(shopId, senderId, receiverId) {

            let query = { $or: [
                { $and : [ { shopId: shopId }, { senderId: senderId }, { receiverId: receiverId } ] },
                { $and : [ { shopId: shopId }, { senderId: receiverId }, { receiverId: senderId } ] }
            ]};

            return query;
        },
        
        getChatBuddies: function(shopId, by, callback) {
            var groupBy = (by == 'sender' ? "$senderId" : "$receiverId");
            this.aggregate(
                [
                    { $match: {shopId: mongoose.Types.ObjectId(shopId)}},
                    { $group: { _id: groupBy } }
                ]
            ).exec(callback);
        },

        popuplateChatBuddies: function(buddyList, callback) {
            User.populate(buddyList, {path: '_id'}, callback);
        },

        updateById: function(id, updateData, callback) {
            this.update(id, {$set: updateData}, { runValidators: true }, callback);
        },
    }

    // Create indexes for unique fields
    chatSchema.set('autoIndex', true);
    module.exports = mongoose.model('Chat', chatSchema);

})();
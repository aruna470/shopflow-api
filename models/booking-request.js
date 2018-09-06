(function () {

    'use strict';

    var mongoose = require('mongoose');
    var responseMessages = require('../lib/response-messages');
    var isEmpty = require('is-empty');

    // Booking Request Status types
    const PENDING = 0,
        APPROVED = 1,
        REJECTED = 2,
        CANCELLED = 3;

    // Notified status
    const IS_NOTIFIED_YES = 1;
    const IS_NOTIFIED_NO = 0;

    // Read status
    const UNREAD = 0;
    const READ = 1;

    var bookingRequestSchema = new mongoose.Schema({
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
        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            ref: 'Vehicle'
        },
        bookingDateTime: {
            type: Date,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
            default: null
        },
        status: {
            // 0 - PENDING, 1 - APPROVED, 2 - REJECTED, 3- CANCELLED 
            type: Number,
            min: 0,
            max: 3,
            default: 0,
            required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE]
        },
        message: {
            type: String,
            default: null
        },
        reply: {
            type: String,
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
        // Whether notified shop owner
        isNotified: {
            // 0 - No, 1 - Yes 
            type: Number,
            min: 0,
            max: 1,
            default: 0
        },
        // Message read status
        readStatus: {
            // 0 - Unread, 1 - Read 
            type: Number,
            min: 0,
            max: 1,
            default: 0
        }
    }, { collection: 'bookingRequest', usePushEach: true, timestamps: true });

    bookingRequestSchema.statics = {

        PENDING: PENDING,
        APPROVED: APPROVED,
        REJECTED: REJECTED,
        CANCELLED: CANCELLED,

        IS_NOTIFIED_YES: IS_NOTIFIED_YES,
        
        UNREAD: UNREAD,
        READ: READ,

        get: function (query, callback) {
            this.findOne(query)
                .populate('createdById', ['firstName', 'lastName'])
                .populate('updatedById', ['firstName', 'lastName'])
                .populate('userId', ['firstName', 'lastName'])
                .populate('vehicleId', ['licenseNumber', 'make', 'model'])
                .exec(callback);
        },
        getAll: function (query, pageNo, limit, sort, callback) {
            var skip = (pageNo - 1) * limit;
            this.find(query)
                // This is to make the sorting case insensitive
                .collation({ locale: "en" })
                .sort(sort)
                .skip(skip)
                .populate('createdById', ['firstName', 'lastName'])
                .populate('updatedById', ['firstName', 'lastName'])
                .populate('userId', ['firstName', 'lastName'])
                .populate('vehicleId', ['licenseNumber', 'make', 'model'])
                .limit(parseInt(limit))
                .exec(callback);
        },
        getCount: function (query, callback) {
            this.count(query, callback);
        },
        getSearchQuery: function (queryParams) {
            let qUserId = {};
            let qShopId = {};
            let qShopIds = {};
            let qStart = {};
            let qEnd = {};
            let qIsNotified = {};

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
                qStart = { bookingDateTime: { $gte: start } };
            }
            if (!isEmpty(queryParams.end)) {
                let dateArr = queryParams.end.split('-');
                let end = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
                end.setHours(23, 59, 59, 999);
                qEnd = { bookingDateTime: { $lte: end } };
            }
            if (!isEmpty(queryParams.isNotified)) {
                qIsNotified = { isNotified: queryParams.isNotified };
            }

            let query = { $and: [qShopId, qUserId, qShopIds, qStart, qEnd, qIsNotified] };
            return query;
        },
        create: function (data, callback) {
            let bookingRequest = new this(data);
            bookingRequest.save(callback);
        },
        updateById: function(id, updateData, callback) {
			this.update(id, { $set: updateData }, { runValidators: true }, callback);
        },
        updateAll: function(query, updateData, callback) {
			this.update(query, { $set: updateData }, { multi: true }, callback);
	    },
        removeById: function (removeData, callback) {
            this.remove(removeData, callback);
        }
    }

    // Create indexes for unique fields
    bookingRequestSchema.set('autoIndex', true);
    module.exports = mongoose.model('BookingRequest', bookingRequestSchema);

})();
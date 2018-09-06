(function () {

    'use strict';

    const { check, body, oneOf, param, query, validationResult } = require('express-validator/check');
    const { matchedData, sanitize } = require('express-validator/filter');

    let responseMessages = require('../lib/response-messages');

    exports.create = function () {
        return [
            body('shopId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
            body('title').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
            body('subject').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
            body('text').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),

            body('title').isLength({ max: 100 }).withMessage(responseMessages.EXCEED_CHARACTER_LENGTH),
            body('subject').isLength({ max: 150 }).withMessage(responseMessages.EXCEED_CHARACTER_LENGTH)
        ];
    };

    exports.list = function() {
        return [ 
            query('shopId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE) 
        ];
    };

    exports.update = function () {
        return [
            param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
        ];
    };

    exports.get = function () {
        return [
            param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
        ];
    };

    exports.delete = function () {
        return [
            param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
        ];
    };

})();
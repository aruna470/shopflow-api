(function () {

	'use strict';

	const { check, body, param, query, validationResult } = require('express-validator/check');
	const { matchedData, sanitize } = require('express-validator/filter');

	let responseMessages = require('../lib/response-messages');

	exports.create = function () {
		return [
			body('shopId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('email').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('email').isEmail().withMessage(responseMessages.INVALID_EMAIL)
		];
	};

})();
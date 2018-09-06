(function () {

	'use strict';

	const { check, body, oneOf, param, query, validationResult } = require('express-validator/check');
	const { matchedData, sanitize } = require('express-validator/filter');

	let responseMessages = require('../lib/response-messages');

	exports.create = function () {
		return [
			oneOf([
				body('users').exists(),
				body('shopIds').exists(),
			], responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('text').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
		];
	};

	exports.list = function() {
		return [ 
			query('shopId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE) 
		];
	};

})();
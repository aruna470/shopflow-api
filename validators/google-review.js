(function () {

	'use strict';

	const { check, body, param, query, validationResult } = require('express-validator/check');
	const { matchedData, sanitize } = require('express-validator/filter');

	let responseMessages = require('../lib/response-messages');
	let DeviceInfo = require('../models/device-info');

	exports.invite = function () {
		return [
			body('shopId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('userId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

})();
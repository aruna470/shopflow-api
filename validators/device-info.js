(function () {

	'use strict';

	const { check, body, param, query, validationResult } = require('express-validator/check');
	const { matchedData, sanitize } = require('express-validator/filter');

	let responseMessages = require('../lib/response-messages');
	let DeviceInfo = require('../models/device-info');

	exports.create = function () {
		return [
			body('userId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('token').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('deviceType').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('deviceType').isIn([DeviceInfo.DT_ANDROID, DeviceInfo.DT_IOS]).withMessage(responseMessages.INVALID_DEVICE_TYPE)
		];
	};

})();
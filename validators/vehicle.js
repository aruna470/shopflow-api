(function () {

	'use strict';

	const { check, body, param, query, validationResult } = require('express-validator/check');
	const { matchedData, sanitize } = require('express-validator/filter');

	let responseMessages = require('../lib/response-messages');

	exports.syncVehicles = function () {
		return [
			body('vehicles').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.delete = function () {
		return [
			param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

})();
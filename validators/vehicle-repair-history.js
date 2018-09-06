(function () {

	'use strict';

	const { check, body, param, query, validationResult } = require('express-validator/check');

	let responseMessages = require('../lib/response-messages');

	exports.syncVehicleRepairHistories = function () {
		return [
			body('vehicleRepairHistories').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.delete = function () {
		return [
			param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

})();
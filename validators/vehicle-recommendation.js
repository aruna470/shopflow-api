(function () {

	'use strict';

	const { check, body, param, query, validationResult } = require('express-validator/check');

	let responseMessages = require('../lib/response-messages');

	exports.syncVehicleRecommendations = function () {
		return [
			body('vehicleRecommendations').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.syncDeleted = function () {
		return [
			body('recommendationIds').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('date').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.delete = function () {
		return [
			param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.list = function () {
		return [
			query('start').custom(isValidDate).withMessage(responseMessages.INVALID_DATE_FORMAT),
			query('end').custom(isValidDate).withMessage(responseMessages.INVALID_DATE_FORMAT)
		];
	};

	function isValidDate(value) {
		if (!value) return true;
		if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;

		const date = new Date(value);
		if (!date.getTime()) return false;
		return date.toISOString().slice(0, 10) === value;
	}

})();
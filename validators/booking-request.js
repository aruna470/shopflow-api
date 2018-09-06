(function () {

	'use strict';

	const { body, query, param, validationResult } = require('express-validator/check');

	let responseMessages = require('../lib/response-messages');

	exports.create = function () {
		return [
			body('shopId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('vehicleId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('bookingDateTime').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('bookingDateTime').custom(isValidDateTime).withMessage(responseMessages.INVALID_BOOKING_DATE_TIME)
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

	function isValidDateTime(value) {
		if (!value.match(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/)) return false;
		const date = new Date(value);
		if (!date.getTime()) return false;
		return date.toISOString().slice(0, 10) === value.slice(0, 10);
	};

	function isValidDate(value) {
		if (!value) return true;
		if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;

		const date = new Date(value);
		if (!date.getTime()) return false;
		return date.toISOString().slice(0, 10) === value;
	};

})();
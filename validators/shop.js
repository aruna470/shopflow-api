(function () {

	'use strict';

	const { check, body, param, query, validationResult } = require('express-validator/check');
	const { matchedData, sanitize } = require('express-validator/filter');

	let responseMessages = require('../lib/response-messages');

	let geoCoordRegex = /^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/;

	exports.create = function () {
		return [
			body('businessName').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('registrationNumber').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('streetName').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('city').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('state').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('zip').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('phoneNumber').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('geoLocation').custom(isValidGeoLocation).withMessage(responseMessages.INVALID_DATA_TYPE)
		];
	};

	exports.get = function () {
		return [
			param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.update = function () {
		return [
			param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('geoLocation').custom(isValidGeoLocation).withMessage(responseMessages.INVALID_DATA_TYPE)
		];
	};

	exports.delete = function () {
		return [
			param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.getCarOwners = function () {
		return [
			param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	function isValidGeoLocation(value) {
		if (!value) {
			return true;
		} else {
			if (value.match(geoCoordRegex)) {
				return true;
			} else {
				return false;
			}
		}
	};

})();
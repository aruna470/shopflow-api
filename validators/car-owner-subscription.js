(function () {

	'use strict';

	const { check, body, param, query, validationResult } = require('express-validator/check');
	const { matchedData, sanitize } = require('express-validator/filter');

	let responseMessages = require('../lib/response-messages');

	exports.create = function () {
		return [
			body('userId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('shopId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.get = function () {
		return [
			param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.update = function () {
		return [
			body('userId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('shopId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.delete = function () {
		return [
			param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.markAsRead = function () {
		return [
			param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.inviteM1User = function () {
		return [
			param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

})();
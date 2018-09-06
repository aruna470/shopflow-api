(function () {

	'use strict';

	const { body, query, param, validationResult, oneOf } = require('express-validator/check');

	let responseMessages = require('../lib/response-messages');

	exports.create = function () {
		return [
			body('shopId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
				body('receiverId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
				oneOf([
					body('attachments').exists(),
					body('message').exists()
			], responseMessages.MISSING_MANDATORY_ATTRIBUTE),
		];
		};

		exports.list = function () {
		return [
			query('shopId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.update = function () {
		return [
			param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.buddies = function () {
		return [
			query('shopId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

})();
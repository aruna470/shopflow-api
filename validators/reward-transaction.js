(function () {

	'use strict';

	const {
		body
	} = require('express-validator/check');

	let responseMessages = require('../lib/response-messages');

	exports.create = function () {
		return [
			body('shopId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('userId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('action').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('points').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('action').custom(isValidAction).withMessage(responseMessages.INVALID_ACTION)
		];
	};

	function isValidAction(value) {
		let parsed = parseInt(value, 10);
		return (!isNaN(parsed) && (parsed === 0 || parsed === 1))
	}

})();
(function () {

	'use strict';

	const {
		query
	} = require('express-validator/check');

	let responseMessages = require('../lib/response-messages');

	exports.get = function () {
		return [
			query('shopId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			query('userId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

})();
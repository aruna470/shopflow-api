(function () {

	'use strict';

	const { check, body, param, oneOf, query, validationResult } = require('express-validator/check');
	const { matchedData, sanitize } = require('express-validator/filter');

	let responseMessages = require('../lib/response-messages');

	exports.signup = function () {
		return [
			body('firstName').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('lastName').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('password').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('email').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('email').isEmail().withMessage(responseMessages.INVALID_EMAIL)
		];
	};

	exports.create = function () {
		return [
			body('firstName').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('lastName').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('password').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('roleId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('sysEmail').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('sysEmail').isEmail().withMessage(responseMessages.INVALID_EMAIL)
		];
	};

	exports.authenticate = function () {
		return [
			body('userType').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			oneOf([
				body('email').exists(),
				body('sysEmail').exists()
			], responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			oneOf([
				body('email').isEmail(),
				body('sysEmail').isEmail()
			], responseMessages.INVALID_EMAIL),
			body('password').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
		];
	};

	exports.changePassword = function () {
		return [
			body('oldPassword').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('newPassword').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.verifyEmail = function () {
		return [
			body('code').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			oneOf([
				body('email').exists(),
				body('sysEmail').exists(),
			], responseMessages.MISSING_MANDATORY_ATTRIBUTE),
		];
	};

	exports.resendVerificationCode = function () {
		return [
			oneOf([
				body('email').exists(),
				body('sysEmail').exists(),
			], responseMessages.MISSING_MANDATORY_ATTRIBUTE),
		];
	};

	exports.forgotPassword = function () {
		return [
			oneOf([
				body('email').exists(),
				body('sysEmail').exists(),
			], responseMessages.MISSING_MANDATORY_ATTRIBUTE),
		];
	};

	exports.verifyReset = function () {
		return [
			body('token').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			oneOf([
				body('email').exists(),
				body('sysEmail').exists(),
			], responseMessages.MISSING_MANDATORY_ATTRIBUTE),
		];
	};

	exports.resetPassword = function () {
		return [
			body('token').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			body('password').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE),
			oneOf([
				body('email').exists(),
				body('sysEmail').exists(),
			], responseMessages.MISSING_MANDATORY_ATTRIBUTE),
		];
	};

	exports.autoComplete = function () {
		return [
			param('name').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
				.isLength({ min: 3, max: undefined }).withMessage(responseMessages.SUBCEED_CHARACTER_LENGTH)
		];
	};

	exports.get = function () {
		return [
			param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.getShops = function () {
		return [
			param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.update = function () {
		return [
			param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.delete = function () {
		return [
			param('id').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.syncM1Users = function () {
		return [
			body('users').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

	exports.generateSyncToolUserKeys = function () {
		return [
			body('shopId').exists().withMessage(responseMessages.MISSING_MANDATORY_ATTRIBUTE)
		];
	};

})();
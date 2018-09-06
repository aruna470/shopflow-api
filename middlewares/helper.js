
/**
 * @name helper.js
 * @fileOverview Helper class to handle validator errors
 * @author Aruna Attanayake
 */

(function() {

  	'use strict';

	const { validationResult } = require('express-validator/check');

	let responseMessages = require('../lib/response-messages');
	let util = require('../lib/util');
	var User = require('../models/user');

	/**
	 * Middleware function to check validation errors.
	 * If there is an error return HTTP error 400
	 * @param {Object} req - Request object
	 * @param {Object} res - Response object
	 * @param {Object} next - Next route
	 */
	function handleValidationError(req, res, next) {

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			var errorData = errors.array({ onlyFirstError: true }).shift();
			let param = errorData['param'];
			if (errorData.nestedErrors) {
				param = '';
				for (let i = 0; i < errorData.nestedErrors.length; i++) {
					param += i == 0 ? errorData.nestedErrors[i].param : '/' + errorData.nestedErrors[i].param;
				}
			}
			var response = responseMessages.commonResponse(errorData['msg'], param);
			return res.status(400).json(response);
		} else {
			next();
		}
	}

	/**
	 * Middleware function to check permisson.
	 * @param {String} permission - Permission item name
	 */
	function checkPermission(permission) {
		return function (req, res, next) {
			if (!util.hasPermission(permission, req.user.pemissions)) {
				var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
				return res.status(403).json(response);
			} else {
				next();
			}
		}
	}

	/**
	 * Middleware function to check any given permisson exists.
	 * @param {String[]} permission - Permission item name array
	 */
	function checkAnyPermission(permissions) {

		return function (req, res, next) {
			let isAuthorized = false;
			for (let i = 0; i < permissions.length; i++) {
				if (util.hasPermission(permissions[i], req.user.pemissions)) {
					isAuthorized = true;
					break;
				}
			}
			if (!isAuthorized) {
				var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
				return res.status(403).json(response);
			} else {
				return next();
			}
		}
	}
	  
	/**
	 * Middleware function to check permisson. Allow if the user is sysuser
	 * @param {String} permission - Permission item name
	 */
	function checkPermissionOrSysUser(permission) {
		return function (req, res, next) {
			if (!util.hasPermission(permission, req.user.pemissions) && req.user.userType != User.UT_SYS_USER) {
				var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
				return res.status(403).json(response);
			} else {
				next();
			}
		}
	}

	/**
	 * Export module fumctions to be accessed from outside
	 */
	module.exports = {
		handleValidationError: handleValidationError,
		checkPermission: checkPermission,
		checkPermissionOrSysUser: checkPermissionOrSysUser,
		checkAnyPermission: checkAnyPermission
	}

})();
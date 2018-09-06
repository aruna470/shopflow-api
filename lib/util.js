
/**
 * @name util.js
 * @fileOverview Helper class to handle various utility functions
 * @author Aruna Attanayake
 */

(function() {

  'use strict';

	var moment = require('moment');
	var _ = require('lodash');

	/**
	 * Format mongodb date to human readable
	 * @param {string} date - Mongodb date string
	 * @param {string} format - Date format
	 * @returns {string}
	 */
	function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
		return moment(date).utc().format(format);
	}

	/**
	 * Check whether user has permission to parituclar action
	 * @param {string} date - Mongodb date string
	 * @returns {string}
	 */
	function hasPermission(permission, userPermissions) {
		if (_.indexOf(userPermissions, permission) > -1) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Export module fumctions to be accessed from outside
	 */
	module.exports = {
		formatDate: formatDate,
		hasPermission: hasPermission
	}

})();
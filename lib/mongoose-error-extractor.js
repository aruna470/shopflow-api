
/**
 * @name mongoose-error-extractor.js
 * @fileOverview Extract very first error from the list of errors retruned from mongoose
 * @author Aruna Attanayake
 */
(function() {

  	'use strict';

  	var responseMessages = require('../lib/response-messages');

	/**
	 * Retrive first error record depending on different scenarios
	 * @param {string} err - Error object
	 * @returns {object}
	 */
	function getErrorData(err) {
		let errorData = {'attribute':'', 'code':''};

		if (err.name !== undefined) {
			switch (err.name) {
				case 'ValidationError':
					let keys = Object.keys(err.errors);
					let error = err.errors[keys[0]];
					errorData = {'attribute': error.path, 'code': error.message};
					break;
				case 'MongoError':
					if (err.code ==  11000) {
						// Extract field name as it is embeded in the error message
						// Ex:E11000 duplicate key error collection: nas.permissions index: name_1 dup key: { : "Permission.Create" }
						var field = err.message.split(':')[2];
							field = field.replace('_1 dup key', '').trim();
						errorData = {'attribute': field, 'code': responseMessages.DUPLICATE_RECORD};
					}
					break;
			}
		} 

		return errorData;
	}

	module.exports = {
		getErrorData: getErrorData
	}

})();
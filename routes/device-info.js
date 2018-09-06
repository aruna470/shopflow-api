(function () {

	'use strict';

	var express = require('express');
	var router = express.Router();
	var controller = require('../controllers/device-info');
	let validator = require('../validators/device-info');
	const { handleValidationError, checkPermission } = require('../middlewares/helper');

	module.exports = router;

	/* POST Create new device info */
	router.post('/', validator.create(), handleValidationError, controller.create);

})();

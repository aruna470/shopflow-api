
(function () {

	'use strict';

	var express = require('express');
	var router = express.Router();
	var controller = require('../controllers/shop-invite');
	let validator = require('../validators/shop-invite');
	const { handleValidationError, checkPermission } = require('../middlewares/helper');


	/* POST invite car owner to a shop .*/
	router.post('/', checkPermission('shop-invite.create'),  validator.create(), handleValidationError, controller.create);

	/* POST Verify user invitation to shop. */
	router.post('/:code/verify', controller.verify);

	/* POST Verify invitation. Subscribe user to shop if he is already logged in */
	router.post('/:code/subscribe', controller.subscribe);

	module.exports = router;

})();

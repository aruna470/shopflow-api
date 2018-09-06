
(function () {

	'use strict';

	var express = require('express');
	var router = express.Router();
	var controller = require('../controllers/chat');
	let validator = require('../validators/chat');
	const { handleValidationError, checkAnyPermission, checkPermission } = require('../middlewares/helper');

	/* POST Chat Request */
	router.post('/', checkAnyPermission(['chat.send-to-shop', 'chat.send-to-user']), validator.create(), handleValidationError, controller.create);
	
	/* PUT Chat Update */
	router.put('/:id', checkPermission('chat.update'), validator.update(), handleValidationError, controller.update);

	/* GET List push notifications requests */
	router.get('/list', checkAnyPermission(['chat.list-shop', 'chat.list-own']), validator.list(), handleValidationError, controller.list);

	/* GET Chat buddies */
	router.get('/buddies', checkAnyPermission(['chat.buddies-shop']), validator.buddies(), handleValidationError, controller.buddies);

	module.exports = router;

})();

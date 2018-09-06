
(function () {

	'use strict';

	var express = require('express');
	var router = express.Router();
	var controller = require('../controllers/push-notification-request');
	let validator = require('../validators/push-notification-request');
	const { handleValidationError, checkPermission, checkAnyPermission } = require('../middlewares/helper');

	/* POST Create new push notification request */
	router.post('/', checkPermission('push-notification-request.create'), validator.create(), handleValidationError, controller.create);

	/* GET List push notifications requests */
	router.get('/list', checkAnyPermission(['push-notification-request.list', 'push-notification-request.list-shop', 'push-notification-request.list-manage-shop']), validator.list(), handleValidationError, controller.list);

	/* Get single push notification request details */
	router.get('/:id', checkAnyPermission(['push-notification-request.view', 'push-notification-request.view-manage-shop', 'push-notification-request.view-shop']), controller.get);

	/* Delete sigle push notification request */
	router.delete('/:id', checkAnyPermission(['push-notification-request.delete', 'push-notification-request.delete-manage-shop', 'push-notification-request.delete-shop']), controller.delete);

	module.exports = router;

})();

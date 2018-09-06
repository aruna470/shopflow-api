(function () {

	'use strict';

	var express = require('express');
	var router = express.Router();
	var controller = require('../controllers/car-owner-subscription');
	let validator = require('../validators/car-owner-subscription');
	const { handleValidationError, checkPermission } = require('../middlewares/helper');

	module.exports = router;

	/* POST Create new car owner subscription to shop */
	router.post('/', checkPermission('car-owner-subscription.create'), validator.create(), handleValidationError, controller.create);

	/* GET list/search all carOwnerSubscription. */
	router.get('/list', checkPermission('car-owner-subscription.list'), controller.list);

	/* Get Car owner subscription */
	router.get('/:id', validator.get(), handleValidationError, controller.get);

	/* PUT Update Car owner subscription */
	router.put('/:id', checkPermission('car-owner-subscription.update'), validator.update(), handleValidationError, controller.update);

	/* Delete Car owner subscription to shop */
	router.delete('/:id', checkPermission('car-owner-subscription.delete'), validator.delete(), handleValidationError, controller.delete);

	/* POST Send invite to M1 synced user */
	router.post('/:id/invite-m1-user', checkPermission('car-owner-subscription.invite-m1-user'), validator.inviteM1User(), handleValidationError, controller.inviteM1User);

})();
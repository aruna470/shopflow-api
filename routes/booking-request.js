
(function () {

	'use strict';

	var express = require('express');
	var router = express.Router();
	var controller = require('../controllers/booking-request');
	let validator = require('../validators/booking-request');
	const { handleValidationError, checkAnyPermission, checkPermission } = require('../middlewares/helper');

	/* Listt booking request record */
	router.get('/list', checkAnyPermission(['booking-request.list', 'booking-request.list-managed-shop', 'booking-request.list-shop', 'booking-request.list-own']), validator.list(), handleValidationError, controller.list);

	/* Get sigle booking request record */
	router.get('/:id', checkAnyPermission(['booking-request.view', 'booking-request.view-managed-shop', 'booking-request.view-shop', 'booking-request.view-own']), controller.get);

	/* POST Booking Request */
	router.post('/', checkPermission('booking-request.create'), validator.create(), handleValidationError, controller.create);

	/* Get sigle booking request record */
	router.put('/:id', checkAnyPermission(['booking-request.update', 'booking-request.update-managed-shop', 'booking-request.update-shop', 'booking-request.update-own']), controller.update);

	/* DELETE delete Booking request record. */
	router.delete('/:id', checkPermission('booking-request.delete'), validator.delete(), handleValidationError, controller.delete);

	module.exports = router;

})();


(function () {

	'use strict';

	var express = require('express');
	var router = express.Router();
	var controller = require('../controllers/vehicle-repair-history');
	let validator = require('../validators/vehicle-repair-history');
	const { handleValidationError, checkAnyPermission, checkPermission } = require('../middlewares/helper');

	/* Get vehicle repair history record */
	router.get('/list', checkAnyPermission(['vehicle-repair-history.list', 'vehicle-repair-history.list-managed-shop', 'vehicle-repair-history.list-shop', 'vehicle-repair-history.list-own']), controller.list);

	/* Get vehicle repair history record */
	router.get('/:id', checkAnyPermission(['vehicle-repair-history.view', 'vehicle-repair-history.view-managed-shop', 'vehicle-repair-history.view-shop', 'vehicle-repair-history.view-own']), controller.get);

	/* POST Sync vehicle repair history details */
	router.post('/sync-histories', checkPermission('vehicle-repair-history.sync-histories'), validator.syncVehicleRepairHistories(), handleValidationError, controller.syncVehicleRepairHistories);

	/* DELETE delete vehicle repair history record. */
	router.delete('/:id', checkPermission('vehicle-repair-history.delete'), validator.delete(), handleValidationError, controller.delete);

	module.exports = router;

})();

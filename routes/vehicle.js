
(function () {

	'use strict';

	var express = require('express');
	var router = express.Router();
	var controller = require('../controllers/vehicle');
	let validator = require('../validators/vehicle');
	const { handleValidationError, checkPermission, checkAnyPermission } = require('../middlewares/helper');

	/* GET list vehicle records */
	router.get('/list', checkAnyPermission(['vehicle.list', 'vehicle.list-managed-shop-vehicles', 'vehicle.list-shop-vehicles', 'vehicle.list-own']), controller.list);

	/* GET list vehicle records */
	router.get('/:id', checkAnyPermission(['vehicle.view', 'vehicle.view-managed-shop-vehicle', 'vehicle.view-shop-vehicle', 'vehicle.view-own']), controller.get);

	/* POST Sync vehicle details */
	router.post('/sync-vehicles', checkPermission('vehicle.sync-vehicles'), validator.syncVehicles(), handleValidationError, controller.syncVehicles);

	/* DELETE delete vehicle. */
	router.delete('/:id', checkPermission('vehicle.delete'), validator.delete(), handleValidationError, controller.delete);

	module.exports = router;

})();

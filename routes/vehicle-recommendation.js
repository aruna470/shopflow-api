
(function () {

	'use strict';

	var express = require('express');
	var router = express.Router();
	var controller = require('../controllers/vehicle-recommendation');
	let validator = require('../validators/vehicle-recommendation');
	const { handleValidationError, checkAnyPermission, checkPermission } = require('../middlewares/helper');

	/* Listt vehicle repair recommendation record */
	router.get('/list', checkAnyPermission(['vehicle-recommendation.list', 'vehicle-recommendation.list-managed-shop', 'vehicle-recommendation.list-shop', 'vehicle-recommendation.list-own']), validator.list(), handleValidationError, controller.list);

	/* Get sigle vehicle repair recommendation record */
	router.get('/:id', checkAnyPermission(['vehicle-recommendation.view', 'vehicle-recommendation.view-managed-shop', 'vehicle-recommendation.view-shop', 'vehicle-recommendation.view-own']), controller.get);

	/* POST Sync vehicle recommendation details */
	router.post('/sync-recommendations', checkPermission('vehicle-recommendation.sync-recommendations'), validator.syncVehicleRecommendations(), handleValidationError, controller.syncVehicleRecommendations);

	/* PUT Sync deleted recommendations */
	router.put('/sync-deleted', checkPermission('vehicle-recommendation.sync-deleted'), validator.syncDeleted(), handleValidationError, controller.syncDeleted);

	/* DELETE delete vehicle recommendation record. */
	router.delete('/:id', checkPermission('vehicle-recommendation.delete'), validator.delete(), handleValidationError, controller.delete);

	module.exports = router;

})();

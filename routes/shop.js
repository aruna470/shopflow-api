
(function () {

	'use strict';

	var express = require('express');
	var router = express.Router();
	var controller = require('../controllers/shop');
	let validator = require('../validators/shop');
	const { handleValidationError, checkPermission, checkPermissionOrSysUser, checkAnyPermission } = require('../middlewares/helper');

	/* GET list/search all shops. */
	router.get('/list', checkPermission('shop.list'), controller.list);

	/* POST Create new shop */
	router.post('/', checkAnyPermission(['shop.create', 'shop.create-managed-shop']), validator.create(), handleValidationError, controller.create);

	/* PUT update shop details. */
	router.put('/:id', checkAnyPermission(['shop.update', 'shop.update-managed-shop', 'shop.update-own']), validator.update(), handleValidationError, controller.update);

	/* GET Single shop model. */
	router.get('/:id', checkPermission('shop.view'), validator.get(), handleValidationError, controller.get);

	/* DELETE delete shop. */
	router.delete('/:id', checkAnyPermission(['shop.delete', 'shop.delete-managed-shop', 'shop.delete-own']), handleValidationError, validator.delete(), controller.delete);

	/* GET list/search all shops. */
	router.get('/:id/car-owners', validator.getCarOwners(), handleValidationError, controller.getCarOwners);
  
	module.exports = router;

})();

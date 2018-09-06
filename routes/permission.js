
(function () {

	'use strict';

	var express = require('express');
	var router = express.Router();
	var controller = require('../controllers/permission');
	const { checkPermission } = require('../middlewares/helper');


	/* GET list/search all permissions. */
	router.get('/list', checkPermission('permission.list'), controller.list);

	/* GET single permission model. */
	router.get('/:id', checkPermission('permission.view'), controller.get);

	/* POST Create new permission */
	router.post('/', checkPermission('permission.create'), controller.create);

	/* PUT update permission details. */
	router.put('/:id', checkPermission('permission.update'), controller.update);

	/* DELETE delete permission. */
	router.delete('/:id', checkPermission('permission.delete'), controller.delete);

	module.exports = router;

})();

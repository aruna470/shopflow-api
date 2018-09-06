
(function () {

	'use strict';

	var express = require('express');
	var router = express.Router();
	var controller = require('../controllers/role');
	const { checkPermission } = require('../middlewares/helper');

	/* GET list/search all permissions. */
	router.get('/list', checkPermission('role.list'), controller.list);

	/* POST Create new role */
	router.post('/', checkPermission('role.create'), controller.create);

	/* GET single role model. */
	router.get('/:id', checkPermission('role.view'), controller.get);

	/* PUT update role details. */
	router.put('/:id', checkPermission('role.update'), controller.update);

	/* DELETE delete role. */
	router.delete('/:id', checkPermission('role.delete'), controller.delete);

	module.exports = router;

})();

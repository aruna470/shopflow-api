
(function () {

	'use strict';

	var express = require('express');
	var router = express.Router();
	var controller = require('../controllers/mock-user');

	/* POST Create mock user */
	router.post('/', controller.create);

	/* PUT Update mock user */
	router.put('/:id', controller.update);

	/* GET list all mock users. */
	router.get('/list', controller.list);

	/* GET single mock user model. */
	router.get('/:id', controller.get);

	/* Delete single mock user model. */
	router.delete('/:id', controller.delete);

	module.exports = router;

})();

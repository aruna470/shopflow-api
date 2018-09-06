(() => {

	'use strict';

	var express = require('express');
	var router = express.Router();
	var controller = require('../controllers/reward-transaction');

	let validator = require('../validators/reward-transaction');
	const {
		handleValidationError,
		checkAnyPermission
	} = require('../middlewares/helper');

	/* POST Reward Transaction */
	router.post('/', checkAnyPermission(['reward-transaction.add', 'reward-transaction.redeem']), validator.create(), handleValidationError, controller.create);

	/* GET List Reward transactions */
	router.get('/list', controller.list);

	module.exports = router;

})();

(() => {

	'use strict';

	var express = require('express');
	var router = express.Router();
	var controller = require('../controllers/reward');
	const { checkAnyPermission, handleValidationError } = require('../middlewares/helper');
	let validator = require('../validators/reward');

	/* GET Reward */
	router.get('/list', checkAnyPermission(['reward.list', 'reward.list-shop', 'reward.list-own']), controller.list);

	/* GET Rewards */
	router.get('/', checkAnyPermission(['reward.view', 'reward.view-shop', 'reward.view-own']), validator.get(), handleValidationError,  controller.get);

	module.exports = router;

})();

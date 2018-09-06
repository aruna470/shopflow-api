(function () {

	'use strict';

	var express = require('express');
	var router = express.Router();
	var controller = require('../controllers/dashboard');

	module.exports = router;

	/** Get statistics for shopowner dashboard */
	router.get('/shop-owner/statistics', controller.getShopOwnerStatistics);

	/** Get shop statistics for shopowner dashboard */
	router.get('/shop/:id/statistics', controller.getShopStatistics);

})();

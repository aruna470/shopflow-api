(function () {

	'use strict';

	var express = require('express');
	var multer = require('multer');
	var config = require('config');
	var router = express.Router();
	var upload = multer({ dest: config.get('tmpPath') });
	var controller = require('../controllers/util');

	const { handleValidationError, checkPermission } = require('../middlewares/helper');

	/* POST upload file to S3. */
	router.post('/s3-upload', upload.single('fileData'), controller.s3Upload);

	/* GET Retrieves Presigned URL for given file. */
	router.get('/s3-get-file/:fileName', controller.s3Download);

	/* GET Check whether API connectivity is fine. */
	router.get('/sync-tool-api-check', controller.syncToolApiConCheck);

	/* GET Retrieve last sync information for sync tool. Such as last sync date, ids etc...e. */
	router.get('/get-last-sync-info', checkPermission('util.get-last-sync-info'), controller.getLastSyncInfo);

	module.exports = router;

})();

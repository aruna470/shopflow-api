(function() {

	'use strict';

	let express = require('express');
	let router = express.Router();
	let controller = require('../controllers/push-notification-info');
	let validator = require('../validators/push-notification-info');
	const { handleValidationError, checkPermission } = require('../middlewares/helper');

	/* GET list/search push notifications. */
    router.get('/list', checkPermission('push-notification-info.list'), controller.list);

    /* GET Get message count assciated with specific user. */
    router.get('/msg-count', checkPermission('push-notification-info.msg-count'), controller.msgCount);

    /* PUT Mark message as read. */
    router.put('/:id/mark-as-read', checkPermission('push-notification-info.mark-as-read'), validator.markAsRead(), handleValidationError, controller.markAsRead);

    /* GET Get single push notification details. */
    router.get('/:id', checkPermission('push-notification-info.view'), validator.get(), handleValidationError, controller.get);

    /* DELETE Delete specific push notification. */
    router.delete('/:id', checkPermission('push-notification-info.delete'), validator.delete(), handleValidationError, controller.delete);

    module.exports = router;

})();
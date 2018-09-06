
(function () {

    'use strict';

    var express = require('express');
    var router = express.Router();
    var controller = require('../controllers/push-notification-template');
    let validator = require('../validators/push-notification-template');
    const { handleValidationError, checkPermission, checkAnyPermission } = require('../middlewares/helper');

    /* POST Create new push notification template */
    router.post('/', checkPermission('push-notification-template.create-shop'), validator.create(), handleValidationError, controller.create);

    /* PUT Update notification template */
    router.put('/:id', checkPermission('push-notification-template.update-shop'), validator.update(), handleValidationError, controller.update);

    /* GET List push notifications templates */
    router.get('/list', checkAnyPermission(['push-notification-template.list-shop']), validator.list(), handleValidationError, controller.list);

    /* GET Get single notification template details */
    router.get('/:id', checkPermission('push-notification-template.view-shop'), validator.get(), handleValidationError, controller.get);

    /* DELETE delete shop. */
    router.delete('/:id', checkPermission('push-notification-template.delete-shop'), validator.delete(), handleValidationError, controller.delete);

    module.exports = router;

})();

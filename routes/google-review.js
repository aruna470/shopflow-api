/**
 * Handle google review invite related routes
 * @author Layansan Rajendram
 */
(function () {

    'use strict';

    var express = require('express');
    var router = express.Router();
    var controller = require('../controllers/google-review');
    let validator = require('../validators/google-review');
    const { handleValidationError, checkPermission } = require('../middlewares/helper');

    /* POST Invite a user to leave google business review for shop */
    router.post('/invite', checkPermission('google-review-invite.create'), validator.invite(), handleValidationError, controller.invite);

    module.exports = router;
})();

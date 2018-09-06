
(function () {

	'use strict';

	var express = require('express');
	var router = express.Router();
	var userController = require('../controllers/user');
	let validator = require('../validators/user');
	const { handleValidationError, checkPermission } = require('../middlewares/helper');

	/* GET list/search all permissions. */
	router.get('/list', checkPermission('user.list'), userController.list);

	/* GET single user model. */
	router.get('/:id', validator.get(), handleValidationError, userController.get);

	/* POST User sign up */
	// TODO: This has to be removed once apps are updated
	// Keeping it here to maintain backward compatibility 
	router.post('/', validator.signup(), handleValidationError, userController.signup);

	/* POST User sign up */
	router.post('/signup', validator.signup(), handleValidationError, userController.signup);

	/* POST User sign up */
	router.post('/create', checkPermission('user.create-sys-user'), validator.create(), handleValidationError, userController.create);

	/* PUT update permission details. */
	router.put('/:id', validator.update(), handleValidationError, userController.update);

	/* DELETE delete permission. */
	router.delete('/:id', checkPermission('user.delete'), validator.delete(), handleValidationError, userController.delete);

	/* POST user authentication. */
	router.post('/authenticate', validator.authenticate(), handleValidationError, userController.authenticate);

	/* POST user change password. */
	router.post('/change-password', validator.changePassword(), handleValidationError, userController.changePassword);

	/* POST verify signup email. */
	router.post('/verify-email', validator.verifyEmail(), handleValidationError, userController.verifyEmail);

	/* POST Resend email verification code. */
	router.post('/resend-verification-code', validator.resendVerificationCode(), handleValidationError, userController.resendVerificationCode);

	/* POST user forgot password. */
	router.post('/forgot-password', validator.forgotPassword(), handleValidationError, userController.forgotPassword);

	/* POST Verify password reset token */
	router.post('/verify-reset', validator.verifyReset(), handleValidationError, userController.verifyReset);

	/* POST reset password with token */
	router.post('/reset-password', validator.resetPassword(), handleValidationError, userController.resetPassword);

	/* GET shops the user has subscribed to. */
	router.get('/:id/shops', validator.getShops(), handleValidationError, userController.getShops);

	/* GET list/search all permissions. */
	router.get('/autocomplete/:name', checkPermission('user.list'), validator.autoComplete(), handleValidationError, userController.autoComplete);

	/* POST Sync M1 users. */
	router.post('/sync-m1-users', checkPermission('user.sync-m1-users'), validator.syncM1Users(), handleValidationError, userController.syncM1Users);

	/* POST Create sync tool user */
	router.post('/generate-sync-tool-user-keys', checkPermission('user.get-sync-tool-user-keys'), validator.generateSyncToolUserKeys(), handleValidationError, userController.generateSyncToolUserKeys);

	module.exports = router;

})();

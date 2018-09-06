
(function () {

    'use strict';

    var async = require('async');
    var isEmpty = require('is-empty');
    var _ = require('lodash');
    var User = require('../models/user');
    var Shop = require('../models/shop');
    var Role = require('../models/role');
    var responseMessages = require('../lib/response-messages');
    var util = require('../lib/util');
    var mongooseErrorExtractor = require('../lib/mongoose-error-extractor');
    var mail = require('../lib/mail');
    var config = require('config');
    var CarOwnerSubscription = require('../models/car-owner-subscription');
    var uniqid = require('uniqid');

    module.tokenExpirationTime = config.get('password.tokenExpirationTime');


    /* GET list/search all users. */
    exports.list = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('List users');

        var query = User.getSearchQuery(req.query);
        var pageNo = req.query.pageNo ? req.query.pageNo : 1;
        var limit = req.query.limit ? req.query.limit : 10;
        var sort = { createdAt: -1 };
        if (req.query.sort) {
            var sortOrder = req.query.sort.charAt(0) == '-' ? '-1' : 1;
            var sortField = _.trim(req.query.sort, '-');
            sort = { [sortField]: sortOrder };
        }

        async.waterfall([
            // Avoid sending sync tool user
            function (callback) {
                Role.get({ name: config.get('syncToolRoleName') }, function (err, role) {
                    if (role) {
                        req.query.roleIdNe = role._id;
                        query = User.getSearchQuery(req.query);
                    }
                    callback(null);
                });
            },
            // Get record count associated with this query
            function (callback) {
                User.getCount(query, function (err, count) {
                    callback(err, count);
                });
            }
        ], function (err, count) {
            if (err) {
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                res.status(400).json(response);
            } else {
                User.getAll(query, pageNo, limit, sort, function (err, users) {
                    if (!err) {
                        var data = [];
                        for (var i = 0; i < users.length; i++) {
                            var user = responseMessages.user(users[i]);
                            data.push(user);
                        }
                        let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'users': { 'total': count, 'data': data } });
                        res.status(200).json(response);
                    } else {
                        var response = responseMessages.commonResponse(responseMessages.FAIL);
                        res.status(400).json(response);
                    }
                });
            }
        });
    };

    /* GET single user model. */
    exports.get = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Get user');

        // Check permission
        if (!(req.user.userId == req.params.id || util.hasPermission('user.view', req.user.pemissions))) {
            // Only system users with user.view permission and 
            // user who owned this record can access this end point
            var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
            return res.status(403).json(response);
        }

        // Retrieve user by id
        User.get({ _id: req.params.id }, (err, user) => {
            if (user) {
                var data = responseMessages.user(user);
                let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'user': data });
                res.status(200).json(response);
            } else {
                var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                res.status(404).json(response);
            }
        });
    };

    /* POST User signup */
    exports.signup = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Signup user');

        req.body.email = req.body.email.toLowerCase();
        req.body.userType = User.UT_NORMAL_USER;
        req.body.isEmailVerified = User.EMAIL_NOT_VERIFIED;
        delete req.body.sysEmail; // Avoid adding null sysEmail attribute. It is a sparse index
        req.body.status = User.ACTIVE;

        async.waterfall([
            function (callback) {
                User.get({email: req.body.email}, (err, user) => {
                    // Check if user exists and is a M1 user who has not yet signed up
                    // We assume user has not signed up if the password is null
                    if (!err && !isEmpty(user) && (user.isM1SyncedUser === User.M1_SYNCED_NO || !isEmpty(user.password))) {
                        let response = responseMessages.commonResponse(responseMessages.DUPLICATE_RECORD, 'email');
                        return res.status(400).json(response);
                    } else {
                        callback(null);
                    }
                });
            },
            function (callback) {
                // Set default role to car owners
                Role.get({ name: config.get('carOwnerRoleName') }, (err, role) => {
                    if (role) {
                        req.body.roleId = role._id;
                    }
                    callback(null);
                });
            },
            function (callback) {
                User.getEncryptedPassword(req.body.password, function (err, bcryptedPassword) {
                    if (err) {
                        let response = responseMessages.commonResponse(responseMessages.FAIL);
                        return res.status(500).json(response);
                    } else {
                        callback(bcryptedPassword);
                    }
                });
            }
        ], function (bcryptedPassword) {
            req.body.password = bcryptedPassword;
            req.body.verificationCode = Math.floor(100000 + Math.random() * 900000);
            // If M1 synced user update or create new
            User.findOneAndUpdate({email: req.body.email}, req.body, 
                {upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true}, function (err, createdObject) {
                if (!err) {
                    let name = req.body.firstName + ' ' + req.body.lastName;
                    mail.sendSignupEmail(req.body.email, name, req.body.verificationCode, function (err, result) {
                        if (!err) {
                            logger.writeLog('Signup email sent to ' + req.body.email);
                        } else {
                            logger.writeLog('Signup email sending failed to ' + req.body.email);
                        }
                        let data = responseMessages.formatCreatedObject(createdObject);
                        let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'user': data });
                        return res.status(200).json(response);
                    });
                } else {
                    let errorData = mongooseErrorExtractor.getErrorData(err);
                    let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                    return res.status(400).json(response);
                }
            });
        });
    };

    /* POST Create new user */
    exports.create = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Create system user');

        req.body.userType = User.UT_SYS_USER;
        req.body.isEmailVerified = User.EMAIL_VERIFIED;
        //req.body.status = User.ACTIVE;
        req.body.sysEmail = req.body.sysEmail.toLowerCase();
        req.body.createdById = req.user.userId;
        delete req.body.email; // Avoid adding null email attribute. It is a sparse index

        async.waterfall([
            function (callback) {
                // Set default role to car owners
                if (req.body.roleId) {
                    Role.get({ name: config.get('superadminRoleName') }, (err, role) => {
                        if (role && req.body.roleId && req.body.roleId == role._id) {
                            // Do not allow creation of super user
                            let response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                            return res.status(403).json(response);
                        }
                        callback(null);
                    });
                }
            },
            function (callback) {
                User.getEncryptedPassword(req.body.password, function (err, bcryptedPassword) {
                    if (err) {
                        let response = responseMessages.commonResponse(responseMessages.FAIL);
                        return res.status(500).json(response);
                    } else {
                        callback(bcryptedPassword);
                    }
                });
            }
        ], function (bcryptedPassword) {
            req.body.password = bcryptedPassword;
            User.create(req.body, function (err, createdObject) {
                if (!err) {
                    let name = req.body.firstName + ' ' + req.body.lastName;
                    mail.sendSysAccCreatedEmail(req.body.sysEmail, name, function (err, result) {
                        // Notify user via email
                        if (!err) {
                            logger.writeLog('Account set up email notification sent to ' + req.body.sysEmail);
                        } else {
                            logger.writeLog('Sending account set up email notification  failed to ' + req.body.sysEmail);
                        }
                        let data = responseMessages.formatCreatedObject(createdObject);
                        let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'user': data });
                        return res.status(200).json(response);
                    });
                } else {
                    let errorData = mongooseErrorExtractor.getErrorData(err);
                    let response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                    return res.status(400).json(response);
                }
            });
        });
    };

    /* PUT update permission details. */
    exports.update = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Update user');

        // Check permission
        if (!(req.user.userId == req.params.id || util.hasPermission('user.update', req.user.pemissions))) {
            // Only system users with user.update permission and 
            // user who owned this record can access this end point
            var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
            return res.status(403).json(response);
        }

        // Do not allow to change email & sysEmail
        // Remove them if present in the update request
        delete req.body.email;
        delete req.body.sysEmail;
        delete req.body.password;
        delete req.body.verificationCode;
        delete req.body.resetPasswordToken;
        delete req.body.resetPasswordExpires;

        // Update user record
        User.updateById({ _id: req.params.id }, req.body, function (err, result) {
            if (!err) {
                var response = responseMessages.commonResponse(responseMessages.SUCCESS);
                res.status(200).json(response);
            } else {
                var errorData = mongooseErrorExtractor.getErrorData(err);
                var response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                res.status(400).json(response);
            }
        });
    };

    /* DELETE delete permission. */
    exports.delete = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Delete user');

        User.removeById({ _id: req.params.id }, function (err, result) {
            if (!err) {
                var response = responseMessages.commonResponse(responseMessages.SUCCESS);
                res.status(200).json(response);
            } else {
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                res.status(400).json(response);
            }
        });
    };

    /* POST user authentication. */
    exports.authenticate = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Authenticate user');

        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
        }

        if (req.body.sysEmail) {
            req.body.sysEmail = req.body.sysEmail.toLowerCase();
        }

        var validationInfo = User.validateAuthParams(req.body.userType, req.body.email, req.body.sysEmail);
        if (isEmpty(validationInfo.code)) {
            User.authUser(req.body.userType, req.body.email, req.body.sysEmail, req.body.password, function (err, user) {
                if (!err) {
                    var jwt = User.getJwt(user);
                    user.accessToken = jwt;
                    var data = responseMessages.userAuth(user);
                    response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'user': data });
                    res.status(200).json(response);
                } else {
                    var response = responseMessages.commonResponse(err.code);
                    res.status(401).json(response);
                }
            })
        } else {
            var response = responseMessages.commonResponse(validationInfo.code, validationInfo.attribute);
            res.status(400).json(response);
        }
    };

    /* POST user change password. */
    exports.changePassword = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Change password');

        User.validateChangePassParams(req.user.userId, req.body.oldPassword, req.body.newPassword, function (err, attribute) {
            if (!err) {
                async.waterfall([
                    function (callback) {
                        User.getEncryptedPassword(req.body.newPassword, function (err, bcryptedPassword) {
                            callback(err, bcryptedPassword);
                        });
                    }
                ], function (err, bcryptedPassword) {
                    if (err) {
                        var response = responseMessages.commonResponse(responseMessages.FAIL);
                        res.status(400).json(response);
                    } else {
                        req.body.password = bcryptedPassword;
                        User.updateById({ _id: req.user.userId }, req.body, function (err, result) {
                            if (!err) {
                                var response = responseMessages.commonResponse(responseMessages.SUCCESS);
                                res.status(200).json(response);
                            } else {
                                var errorData = mongooseErrorExtractor.getErrorData(err);
                                var response = responseMessages.commonResponse(errorData.code, errorData.attribute);
                                res.status(400).json(response);
                            }
                        });
                    }
                });
            } else {
                var response = responseMessages.commonResponse(err, attribute);
                res.status(401).json(response);
            }
        });
    };

    /* POST verify signup email. */
    exports.verifyEmail = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Verify email');

        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
        }

        if (req.body.sysEmail) {
            req.body.sysEmail = req.body.sysEmail.toLowerCase();
        }

        var query = isEmpty(req.body.email) ? { sysEmail: req.body.sysEmail } : { email: req.body.email };
        User.get(query, (err, user) => {
            if (user) {
                if (user.isEmailVerified === User.EMAIL_VERIFIED) {
                    // Email address is already verified
                    var response = responseMessages.commonResponse(responseMessages.SUCCESS);
                    return res.status(200).json(response);
                } else if (req.body.code != user.verificationCode) {
                    // Invalid verification code
                    var response = responseMessages.commonResponse(responseMessages.INVALID_VERIFICATION_CODE);
                    return res.status(400).json(response);
                } else {
                    user.status = User.ACTIVE;
                    user.isEmailVerified = User.EMAIL_VERIFIED;
                    user.verificationCode = 0;
                    user.save(function (err) {
                        if (!err) {
                            var response = responseMessages.commonResponse(responseMessages.SUCCESS);
                            return res.status(200).json(response);
                        } else {
                            var response = responseMessages.commonResponse(responseMessages.FAIL);
                            return res.status(500).json(response);
                        }
                    });
                }
            } else {
                var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                res.status(404).json(response);
            }
        });
    };

    /* POST Resend email verification code. */
    exports.resendVerificationCode = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Resend verification code');

        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
        }

        if (req.body.sysEmail) {
            req.body.sysEmail = req.body.sysEmail.toLowerCase();
        }

        var query = isEmpty(req.body.email) ? { sysEmail: req.body.sysEmail } : { email: req.body.email };
        User.get(query, (err, user) => {
            if (user) {
                if (user.isEmailVerified == User.EMAIL_VERIFIED) {
                    // Email address is already verified
                    var response = responseMessages.commonResponse(responseMessages.EMAIL_ALREADY_VERIFIED);
                    return res.status(400).json(response);
                } else {

                    // Regenerate verification code
                    user.verificationCode = Math.floor(100000 + Math.random() * 900000);
                    user.save(function (err) {
                        if (!err) {
                            var recipientEmail = isEmpty(req.body.email) ? req.body.sysEmail : req.body.email;
                            let name = user.firstName + ' ' + user.lastName;
                            mail.reSendVerificationCode(recipientEmail, name, user.verificationCode, function (err, data) {

                                if (!err) {
                                    logger.writeLog('Email verification email sent to ' + recipientEmail);
                                    var response = responseMessages.commonResponse(responseMessages.SUCCESS);
                                } else {
                                    logger.writeLog('Email verification email sending failed to ' + recipientEmail);
                                    var response = responseMessages.commonResponse(responseMessages.FAIL);
                                }
                                return res.status(200).json(response);
                            });
                        } else {
                            var response = responseMessages.commonResponse(responseMessages.FAIL);
                            return res.status(500).json(response);
                        }
                    });
                }
            } else {
                var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                return res.status(404).json(response);
            }
        });
    };

    /* POST user forgot password. */
    exports.forgotPassword = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Forgot password');

        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
        }

        if (req.body.sysEmail) {
            req.body.sysEmail = req.body.sysEmail.toLowerCase();
        }

        async.waterfall([
            function (callback) {
                var query = req.body.email ? { email: req.body.email } : { sysEmail: req.body.sysEmail };
                User.get(query, function (err, user) {
                    if (!user) {
                        var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                        return res.status(404).json(response);
                    }

                    // Set password reset token and expiration time
                    user.resetPasswordToken = Math.floor(100000 + Math.random() * 900000);
                    user.resetPasswordExpires = Date.now() + module.tokenExpirationTime;
                    user.save(function (err) {
                        callback(err, user);
                    });
                });
            }, function (user) {

                // Send email notification
                var recipientEmail = req.body.email ? req.body.email : req.body.sysEmail;
                let name = user.firstName + ' ' + user.lastName;
                mail.sendPasswordResetEmail(recipientEmail, name, user.resetPasswordToken, function (err, data) {
                    if (!err) {
                        logger.writeLog('Password reset email sent to ' + recipientEmail);
                    } else {
                        logger.writeLog('Password reset email sending failed to ' + recipientEmail);
                    }
                    var response = responseMessages.commonResponse(responseMessages.SUCCESS);
                    return res.status(200).json(response);
                });
            }
        ], function (err) {
            var response = responseMessages.commonResponse(responseMessages.FAIL);
            return res.status(500).json(response);
        });
    };

    /* POST Verify password reset token */
    exports.verifyReset = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Verify Password Reset Token');

        async.waterfall([
            function () {
                var query = { resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } };
                if (req.body.email) {
                    query.email = req.body.email.toLowerCase();
                } else {
                    query.sysEmail = req.body.sysEmail.toLowerCase();
                }
                // Check whether the token exists and not expired
                User.get(query, function (err, user) {
                    if (!user) {
                        var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                        return res.status(404).json(response);
                    }
                    var response = responseMessages.commonResponse(responseMessages.SUCCESS);
                    return res.status(200).json(response);
                });
            }
        ], function (err) {
            var response = responseMessages.commonResponse(responseMessages.FAIL);
            return res.status(500).json(response);
        });
    };

    /* POST reset password with token */
    exports.resetPassword = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Reset Account Password');

        async.waterfall([
            function (callback) {
                User.getEncryptedPassword(req.body.password, function (err, bcryptedPassword) {
                    req.body.password = bcryptedPassword;
                    callback();
                });
            }, function (callback) {

                var query = { resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } };
                if (req.body.email) {
                    query.email = req.body.email.toLowerCase();
                } else {
                    query.sysEmail = req.body.sysEmail.toLowerCase();
                }
                // Check whether the token exists and not expired
                User.get(query, function (err, user) {
                    if (!user) {
                        var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                        return res.status(404).json(response);
                    }
                    // Mark the email as verified in case if isn't
                    user.isEmailVerified = 1;
                    user.password = req.body.password;
                    user.resetPasswordToken = null;
                    user.resetPasswordExpires = null;
                    user.save(function (err) {
                        callback(err, user);
                    });
                });
            }, function (user, callback) {

                // Send email notification to the user
                var recipientEmail = user.userType === 1 ? user.sysEmail : user.email;
                let name = user.firstName + ' ' + user.lastName;
                mail.sendPasswordChangedEmail(recipientEmail, name, function (err, data) {
                    if (!err) {
                        logger.writeLog('Password changed notification email sent to ' + recipientEmail);
                    } else {
                        logger.writeLog('Password changed notification email sending failed to ' + recipientEmail);
                    }
                    var response = responseMessages.commonResponse(responseMessages.SUCCESS);
                    return res.status(200).json(response);
                });
            }], function (err) {
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                return res.status(500).json(response);
            });
    };

    /* GET shops the user has subscribed to. */
    exports.getShops = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Get subscribed shops for user:' + req.params.id);

        // Check permission
        if (req.user.userId != req.params.id && !util.hasPermission('user.shops', req.user.pemissions)) {
            // user who owned this record can access this end point
            var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
            return res.status(403).json(response);
        }

        // Retrieve user by id
        User.get({ _id: req.params.id }, (err, user) => {
            if (user) {
                async.waterfall([
                    function (callback) {
                        CarOwnerSubscription.getShopIdsAndStatusByUserId(req.params.id, req.query, function (err, shopIdsAndStatus) {
                            if (!err) {
                                if (shopIdsAndStatus.length === 0) {
                                    // This is to prevent mongodb $in empty[] returns all results
                                    let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'shops': { 'total': 0, 'data': [] } });
                                    return res.status(200).json(response);
                                } else { callback(shopIdsAndStatus); }
                            } else {
                                logger.writeLog('Error getting subscriptions: ' + err);
                                let response = responseMessages.commonResponse(responseMessages.FAIL);
                                return res.status(500).json(response);
                            }
                        });
                    }
                ], function (shopIdsAndStatus) {
                    // Get shopsIds for query
                    let ids = [];
                    let status = [];
                    for (let i = 0; i < shopIdsAndStatus.length; i++) {
                        ids.push(shopIdsAndStatus[i].shopId);
                        status[shopIdsAndStatus[i].shopId] = shopIdsAndStatus[i].status;
                    }
                    
                    req.query.shopIds = ids;
                    let query = Shop.getSearchQuery(req.query);
                    let pageNo = req.query.pageNo ? req.query.pageNo : 1;
                    let limit = req.query.limit ? req.query.limit : 10;
                    let sort = { createdAt: -1 };

                    if (req.query.sort) {
                        let sortOrder = req.query.sort.charAt(0) == '-' ? '-1' : 1;
                        let sortField = _.trim(req.query.sort, '-');
                        sort = { [sortField]: sortOrder };
                    }

                    Shop.getAll(query, pageNo, limit, sort, function (err, shops) {
                        if (!err) {
                            var data = [];
                            for (let i = 0; i < shops.length; i++) {
                                let shop = responseMessages.subscribedShop(shops[i], status[shops[i]._id]);
                                data.push(shop);
                            }
                            let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'shops': { 'total': shopIdsAndStatus.length, 'data': data } });
                            res.status(200).json(response);
                        } else {
                            var response = responseMessages.commonResponse(responseMessages.FAIL);
                            res.status(400).json(response);
                        }
                    });
                });
            } else {
                var response = responseMessages.commonResponse(responseMessages.RECORD_NOT_FOUND);
                res.status(404).json(response);
            }
        });
    };

    /* GET list/search all permissions. */
    exports.autoComplete = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Autocomplete users for name: ' + req.params.name);

        User.getAutocompleteUsers(req.params.name, req.query, function (err, users) {
            if (!err) {
                var data = [];
                for (var i = 0; i < users.length; i++) {
                    var user = responseMessages.autocompleteUser(users[i]);
                    data.push(user);
                }
                let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, { 'users': data });
                res.status(200).json(response);
            } else {
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                res.status(400).json(response);
            }
        });
    };

    /* POST Sync M1 users. */
    exports.syncM1Users = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Sync M1 users');

        let users = req.body.users;
        let totalRecords = users.length;
        let successCount = 0;
        let userIds = [];

        async.waterfall([
            function (callback) {
                Role.get({ name: config.get('carOwnerRoleName') }, (err, role) => {
                    let roleId = null;
                    if (role) {
                        roleId = role._id;
                    }
                    callback(null, roleId);
                });
            }
        ], function (err, roleId) {
            if (err) {
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                return res.status(400).json(response);
            } else {
                async.mapSeries(users, function (user, callback) {
                    user.email = user.email.toLowerCase();
                    logger.writeLog('Syncing user. Email:' + user.email);
                    User.get({ "email": user.email }, function (err, sfUser) {
                        if (isEmpty(sfUser)) {
                            user.roleId = roleId;
                            user.userType = User.UT_NORMAL_USER;
                            user.isM1SyncedUser = User.M1_SYNCED_YES;
                            user.status = User.ACTIVE;
                            user.isEmailVerified = User.EMAIL_VERIFIED;
                            User.create(user, function (err, createdObject) {
                                if (createdObject) {
                                    successCount++;
                                    userIds.push(createdObject._id);
                                    logger.writeLog('User created');

                                    let subscriptionData = {
                                        userId: createdObject._id,
                                        shopId: req.user.shopId,
                                        status: CarOwnerSubscription.PENDING
                                    };

                                    CarOwnerSubscription.create(subscriptionData, function (err, resObj) {
                                        if (resObj) {
                                            logger.writeLog('User added to subscription table.');
                                        } else {
                                            logger.writeLog('User could not be added to subscription table.');
                                        }
                                        callback(null);
                                    });
                                } else {
                                    logger.writeLog('User create failed');
                                    callback(null);
                                }
                            });
                        } else {
                            // Handle newly added fields for existing customers
                            let updateData = {};

                            // Check for company field
                            if (isEmpty(sfUser.company)) {
                                // Set null if company is empty
                                let company = isEmpty(user.company) ? undefined : user.company;
                                updateData = {
                                    company: company
                                }
                            }

                            if (!isEmpty(updateData)) {
                                User.updateById({ _id: sfUser._id }, updateData, function (err, result) {
                                    if (!err) {
                                        logger.writeLog('New field details updated. Email: ' + sfUser.email);
                                    } else {
                                        logger.writeLog('New field details update failed. Email: ' + sfUser.email);
                                    }
                                });
                            }

                            // User account created from sync process from another shop.
                            // We need only to create a subscription for this shop

                            // Actions
                            // null - Initial syncup process, 
                            // A - New user found after initial syncup prorcess 
                            // U - User record updated after initial syncup process
                            // D - User record deleted after initial syncup process
                            CarOwnerSubscription.get({ userId: sfUser._id, shopId: req.user.shopId }, function (err, subscription) {
                                if (isEmpty(subscription) && !err) {
                                    let subscriptionData = {
                                        userId: sfUser._id,
                                        shopId: req.user.shopId,
                                        status: CarOwnerSubscription.PENDING
                                    };
                                    CarOwnerSubscription.create(subscriptionData, function (err, resObj) {
                                        if (resObj) {
                                            successCount++;
                                            logger.writeLog('User added to subscription table. Email: ' + sfUser.email);
                                        } else {
                                            logger.writeLog('User could not be added to subscription table. Email: ' + sfUser.email);
                                        }
                                        callback(null);
                                    });
                                } else {
                                    successCount++;
                                    logger.writeLog('Subscription exists. Email: ' + sfUser.email);

                                    if (user.action == 'D') {
                                        CarOwnerSubscription.updateById({_id: subscription._id}, {status: CarOwnerSubscription.UNSUBSCRIBED}, function (err, res) {
                                            if (!err) {
                                                logger.writeLog('Subscription status updated as deleted');
                                            } else {
                                                logger.writeLog('Subscription could not be updated as deleted');
                                            }
                                        });
                                        callback(null);
                                    } else {
                                        callback(null);
                                    }
                                }
                            });
                        }
                    });
                }, function (err) {
                    logger.writeLog('User batch processing is over');
                    let resData = { "users": userIds };
                    if (totalRecords == successCount) {
                        var response = responseMessages.commonResponse(responseMessages.SUCCESS, null, resData);
                        return res.status(200).json(response);
                    } else if (successCount > 0) {
                        var response = responseMessages.commonResponse(responseMessages.SOME_RECORDS_SYNCED, null, resData);
                        return res.status(200).json(response);
                    } else {
                        var response = responseMessages.commonResponse(responseMessages.FAIL, null, resData);
                        return res.status(200).json(response);
                    }
                });
            }
        });
    };

    /* POST Create sync tool user */
    exports.generateSyncToolUserKeys = function (req, res, next) {
        var logger = req.logger;
        logger.writeLog('Generate keys for sync tool user.');

        async.waterfall([
            // Check whether shopowner has rights to generate keys for his shop
            function (callback) {
                Shop.get({ _id: req.body.shopId }, function (err, shop) {
                    if (shop) {
                        if (shop.shopOwner._id != req.user.userId) {
                            logger.writeLog('Not shop owner.');
                            var response = responseMessages.commonResponse(responseMessages.PERMISSION_DENIED);
                            return res.status(403).json(response);
                        } else {
                            callback(null);
                        }
                    } else {
                        callback('Shop not found')
                    }
                });
            },
            // Get the role id associated with the SyncTool
            function (callback) {
                Role.get({ name: config.get('syncToolRoleName') }, function (err, role) {
                    if (role) {
                        callback(null, role._id)
                    } else {
                        callback('Role not found');
                    }
                });
            },
            // Check whether keys already generated
            function (roleId, callback) {
                User.get({ shopId: req.body.shopId, roleId: roleId }, function (err, user) {
                    if (user) {
                        logger.writeLog('Keys already genereated');
                        let msg = responseMessages.syncToolUser(user.sysEmail, user.origPassword);
                        let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, msg);
                        return res.status(200).json(response);
                    } else {
                        callback(null, roleId)
                    }
                })
            },
            // Generate encrypted password
            function (roleId, callback) {
                let password = uniqid();
                User.getEncryptedPassword(password, function (err, bcryptedPassword) {
                    callback(err, bcryptedPassword, password, roleId);
                });
            },
        ], function (err, bcryptedPassword, password, roleId) {
            if (!err) {
                // Sync tool user data
                let userData = {
                    firstName: 'SyncTool',
                    sysEmail: uniqid() + '@sf.com',
                    password: bcryptedPassword,
                    origPassword: password,
                    userType: User.UT_SYS_USER,
                    status: User.ACTIVE,
                    isEmailVerified: User.EMAIL_VERIFIED,
                    roleId: roleId,
                    shopId: req.body.shopId
                };

                // Create sync tool user
                User.create(userData, function (err, userObj) {
                    if (userObj) {
                        let msg = responseMessages.syncToolUser(userData.sysEmail, password);
                        let response = responseMessages.commonResponse(responseMessages.SUCCESS, null, msg);
                        return res.status(200).json(response);
                    } else {
                        let response = responseMessages.commonResponse(responseMessages.FAIL);
                        return res.status(400).json(response);
                    }
                })
            } else {
                logger.writeLog('Error:' + JSON.stringify(err));
                var response = responseMessages.commonResponse(responseMessages.FAIL);
                return res.status(403).json(response);
            }
        });
    };
})();

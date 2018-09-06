
/**
 * @name user.js
 * @fileOverview User model. Ether email or sysEmail need to be present.
 * it validates at the router.
 * @author Aruna Attanayake
 */

(function() {

  	'use strict';

  	// User types
  	const UT_SYS_USER = 1;
  	const UT_NORMAL_USER = 2;

	var mongoose = require('mongoose');
	var emailValidator = require("email-validator");
	var isEmpty = require('is-empty');
	var bcrypt = require('bcrypt');
	var jwt = require('jsonwebtoken');
	var responseMessages = require('../lib/response-messages');
	var config = require('config');

	module.TEST = 'test';

	// Validate email.
	function email(value) {
		if (!isEmpty(value)) {
			return emailValidator.validate(value);
		}
	}

	// Validate mobile.
	function mobile(value) {
		var regEx = /^[+]?\d+$/;
		if (!isEmpty(value)) {
			return regEx.test(value);
		}
	}

	var userSchema = new mongoose.Schema({
		userType: {
			// user type. 1 - system user, 2 - normal user
			type: Number,
			min: 1,
			max: 2,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
		},
		firstName: {
			type: String, 
			// Commented due to company attribute. Some records don't have firstName
			// required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE], 
			maxlength: [30, responseMessages.EXCEED_CHARACTER_LENGTH],
			trim: true
		},
		lastName: {
			type: String,
			maxlength: [60, responseMessages.EXCEED_CHARACTER_LENGTH],
			default: null,
			trim: true,
			default: ''
		},
		email: {
			type: String,
			unique: true,
			maxlength: [150, responseMessages.EXCEED_CHARACTER_LENGTH],
			validate: [email, responseMessages.INVALID_EMAIL],
			// Do not enable default null. Since email is unique, it will add null and cant create new records therafter.
			//default: null, 
			sparse: true
		},
		password: {
			type: String,
			default: null,
			trim: true
		},
		sysEmail: {
			// sysEmail is for system users
			type: String,
			unique: true,
			maxlength: [150, responseMessages.EXCEED_CHARACTER_LENGTH],
			validate: [email, responseMessages.INVALID_EMAIL],
			// Do not enable default null. Since email is unique, it will add null and cant create new records therafter.
			//default: null,
			sparse: true
		},
		timezone: {
			type: String,
			default: config.get('defaultTimezone')
		},
		roleId: {
	  		type: mongoose.Schema.Types.ObjectId,
	  		ref: 'Role', 
	  		default: null
		},
		status: {
			// 1 - active, 2 - inactive
			type: Number,
			min:1,
			max:2,
			default: 2,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE]
		},
		mobile: {
			type: String,
			maxlength: [30, responseMessages.EXCEED_CHARACTER_LENGTH],
			validate: [mobile, responseMessages.INVALID_MOBILE],
			default: null
		},
		gender: {
			// 1 - male, 2 - female
			type: Number,
			min:1,
			max:2,
			default: 1,
			required: [true, responseMessages.MISSING_MANDATORY_ATTRIBUTE],
		},
		lastAccess: {
	  		type: Date,
	  		default: null
	  	},
	  	createdById: {
			type: mongoose.Schema.Types.ObjectId,
	  		ref: 'User',
	  		default: null
	  	},
	  	updatedById: {
			type: mongoose.Schema.Types.ObjectId,
	  		ref: 'User',
	  		default: null
	  	},
	  	accessToken : {
	  		type: String, 
	  		default: null
	  	},
	  	isEmailVerified : {
	  		// 0 - Pending, 1 - verified
	  		type: Number,
			min:0,
			max:1,
			default: 0
		},
		resetPasswordToken: {
			type: String,
			default: null
		},
  		resetPasswordExpires: {
			type: Date,
			default: null
		},
		verificationCode: {
			type: Number,
			min: 0,
			max: 999999
		},
		shopId: {
			type: mongoose.Schema.Types.ObjectId,
	  		ref: 'Shop', 
	  		default: null
		},
		// In case if we want to return back original password.
		// At the moment use only for sync tool user
		origPassword: {
			type: String,
			default: null
		},
		isM1SyncedUser: {
			// 0 - No, 1 - Yes
			type: Number,
			min: 0,
			max: 1,
			default: 0
		},
		homePhone: {
			// Just for M1 synced users
			type: String, 
			default: null
		},
		company: {
			// Just for M1 synced users
			type: String, 
			default: null
		}
	}, {
		collection: 'user',
		timestamps: true,
		collation: {
			locale: 'en_US',
			strength: 1
		}
	});

	// Methods & constants
	userSchema.statics = {

		// User active statuses
		ACTIVE: 1,
		INACTIVE: 2,

		// Email verify statuses
		EMAIL_NOT_VERIFIED: 0,
		EMAIL_VERIFIED: 1,

		// User types
		UT_SYS_USER: UT_SYS_USER,
		UT_NORMAL_USER: UT_NORMAL_USER,

		// Is M1 Synced user
		M1_SYNCED_YES: 1,
		M1_SYNCED_NO: 0,

	    get: function(query, callback) {
	        this.findOne(query)
				.populate({path: 'roleId', select: 'name'})
				.populate('createdById', ['firstName', 'lastName'])
	        	.populate('updatedById', ['firstName', 'lastName'])
	        	.exec(callback);
	    },

	    getWithPermissions: function(userId, callback) {
        	this.findOne({_id: userId})
	        	.populate({path: 'roleId', select: 'name', populate: {path: 'permissions', model: 'Permission', select: 'name'}})
	        	.exec(callback);
	    },

	    getAll: function(query, pageNo, limit, sort, callback) {
	    	var skip = (pageNo-1) * limit;
	        //this.find(query, callback).sort(sort).skip(skip).limit(parseInt(limit));
	        this.find(query)
				.populate({path: 'roleId', select: 'name'})
				.populate('createdById', ['firstName', 'lastName'])
	        	.populate('updatedById', ['firstName', 'lastName'])
	        	.sort(sort)
	        	.skip(skip)
	        	.limit(parseInt(limit))
	        	.exec(callback);
	    },
	    
	    updateById: function(id, updateData, callback) {
			this.update(id, { $set: updateData }, { runValidators: true }, callback);
	    },

	    removeById: function(removeData, callback) {
	        this.remove(removeData, callback);
	    },

	    create: function(data, callback) {
	        var user = new this(data);
	        user.save(callback);
	    },

	   	getCount: function(query, callback) {
	        this.count(query, callback);
	    },

	    getSearchQuery: function(queryParams) {
	    	var qFirstName = {};
	    	var qLastName = {};
			var qEmail = {};
			var qSysEmail = {};
			var qStatus = {};
			var qUserType = {};
			var qRoleId = {};
			let qUserIds = {};
			let qRoleIdNe = {};
			let qCreatedBy = {};
			if (!isEmpty(queryParams.firstName)) {
				qFirstName = { firstName: { $regex: '.*' + queryParams.firstName + '.*', $options: 'i' } };
			}
			if (!isEmpty(queryParams.lastName)) {
				qLastName = { lastName: { $regex: '.*' + queryParams.lastName + '.*', $options: 'i' } };
			} 
			if (!isEmpty(queryParams.email)) {
				qEmail = { email: { $regex: '.*' + queryParams.email + '.*', $options: 'i' } };
			}
			if (!isEmpty(queryParams.sysEmail)) {
				qSysEmail = { sysEmail: { $regex: '.*' + queryParams.sysEmail + '.*', $options: 'i' } };
			}
			if (!isEmpty(queryParams.status)) {
				qStatus = { status: queryParams.status };
			}
			if (!isEmpty(queryParams.userType)) {
				qUserType = { userType: queryParams.userType };
			}
			if (!isEmpty(queryParams.roleId)) {
				qRoleId = { roleId: queryParams.roleId };
			}
			if (queryParams.userIds && queryParams.userIds.length > 0) {
				qUserIds = { '_id': { $in: queryParams.userIds } };
			}
			if (!isEmpty(queryParams.createdBy)) {
				qCreatedBy = { createdById: queryParams.createdBy };
			}
			if (!isEmpty(queryParams.roleIdNe)) {
				qRoleIdNe = {roleId: {$ne: queryParams.roleIdNe}}
			}

			var query = { $and: [ qFirstName, qEmail, qSysEmail, qStatus, qUserType, qRoleId, qLastName, qUserIds, qRoleIdNe, qCreatedBy] };

			return query;
	    },

		getAutocompleteUsers: function (name, queryParams, callback) {

			let qUserType = {};
			let qCreatedBy = {};
			if (!isEmpty(queryParams.userType)) {
				qUserType = { userType: { $eq :  parseInt(queryParams.userType) }};
			}
			if (!isEmpty(queryParams.createdBy)) {
				qCreatedBy = { createdById: queryParams.createdBy };
			}
			this.aggregate([
				{
					$project: {
						fullName: {
							$concat: ["$firstName", " ", "$lastName"]
						},
						email: "$email",
						sysEmail: "$sysEmail",
						userType: "$userType",
						createdById: "$createdById"
					}
				}, {
					$match: {
						$and: [{
								fullName: {
									$regex: new RegExp(".*" + name + ".*", "i")
								}
							},
							qUserType,
							qCreatedBy
						]
					}
				}, {
					$sort: {
						fullName: -1
					}
				}, {
					$limit: 5
				}
			]).exec(callback);
		},

		validateAuthParams: function (userType, email, sysEmail) {
			var validationInfo = { 'code': null, 'attribute': null };
			if (userType == UT_SYS_USER && isEmpty(sysEmail)) {
				validationInfo.code = responseMessages.MISSING_MANDATORY_ATTRIBUTE;
				validationInfo.attribute = 'sysEmail';
			} else if (userType == UT_NORMAL_USER && isEmpty(email)) {
				validationInfo.code = responseMessages.MISSING_MANDATORY_ATTRIBUTE;
				validationInfo.attribute = 'email';
			}
			return validationInfo;
		},

	    authUser: function(userType, email, sysEmail, password, callback) {
	    	var query = {};
	    	switch (userType) {
	    		case UT_SYS_USER:
	    			query = {sysEmail: sysEmail};
	    			break;

	    		case UT_NORMAL_USER:
	    			query = {email: email};
	    			break;

	    		default:
	    			query = {};
	    			break;
	    	}

	        this.findOne(query)
	        	.populate({path: 'roleId', select: 'name', populate: {path: 'permissions', model: 'Permission', select: 'name'}})
	        	.exec(function(err, user) {
	        		var errorInfo = {'code': null, 'attribute': null};
					if (!err && !isEmpty(user)) {
						bcrypt.compare(password, user.password, function(err, doesMatch) {
							if (doesMatch) {
								if (user.userType == userSchema.statics.UT_SYS_USER) {
									// System users
									if (user.status == userSchema.statics.ACTIVE) {
										callback(null, user);
									} else {
										errorInfo.code = responseMessages.INACTIVE_USER;
										callback(errorInfo, null);
									}
								} else {
									// Normal users
									if (user.isEmailVerified != userSchema.statics.EMAIL_VERIFIED) {
										errorInfo.code = responseMessages.EMAIL_NOT_VERIFIED;
										callback(errorInfo, null);
									} else if (user.status != userSchema.statics.ACTIVE) {
										errorInfo.code = responseMessages.INACTIVE_USER;
										callback(errorInfo, null);
									} else {
										callback(null, user);
									}
								}
							} else {
								errorInfo.code = responseMessages.INVALID_USERNAME_PASSWORD;
								callback(errorInfo, null);
							}
						});
					} else {
						errorInfo.code = responseMessages.INVALID_USERNAME_PASSWORD;
						callback(errorInfo, null);
					}
				});
	    },

	    getEncryptedPassword: function(password, callback) {
			bcrypt.hash(password, 5, function(err, bcryptedPassword) {
			   callback(err, bcryptedPassword);
			});
	    },

	    getJwt: function(user) {
	    	// https://github.com/auth0/node-jsonwebtoken
	    	var data = {
	    		userId: user._id, 
	    		email: user.email, 
	    		sysEmail: user.sysEmail,
	    		firstName: user.firstName
	    	};
	    	var token = jwt.sign(data, config.get('jwtSecKey'));
	    	return token;
	    },

	    validateJwt: function(token) {
	    	var decoded = null;
			try {
			  	decoded = jwt.verify(token, config.get('jwtSecKey'));
			} catch(err) {
			  // err
			}

			return decoded;
	    },

	    extractPermission: function(role) {
	    	var permissions = [];
	    	if (!isEmpty(role) && !isEmpty(role.permissions)) {
	    		for (var i=0; i<role.permissions.length; i++) {
            		var permission = role.permissions[i];
            		permissions.push(permission.name);
            	}
	    	}

	    	return permissions;
	    },

		validateChangePassParams: function (userId, oldPassword, newPassword, callback) {
			this.findOne({ _id: userId }, function (err, user) {
				if (err) {
					callback(responseMessages.FAIL, null);
				} else {
					bcrypt.compare(oldPassword, user.password, function (err, doesMatch) {
						if (doesMatch) {
							callback(null, null);
						} else {
							callback(responseMessages.INVALID_OLD_PASSWORD, 'oldPassword');
						}
					});
				}
			});
		}
	}

	// Create indexes for unique fields
	userSchema.set('autoIndex', true);
	module.exports = mongoose.model('User', userSchema);

})();

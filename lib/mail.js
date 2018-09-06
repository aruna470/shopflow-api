
/**
 * @name mail.js
 * @fileOverview Helper class to handle system mails
 * @author Aruna Attanayake
 */

(function() {

  	'use strict';

	var fs = require('fs');
	var Client = require('node-rest-client').Client;
  	var config = require('config');

  	module.emailTemplatePath = config.get('email.templatePath');
  	module.contentFolderPath = config.get('email.contentFolder');
  	module.lang = 'en-US';
  	module.apiEndPoint = config.get('mailgun.apiEndPoint');
  	module.apiUsername = config.get('mailgun.apiUsername');
  	module.apiPassword = config.get('mailgun.apiPassword');
  	module.fromEmail = config.get('email.fromEmail');
  	module.fromName = config.get('email.fromName');
  	module.activateLink = config.get('email.activateLink');
	module.resetLink = config.get('email.activateLink');
	module.inviteLink = config.get('email.inviteLink');

	/**
	 * Send user signup email
	 * @param {string} email - Recepient email address
	 * @param {string} name - Recepient name
	 * @param {string} code - Email verification code
	 * @callback request callback
	 */
	function sendSignupEmail(email, name, code,  callback) {

		fs.readFile(getContentFilePath('signup.html'), 'utf8', function(err, data) {  
		    if (!err) {
		    	var content = replaceString(data, ['{name}'], [name]);
		    	var subject = 'signup';
		    	getTemplateContent(function(err, templateContent) {
		    		if (!err) {
		    			var here = '<a href="' + module.activateLink + code + '&email=' + email + '">' + 'here' + '</a>';
		    			var emailMsg = replaceString(templateContent, ['{content}', '{here}', '{code}'], [content, here, code]);
		    			send(email, subject, emailMsg, function(err, data) {
		    				callback(err, data);
		    			});
		    		} else {
		    			callback(err);
		    		}
		    	});
		    } else {
		    	callback(err);
		    }
		});
	}

	/**
	 * Notify system user that their account has been created
	 * @param {string} email - Recepient email address
	 * @param {string} name - Recepient name
	 * @callback request callback
	 */
	function sendSysAccCreatedEmail(email, name, callback) {

		fs.readFile(getContentFilePath('sys-acc-created.html'), 'utf8', function (err, data) {
			if (!err) {
				var content = replaceString(data, ['{name}'], [name]);
				var subject = 'Your ShopFlow Manager account';
				getTemplateContent(function (err, templateContent) {
					if (!err) {
						var emailMsg = replaceString(templateContent, ['{content}'], [content]);
						send(email, subject, emailMsg, function (err, data) {
							callback(err, data);
						});
					} else {
						callback(err);
					}
				});
			} else {
				callback(err);
			}
		});
	}

	/**
	 * Resend email verification code
	 * @param {string} email - Recepient email address
	 * @param {string} name - Recepient name
	 * @param {String} code - Account verification code
	 * @callback request callback
	 */
	function reSendVerificationCode(email, name, code, callback) {

		fs.readFile(getContentFilePath('resend-verification-code.html'), 'utf8', function (err, data) {
			if (!err) {
				var content = replaceString(data, ['{name}'], [name]);
				var subject = 'Your Shopflow Manager Email Verification Code';
				getTemplateContent(function (err, templateContent) {
					if (!err) {
						var here = '<a href="' + module.activateLink + code + '&email=' + email + '">' + 'here' + '</a>';
						var emailMsg = replaceString(templateContent, ['{content}', '{here}', '{code}'], [content, here, code]);
						send(email, subject, emailMsg, function (err, data) {
							callback(err, data);
						});
					} else {
						callback(err);
					}
				});
			} else {
				callback(err);
			}
		});
	}

	/**
	 * Send password reset link
	 * @param {String} email - Recepient email address
	 * @param {String} name - Recepient name
	 * @param {String} token - Password reset token
	 * @param {request} callback callback
	 */
	function sendPasswordResetEmail(email, name, token, callback) {

		fs.readFile(getContentFilePath('forgot-password.html'), 'utf8', function (err, data) {
			if (!err) {
				var content = replaceString(data, ['{name}'], [name]);
				var subject = 'Password Reset';
				getTemplateContent(function (err, templateContent) {
					if (!err) {
						var here = '<a href="' + module.resetLink + token + '">' + 'here' + '</a>';
						var emailMsg = replaceString(templateContent, ['{content}', '{here}', '{code}'], [content, here, token]);
						send(email, subject, emailMsg, function (err, data) {
							callback(err, data);
						});
					} else {
						callback(err);
					}
				});
			} else {
				callback(err);
			}
		});
	}

	/**
	 * Send password reset confirmation email
	 * @param {String} email - Recepient email address
	 * @param {String} name - Recepient name
	 * @param {request} callback callback
	 */
	function sendPasswordChangedEmail(email, name, callback) {

		fs.readFile(getContentFilePath('password-changed.html'), 'utf8', function (err, data) {
			if (!err) {
				var content = replaceString(data, ['{name}'], [name]);
				var subject = 'Your password has been changed';
				getTemplateContent(function (err, templateContent) {
					if (!err) {
						var emailMsg = replaceString(templateContent, ['{content}'], [content]);
						send(email, subject, emailMsg, function (err, data) {
							callback(err, data);
						});
					} else {
						callback(err);
					}
				});
			} else {
				callback(err);
			}
		});
	}

	/**
	 * Send shop invitation to user
	 * @param {string} email - Recepient email address
	 * @param {string} shopName - Shop name
	 * @param {String} code - Invitation code
	 * @callback request callback
	 */
	function sendInvitation(email, shopName, code, callback) {

		fs.readFile(getContentFilePath('invite-user.html'), 'utf8', function (err, data) {
			if (!err) {
				var content = replaceString(data, ['{shopName}'], [shopName]);
				var subject = 'Join ' + shopName + ' on ShopFlow Manager';
				getTemplateContent(function (err, templateContent) {
					if (!err) {
						var link = '<a href="' + module.inviteLink + code + '">' + 'Join Now' + '</a>';
						var emailMsg = replaceString(templateContent, ['{content}', '{link}', '{appStoreLink}', '{playStoreLink}'],
							[content, link, config.get('email.appStoreLink'), config.get('email.playStoreLink')]);
						send(email, subject, emailMsg, function (err, data) {
							callback(err, data);
						});
					} else {
						callback(err);
					}
				});
			} else {
				callback(err);
			}
		});
	}

	/**
	 * Send user unsubscribed notification to shopOwner
	 * @param {string} email - Recepient email address
	 * @param {string} shopName - Shop name
	 * @param {string} carOwner - Car owner's name
	 * @callback request callback
	 */
	function sendUnsubscribedNotification(email, shopName, carOwner, callback) {

		fs.readFile(getContentFilePath('unsubscribed-shopowner.html'), 'utf8', function (err, data) {
			if (!err) {
				var content = replaceString(data, ['{shopName}'], [shopName]);
				var subject = 'Join ' + shopName + ' on ShopFlow Manager';
				getTemplateContent(function (err, templateContent) {
					if (!err) {
						var emailMsg = replaceString(templateContent, ['{content}', '{shopName}', '{carOwner}'],
							[content, shopName, carOwner]);
						send(email, subject, emailMsg, function (err, data) {
							callback(err, data);
						});
					} else {
						callback(err);
					}
				});
			} else {
				callback(err);
			}
		});
	}

	/**
	 * Send user subscription request notification to shopOwner
	 * @param {string} email - Recepient email address
	 * @param {string} shopName - Shop name
	 * @param {string} carOwner - Car owner's name
	 * @callback request callback
	 */
	function sendSubscribedNotification(email, shopName, carOwner, callback) {

		fs.readFile(getContentFilePath('subscribed-shopowner.html'), 'utf8', function (err, data) {
			if (!err) {
				var content = replaceString(data, ['{shopName}'], [shopName]);
				var subject = 'Join ' + shopName + ' on ShopFlow Manager';
				getTemplateContent(function (err, templateContent) {
					if (!err) {
						var emailMsg = replaceString(templateContent, ['{content}', '{shopName}', '{carOwner}'],
							[content, shopName, carOwner]);
						send(email, subject, emailMsg, function (err, data) {
							callback(err, data);
						});
					} else {
						callback(err);
					}
				});
			} else {
				callback(err);
			}
		});
	}

	/**
	 * Send invitation to m1 synced user for the first time
	 * @param {string} name - Recepient name
	 * @param {string} shopName - Shop name
	 * @param {string} playStoreLink - Play store link
	 * @param {string} appStoreLink - App store link
	 * @param {string} userEmail - Recepient email address
	 * @param {string} password - Password generated
	 * @callback request callback
	 */
	function sendInvitationToM1UserFirstTime(name, shopName, playStoreLink, appStoreLink, userEmail, password, callback) {

		fs.readFile(getContentFilePath('invite-m1-user-first-time.html'), 'utf8', function (err, data) {
			if (!err) {
				var content = replaceString(data, ['{name}', '{shopName}', '{playStoreLink}', '{appStoreLink}', '{userEmail}', '{password}'],
				[name, shopName, playStoreLink, appStoreLink, userEmail, password]);
				var subject = 'Join ' + shopName + ' on ShopFlow Manager';
				getTemplateContent(function (err, templateContent) {
					if (!err) {
						var emailMsg = replaceString(templateContent, ['{content}'], [content]);
						send(userEmail, subject, emailMsg, function (err, data) {
							callback(err, data);
						});
					} else {
						callback(err);
					}
				});
			} else {
				callback(err);
			}
		});
	}

	/**
	 * Send invitation to m1 synced user
	 * @param {string} name - Recepient name
	 * @param {string} shopName - Shop name
	 * @param {string} playStoreLink - Play store link
	 * @param {string} appStoreLink - App store link
	 * @param {string} userEmail - Recepient email address
	 * @callback request callback
	 */
	function sendInvitationToM1User(name, shopName, playStoreLink, appStoreLink, userEmail, callback) {

		fs.readFile(getContentFilePath('invite-m1-user.html'), 'utf8', function (err, data) {
			if (!err) {
				var content = replaceString(data, ['{name}', '{shopName}', '{playStoreLink}', '{appStoreLink}'],
					[name, shopName, playStoreLink, appStoreLink]);
				var subject = 'Join ' + shopName + ' on ShopFlow Manager';
				getTemplateContent(function (err, templateContent) {
					if (!err) {
						var emailMsg = replaceString(templateContent, ['{content}'], [content]);
						send(userEmail, subject, emailMsg, function (err, data) {
							callback(err, data);
						});
					} else {
						callback(err);
					}
				});
			} else {
				callback(err);
			}
		});
	}

	/**
	 * Read main layout content
	 * @callback request callback
	 */
	function getTemplateContent(callback) {
		fs.readFile(module.emailTemplatePath, 'utf8', function(err, data) {  
		    if (!err) {
		    	var content = setTemplatePlaceHolderValues(data);
		    	callback(null, content);
		    } else {
		    	callback(err);
		    }
		});
	}

	/**
	 * Set place holder values of main layout
	 * @param {string} content Main layout HTML content
	 * @return {string}
	 */
	function setTemplatePlaceHolderValues(content) {
		var find = ['{teamMsg}', '{siteLink}', '{siteLinkText}', '{about}', '{telephone}', '{email}', 
			'{copyright}', '{supportEmail}', '{team}'
		];
		var copyright = replaceString(config.get('email.copyright'), ['{year}'], [(new Date()).getFullYear()]);
		var replace = [
			config.get('email.teamMsg'),
			config.get('email.siteLink'),
			config.get('email.siteLinkText'),
			config.get('email.about'),
			config.get('email.telephone'),
			config.get('email.email'),
			copyright,
			config.get('email.fromEmail'),
			config.get('email.teamMsg')
		];

		return replaceString(content, find, replace);
	}

	/**
	 * Find and replace with matching string
	 * @param {string} content Content text
	 * @param {string} find Array of string to be find
	 * @param {string} replace Array of matching string to be replaced
	 * @return {string}
	 */
	function replaceString(content, find, replace) {
		var regex; 

		for (var i = 0; i < find.length; i++) {
			regex = new RegExp(find[i], "g");
			content = content.replace(regex, replace[i]);
		}

		return content;
	}

	/**
	 * Read content of intended email
	 * @param {string} fileName File name
	 * @return {string}
	 */
	function getContentFilePath(fileName) {
		var contentFile = module.contentFolderPath + module.lang + '/' + fileName;
		return contentFile;
	}

	/**
	 * Send message using MailGun API
	 * @param {string} toEmail Recepient email
	 * @param {string} subject Subject of the email
	 * @param {string} content Email body
	 * @callback request callback
	 * @param {string} fromEmail Sender email address
	 * @param {string} fromName Sender name
	 */
	function send(toEmail, subject, content, callback, fromEmail = null, fromName = null) {

		var client = new Client();

		var fEmail = fromEmail ? fromEmail : module.fromEmail;
		var fName = fromName ? fromName : module.fromName;
		var auth = "Basic " + new Buffer(module.apiUsername + ":" + module.apiPassword).toString("base64");

		var args = {
		    data: {
		    	'from': fName + '<' + fEmail + '>',
		    	'to': toEmail,
		    	'subject': subject,
		    	'html': content
		    },
		    headers: { "Authorization" : auth, "Content-Type": 'application/x-www-form-urlencoded' }
		};
		 
		client.post(module.apiEndPoint + 'messages', args, function (data, response) {
		    if (data.message.indexOf('Queued') !== -1) {
		    	callback(null, data);
		    } else {
		    	callback('error', data);
		    }
		});
	}

	/**
	 * Export module fumctions to be accessed from outside
	 */
	module.exports = {
		sendSignupEmail: sendSignupEmail,
		sendSysAccCreatedEmail: sendSysAccCreatedEmail,
		sendPasswordResetEmail: sendPasswordResetEmail,
		sendPasswordChangedEmail: sendPasswordChangedEmail,
		reSendVerificationCode: reSendVerificationCode,
		sendInvitation: sendInvitation,
		sendUnsubscribedNotification: sendUnsubscribedNotification,
		sendSubscribedNotification: sendSubscribedNotification,
		sendInvitationToM1UserFirstTime: sendInvitationToM1UserFirstTime,
		sendInvitationToM1User: sendInvitationToM1User
	}

})();
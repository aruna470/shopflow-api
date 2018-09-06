/**
 * @name aws.js
 * @fileOverview Wrapper module for handling AWS SDK queries
 * @author Aruna Attanayake
 */

(function() {

  	'use strict';

	var Aws = require('aws-sdk');
	var config = require('config');
	var fs = require('fs');
	var path = require('path');
	var isEmpty = require('is-empty');

	Aws.config.loadFromPath('./config/aws-config.json');

	var bucketName = config.get('aws.bucketName');
	var signedUrlExpireSeconds = config.get('aws.signedUrlExpireSeconds');
	var s3 = new Aws.S3();

	/**
	 * Upload file to S3 bucket. Includes generated file name and presigned URL in the response.
	 * Object ACL is set to private.
	 * @param {String} remoteFileName - Name of the uploaded file
	 * @param {String} sourceFilePath - Uploaded file path
	 * @param {String} callback - Callback function
	 * @param {boolean} isPublic - Optional, if set to true object will have public-read ACL, private otherwise.
	 */
	function s3UploadOjbect(remoteFileName, sourceFilePath,  logger, callback, isPublic = false) {

		var fileData = fs.readFileSync(sourceFilePath);

		var generatedFileName = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
			+ path.extname(remoteFileName);

		var objectACL = isPublic ? 'public-read' : 'private';
		s3.upload({
			ACL: objectACL,
			Bucket: bucketName,
			Key: generatedFileName,
			Body: fileData
		}, function (error, response) {
			logger.writeLog('Upload error:' + JSON.stringify(error));
			logger.writeLog('Upload response:' + JSON.stringify(response));
			if (response) {
				// Sometimes when image upload from IOS aws return 'Key' instead 'key'
				let key = isEmpty(response.key) ? response.Key : response.key;
				s3GetSignedUrl(key, function (error, res) {
					if (!error) {
						response.signedUrl = res;
					} else {
						response.signedUrl = null;
					}
					response.key = key;
					response.Key = key;
					callback(error, response);
				});
			}
		});
	}

	/**
	 * Returns signed url of given file
	 * @param {String} key - File Key
	 * @param {*} callback - Callback function
	 */
	function s3GetSignedUrl(key, callback) {
		var url = s3.getSignedUrl('getObject', {
			Bucket: bucketName,
			Key: key,
			Expires: signedUrlExpireSeconds
		}, function (error, response) {
			callback(error, response);
		});
	}

	/**
	 * Export module fumctions to be accessed from outside
	 */
	module.exports = {
		s3UploadOjbect: s3UploadOjbect,
		s3GetSignedUrl: s3GetSignedUrl
	}

})();

/**
 * @name logger.js
 * @fileOverview Pushes API logs to cloudwatch or logs in the console for local env.
 * @author Aruna Attanayake
 */

(function () {

	'use strict';

	var moment = require('moment');
	var fs = require('fs');
	var config = require('config');
	var aws = require('../config/aws-config.json');
	var winston = require('winston'),
		CloudWatchTransport = require('winston-aws-cloudwatch');
	var isEmpty = require('is-empty');

	/**
	 * Get basic logger
	 */
	function getLogger() {
		let logger = new winston.Logger();
		logger.stream = {
			write: function (message, encoding) {
				logger.info(message);
			}
		};
		return logger;
	}

	/**
	 * Get customized console logger
	 */
	function getConsoleLogger() {
		let logger = new winston.Logger({
			transports: [
				new (winston.transports.Console)({
					timestamp: true,
					colorize: true,
				})
			]
		});
		logger.stream = {
			write: function (message, encoding) {
				logger.info(message);
			}
		};
		return logger;
	}

	/**
	 * Get aws cloudwatch log configuration for given streamName
	 * @param {String} streamName aws cloudwatch log streamName
	 */
	function getCloudwatchLoggerConfig(streamName) {
		let cloudWatchConfig = {
			logGroupName: config.get('aws.cloudWatch.logGroupName'),
			logStreamName: streamName,
			createLogGroup: true,
			createLogStream: true,
			awsConfig: {
				accessKeyId: aws.accessKeyId,
				secretAccessKey: aws.secretAccessKey,
				region: aws.region
			},
			formatLog: function (item) {
				return item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
			}
		}
		return cloudWatchConfig;
	}

	// Construct loggers
	var consoleLogger = getConsoleLogger();
	var apiLogger = getLogger();
	var pnLogger = getLogger();
	var reviewLogger = getLogger();

	apiLogger.add(CloudWatchTransport, getCloudwatchLoggerConfig('shopflow-api'));
	reviewLogger.add(CloudWatchTransport, getCloudwatchLoggerConfig('review-server'));
	pnLogger.add(CloudWatchTransport, getCloudwatchLoggerConfig('pn-dispatcher'));

	exports.Logger = function () {

		this.API = 1;
		this.PN_DISPATCHER = 2;
		this.REVIEW_SERVER = 3;

		this.logData = {
			ip: null,
			uniqid: null,
			action: null,
			email: null,
			method: null,
			logType: this.API
		}

		/**
		 * Log message and given data
		 */
		this.writeLog = function (message = null, data = null) {

			var logger = apiLogger;
			if (isEmpty(process.env.NODE_ENV) || process.env.NODE_ENV === 'local') {
				// Do not push local env logs to cloudwatch
				logger = consoleLogger;
			} else if (this.logData.logType == this.PN_DISPATCHER) {
				logger = pnLogger;
			} else if (this.logData.logType == this.REVIEW_SERVER) {
				logger = reviewLogger;
			}

			var logEntry = this.logData.uniqid + '|' + this.logData.ip + '|' + this.logData.method +
				'|' + this.logData.action + '|' + this.logData.email + '|' + message + '|' + data + "\n"
			logger.log('info', logEntry);
		}
	}

})();
var cron = require('node-cron');
var pushNotification = require('./push-notification');
var config = require('config');

cron.schedule(config.get('pushNotificationDispathCronSchedule'), function() {
	pushNotification.pushNotificationDispatcher();
});
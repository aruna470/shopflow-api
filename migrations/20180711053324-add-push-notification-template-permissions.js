'use strict';

var async = require('async');
var config = require('config');
var dbm;
var type;
var seed;

var permissions = [];
var permissionIds = [];

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, cb) {
  async.waterfall([
    function (callback) {
      db.insert('permission', [
        {
          'name': 'push-notification-template.delete-shop',
          'description': 'Delete push notification template associated to a shop(s), own by the user',
          'category': 'PushNotificationTemplate'
        },
        {
          'name': 'push-notification-template.view-shop',
          'description': 'Get push notification template associated with the shop(s), own by the user',
          'category': 'PushNotificationTemplate'
        },
        {
          'name': 'push-notification-template.update-shop',
          'description': 'Update push notification template associated with the shop(s), own by the user',
          'category': 'PushNotificationTemplate'
        },
        {
          'name': 'push-notification-template.create-shop',
          'description': 'Create push notification template for a shop(s), own by the user',
          'category': 'PushNotificationTemplate'
        },
        {
          'name': 'push-notification-template.list-shop',
          'description': 'List push notifications associated to shop(s), own by the user',
          'category': 'PushNotificationTemplate'
        }
      ], function (err, res) {
        if (!err) {
          console.log(res.insertedCount + ' permission(s) created');
          permissions = res.ops;
          for (let i = 0; i < res.ops.length; i++) {
            permissions[res.ops[i].name] = res.ops[i];
          }
          callback(null);
        } else {
          callback(err, res);
        }
      })
    }, function (callback) {
      db._run('update', 'role', {
        query: {
          'name': config.get('shopOwnerRoleName')
        },
        update: {
          $push: {
            permissions: {
              $each: [
                permissions['push-notification-template.delete-shop']._id,
                permissions['push-notification-template.view-shop']._id,
                permissions['push-notification-template.update-shop']._id,
                permissions['push-notification-template.create-shop']._id,
                permissions['push-notification-template.list-shop']._id
              ]
            }
          }
        },
        options: {}
      },
        function (err, res) {
          if (!err) {
            console.log('Permission assigned to ' + config.get('shopOwnerRoleName') + ' role');
            callback(null);
          } else {
            callback(err, res);
          }
        }
      )
    }
  ], function (err, result) {
    cb(err, result);
  });
};

exports.down = function (db, cb) {
  async.waterfall([
    function (callback) {
      db._run('find', 'permission', {
        'name': {
          $in: [
            'push-notification-template.delete-shop', 
            'push-notification-template.view-shop',
            'push-notification-template.update-shop',
            'push-notification-template.create-shop',
            'push-notification-template.list-shop'
          ]
        }
      }, function (err, res) {
        if (!err) {
          for (let i = 0; i < res.length; i++) {
            permissionIds.push(res[i]._id);
          }
          return callback(null);
        } else {
          return cb(err, res);
        }
      });
    }, function (callback) {
      async.each(permissionIds, function (permissionId, callback) {

        db._run('remove', 'permission', { _id: permissionId },
          function (err, res) {
            if (!err) {
              console.log('Removed permission: ' + permissionId);
            }
            return callback(err);
          });
      }, function (err) {
        if (!err) {
          console.log('Removed permissions');
          return callback(null);
        } else {
          return cb(err, res);
        }
      });
    }, function (callback) {
      db._run('update', 'role', {
        query: { name: config.get('shopOwnerRoleName') },
        update: {
          $pull: {
            permissions: {
              $in: permissionIds
            }
          }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Removed permission from ' + config.get('shopOwnerRoleName') + ' role');
          return callback(null);
        } else {
          return cb(err, res);
        }
      });
    }
  ], function (err, res) {
    if (!err) {
    }
    return cb(err, res);
  });
};

exports._meta = {
  'version': 1
};
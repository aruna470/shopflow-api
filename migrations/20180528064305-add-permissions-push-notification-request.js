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
          'name': 'push-notification-request.list',
          'description': 'Get all push notification requests. Regardless of user or shop',
          'category': 'PushNotificationRequest'
        },
        {
          'name': 'push-notification-request.list-shop',
          'description': 'Get all push notification requests associated to shop(s), own by the user',
          'category': 'PushNotificationRequest'
        },
        {
          'name': 'push-notification-request.list-manage-shop',
          'description': 'Get all push notification requests associated to shop(s), manage by the user',
          'category': 'PushNotificationRequest'
        },
        {
          'name': 'push-notification-request.view',
          'description': 'Get single push notification request details, Regardless of user or shop',
          'category': 'PushNotificationRequest'
        },
        {
          'name': 'push-notification-request.view-shop',
          'description': 'Get single push notification request details associated to shop(s), own by the user',
          'category': 'PushNotificationRequest'
        },
        {
          'name': 'push-notification-request.view-manage-shop',
          'description': 'Get single push notification request details associated to shop(s), manage by the user',
          'category': 'PushNotificationRequest'
        },
        {
          'name': 'push-notification-request.delete',
          'description': 'Delete push notification request, Regardless of user or shop',
          'category': 'PushNotificationRequest'
        },
        {
          'name': 'push-notification-request.delete-shop',
          'description': 'Delete push notification request associated to shop(s), own by the user',
          'category': 'PushNotificationRequest'
        },
        {
          'name': 'push-notification-request.delete-manage-shop',
          'description': 'Delete push notification request associated to shop(s), manage by the user',
          'category': 'PushNotificationRequest'
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
          'name': config.get('superadminRoleName')
        },
        update: {
          $push: {
            permissions: {
              $each: [
                permissions['push-notification-request.list']._id,
                permissions['push-notification-request.view']._id,
                permissions['push-notification-request.delete']._id
              ]
            }
          }
        },
        options: {}
      },
        function (err, res) {
          if (!err) {
            console.log('Permission assigned to ' + config.get('superadminRoleName') + ' role');
            callback(null);
          } else {
            callback(err, res);
          }
        }
      )
    }, function (callback) {
      db._run('update', 'role', {
        query: {
          'name': config.get('shopOwnerRoleName')
        },
        update: {
          $push: {
            permissions: {
              $each: [
                permissions['push-notification-request.list-shop']._id,
                permissions['push-notification-request.view-shop']._id,
                permissions['push-notification-request.delete-shop']._id
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
    }, function (callback) {
      db._run('update', 'role', {
        query: {
          'name': config.get('areaManagerRoleName')
        },
        update: {
          $push: {
            permissions: {
              $each: [
                permissions['push-notification-request.list-manage-shop']._id,
                permissions['push-notification-request.view-manage-shop']._id,
                permissions['push-notification-request.delete-manage-shop']._id
              ]
            }
          }
        },
        options: {}
      },
        function (err, res) {
          if (!err) {
            console.log('Permission assigned to ' + config.get('areaManagerRoleName') + ' role');
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
            'push-notification-request.list', 
            'push-notification-request.list-shop',
            'push-notification-request.list-manage-shop',
            'push-notification-request.view',
            'push-notification-request.view-shop',
            'push-notification-request.view-manage-shop',
            'push-notification-request.delete',
            'push-notification-request.delete-shop',
            'push-notification-request.delete-manage-shop'
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
        query: { name: config.get('superadminRoleName') },
        update: {
          $pull: {
            permissions: {
              $in: permissionIds
            }
          }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Removed permissions from ' + config.get('superadminRoleName') + ' role');
          return callback(null);
        } else {
          return cb(err, res);
        }
      })
    }, function (callback) {
      db._run('update', 'role', {
        query: { name: config.get('areaManagerRoleName') },
        update: {
          $pull: {
            permissions: {
              $in: permissionIds
            }
          }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Removed permission from ' + config.get('areaManagerRoleName') + ' role');
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
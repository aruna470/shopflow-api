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
          'name': 'chat.send-to-shop',
          'description': 'Send chat message to the shop',
          'category': 'Chat'
        },
        {
          'name': 'chat.send-to-user',
          'description': 'Send chat message to user',
          'category': 'Chat'
        },
        {
          'name': 'chat.list-shop',
          'description': 'Get chat list of the user belongs to the shop(s) owns by the user',
          'category': 'Chat'
        },
        {
          'name': 'chat.list-own',
          'description': 'Get chat messages received by the user',
          'category': 'Chat'
        },
        {
          'name': 'chat.update',
          'description': 'Update specific chat',
          'category': 'Chat'
        },
        {
          'name': 'chat.buddies-shop',
          'description': 'Get users related to recent chat conversations',
          'category': 'Chat'
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
                permissions['chat.send-to-user']._id,
                permissions['chat.list-shop']._id,
                permissions['chat.update']._id,
                permissions['chat.buddies-shop']._id
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
          'name': config.get('carOwnerRoleName')
        },
        update: {
          $push: {
            permissions: {
              $each: [
                permissions['chat.send-to-shop']._id,
                permissions['chat.list-own']._id,
                permissions['chat.update']._id
              ]
            }
          }
        },
        options: {}
      },
        function (err, res) {
          if (!err) {
            console.log('Permission assigned to ' + config.get('carOwnerRoleName') + ' role');
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
            'chat.send-to-shop', 
            'chat.list-shop',
            'chat.send-to-user',
            'chat.list-own',
            'chat.update',
            'chat.buddies-shop'
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
    }, function (callback) {
      db._run('update', 'role', {
        query: { name: config.get('carOwnerRoleName') },
        update: {
          $pull: {
            permissions: {
              $in: permissionIds
            }
          }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Removed permission from ' + config.get('carOwnerRoleName') + ' role');
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
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
      db.insert('permission', [{
          'name': 'reward.view',
          'description': 'View rewards of any user',
          'category': 'Reward'
        },
        {
          'name': 'reward.view-shop',
          'description': 'View reward of user subscribed to a shop',
          'category': 'Reward'
        },
        {
          'name': 'reward.view-own',
          'description': 'View own reward',
          'category': 'Reward'
        },
        {
          'name': 'reward.list',
          'description': 'List rewards of any users',
          'category': 'Reward'
        },
        {
          'name': 'reward.list-shop',
          'description': 'List rewards of users subscribed to a shop',
          'category': 'Reward'
        },
        {
          'name': 'reward.list-own',
          'description': 'List own rewards',
          'category': 'Reward'
        },
        {
          'name': 'reward-transaction.add',
          'description': 'Add reward points to a user',
          'category': 'RewardTransaction'
        },
        {
          'name': 'reward-transaction.redeem',
          'description': 'Redeem reward points from a user',
          'category': 'RewardTransaction'
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
    },
    function (callback) {
      db._run('update', 'role', {
          query: {
            'name': config.get('shopOwnerRoleName')
          },
          update: {
            $push: {
              permissions: {
                $each: [
                  permissions['reward.list-shop']._id,
                  permissions['reward.view-shop']._id,
                  permissions['reward-transaction.add']._id,
                  permissions['reward-transaction.redeem']._id
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
    },
    function (callback) {
      db._run('update', 'role', {
          query: {
            'name': config.get('carOwnerRoleName')
          },
          update: {
            $push: {
              permissions: {
                $each: [
                  permissions['reward.list-own']._id,
                  permissions['reward.view-own']._id,
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
    },
    function (callback) {
      db._run('update', 'role', {
          query: {
            'name': config.get('superadminRoleName')
          },
          update: {
            $push: {
              permissions: {
                $each: [
                  permissions['reward.view']._id,
                  permissions['reward.list']._id
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
            'reward.view',
            'reward.view-shop',
            'reward.view-own',
            'reward.list',
            'reward.list-shop',
            'reward.list-own',
            'reward-transaction.add',
            'reward-transaction.redeem',
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
    },
    function (callback) {
      async.each(permissionIds, function (permissionId, callback) {

        db._run('remove', 'permission', {
            _id: permissionId
          },
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
    },
    function (callback) {
      db._run('update', 'role', {
        query: {
          name: config.get('superadminRoleName')
        },
        update: {
          $pull: {
            permissions: {
              $in: permissionIds
            }
          }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Removed permission from ' + config.get('superadminRoleName') + ' role');
          return callback(null);
        } else {
          return cb(err, res);
        }
      });
    },
    function (callback) {
      db._run('update', 'role', {
        query: {
          name: config.get('shopOwnerRoleName')
        },
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
    },
    function (callback) {
      db._run('update', 'role', {
        query: {
          name: config.get('carOwnerRoleName')
        },
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
    if (!err) {}
    return cb(err, res);
  });
};

exports._meta = {
  'version': 1
};
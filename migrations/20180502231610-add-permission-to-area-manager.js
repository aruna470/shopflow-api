'use strict';

var async = require('async');
var config = require('config');
var dbm;
var type;
var seed;

var permissions = [];

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
      db._run('find', 'permission', {
        'name': {
          $in: [
            'role.list',
            'user.list',
            'shop.delete-managed-shop',
            'shop.update-managed-shop'
          ]
        }
      }, function (err, res) {
        if (!err) {
          console.log(res);
          for (let i = 0; i < res.length; i++) {
            permissions.push(res[i]._id);
          }
          return callback(null);
        } else {
          return cb(err, res);
        }
      });
    },
    function (callback) {
      db._run('update', 'role', {
        query: {
          'name': config.get('areaManagerRoleName')
        },
        update: {
          $push: {
            permissions: {
              $each: permissions
            }
          }
        },
        options: {}
      },
        function (err, res) {
          if (!err) {
            console.log("Permission assigned to " + config.get('areaManagerRoleName') + " role");
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
            'role.list',
            'user.list',
            'shop.delete-managed-shop',
            'shop.update-managed-shop'
          ]
        }
      }, function (err, res) {
        if (!err) {
          for (let i = 0; i < res.length; i++) {
            permissions.push(res[i]._id);
          }
          return callback(null);
        } else {
          return cb(err, res);
        }
      });
    }, function (callback) {
      db._run('update', 'role', {
        query: { name: config.get('areaManagerRoleName') },
        update: {
          $pull: {
            permissions: {
              $in: permissions
            }
          }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Removed permissions from ' + config.get('areaManagerRoleName') + ' role');
        }
        return cb(err, res);
      })
    }
  ]);
};

exports._meta = {
  "version": 1
};
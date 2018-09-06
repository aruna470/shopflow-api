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
            'shop.list',
            'shop.view'
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
          'name': config.get('carOwnerRoleName')
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
            console.log("Permission assigned to " + config.get('carOwnerRoleName') + " role");
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
            'shop.list',
            'shop.view'
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
        query: { name: config.get('carOwnerRoleName') },
        update: {
          $pull: {
            permissions: {
              $in: permissions
            }
          }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Removed permissions from ' + config.get('carOwnerRoleName') + ' role');
        }
        return cb(err, res);
      })
    }
  ]);
};

exports._meta = {
  "version": 1
};
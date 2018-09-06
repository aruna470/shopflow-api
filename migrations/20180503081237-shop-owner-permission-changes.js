'use strict';

var async = require('async');
var config = require('config');
var dbm;
var type;
var seed;
var permissions = [];
var permissionsToRemove = [];

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
      db.insert('permission',
        [
          // Shop
          {
            "name": "shop.update-own",
            "description": "Update own shop",
            "category": "Shop"
          },
          {
            "name": "shop.delete-own",
            "description": "Delete own shop",
            "category": "Shop"
          },
        ], function (err, res) {
          if (!err) {
            console.log(res.insertedCount + " permission(s) created");
            permissions = res.ops;
            for (let i = 0; i < res.ops.length; i++) {
              permissions[res.ops[i].name] = res.ops[i];
            }
            return callback(null);
          } else {
            return cb(err, res);
          }
        })
    }, function (callback) {

      db._run('update', 'role', {
        query: { name: config.get('shopOwnerRoleName') },
        update: {
          $push: {
            permissions: {
              $each: [
                permissions['shop.update-own']._id,
                permissions['shop.delete-own']._id,
              ]
            }
          }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Updated ' + config.get('shopOwnerRoleName') + ' role with 3 new permissions');
          return callback(null);
        } else {
          return cb(err, res);
        }
      })
    }, function (callback) {
      db._run('find', 'permission', {
        'name': {
          $in: [
            'user.update',
            'shop.create-managed-shop',
            'shop.delete-managed-shop',
            'shop.update-managed-shop',
            'vehicle.list-managed-shop-vehicles',
            'vehicle.view-managed-shop-vehicle'
          ]
        }
      }, function (err, res) {
        if (!err) {
          for (let i = 0; i < res.length; i++) {
            permissionsToRemove.push(res[i]._id);
          }
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
              $in: permissionsToRemove
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

exports.down = function (db, cb) {
  async.waterfall([
    function (callback) {
      db._run('find', 'permission', {
        'name': {
          $in: [
            'shop.update-own',
            'shop.delete-own'
          ]
        }
      }, function (err, res) {
        if (!err) {
          for (let i = 0; i < res.length; i++) {
            permissionsToRemove.push(res[i]._id);
          }
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
              $in: permissionsToRemove
            }
          }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Removed permissions from ' + config.get('shopOwnerRoleName') + ' role');
        }
        return cb(err, res);
      })
    }
  ]);
};

exports._meta = {
  "version": 1
};

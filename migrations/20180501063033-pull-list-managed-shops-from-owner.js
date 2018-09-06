'use strict';

var dbm;
var type;
var seed;
var async = require('async');
var config = require('config');
var permissionId;

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
        'name': 'vehicle.list-managed-shop-vehicles'
      }, function (err, res) {
        if (!err) {
          permissionId = res[0]._id;
          return callback();
        } else {
          return cb(err, res);
        }
      });
    }, function () {
      db._run('update', 'role', {
        query: { name: config.get('shopOwnerRoleName') },
        update: {
          $pull: {
            permissions: permissionId
          }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Removed permission from ' + config.get('shopOwnerRoleName') + ' role');
        }
        return cb(err, res);
      });
    }
  ]);
};

exports.down = function (db, cb) {
  async.waterfall([
    function (callback) {
      db._run('find', 'permission', {
        'name': 'vehicle.list-managed-shop-vehicles'
      }, function (err, res) {
        if (!err) {
          permissionId = res[0]._id;
          return callback();
        } else {
          return cb(err, res);
        }
      });
    }, function () {
      db._run('update', 'role', {
        query: { name: config.get('shopOwnerRoleName') },
        update: {
          $push: { permissions: permissionId }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Updated ' + config.get('shopOwnerRoleName') + ' role with 1 new permissions');
        }
        return cb(err, res);
      })
    }
  ]);
};

exports._meta = {
  "version": 1
};

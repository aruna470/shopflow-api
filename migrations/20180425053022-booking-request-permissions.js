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
      db.insert('permission', [
        {
          'name': 'booking-request.create',
          'description': 'Create Booking request',
          'category': 'BookingRequest'
        },
        {
          'name': 'booking-request.delete',
          'description': 'Delete Booking request',
          'category': 'BookingRequest'
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
          'name': config.get('carOwnerRoleName')
        },
        update: {
          $push: {
            permissions: {
              $each: [
                permissions['booking-request.create']._id
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
    }, function (callback) {
      db._run('update', 'role', {
        query: {
          'name': config.get('superadminRoleName')
        },
        update: {
          $push: {
            permissions: {
              $each: [
                permissions['booking-request.delete']._id
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
  let pemissions = ['booking-request.create', 'booking-request.delete'];

  async.each(pemissions, function (permission, callback) {
    db._find('permission', { 'name': permission }, function (err, res) {
      if (res) {
        var id = res[0]._id;
        var options = {
          query: { 'name': config.get('carOwnerRoleName') },
          update: { $pull: { permissions: id } },
          options: {}
        };

        db._run('update', 'role', options, function (err, res) {
          if (!err) {
            console.log('Permission ' + permission + ' revoked from ' + config.get('carOwnerRoleName'));
            db._run('remove', 'permission', { 'name': permission }, function (err, res) {
              if (!err) {
                console.log('Permission ' + permission + ' removed');
                callback(null);
              } else {
                console.log('Permission ' + permission + ' remove failed');
                callback(err, res);
              }
            });
          } else {
            console.log('Permission ' + permission + ' revoked failed from ' + config.get('carOwnerRoleName'));
            callback(err, res);
          }
        });
      }
    });
  }, function (err, result) {
    cb(err, result);
  });
};

exports._meta = {
  'version': 1
};
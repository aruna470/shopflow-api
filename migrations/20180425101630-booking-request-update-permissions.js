'use strict';

var dbm;
var type;
var seed;
var async = require('async');
var config = require('config');
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
          'name': 'booking-request.update',
          'description': 'Update any booking request record',
          'category': 'BookingRequest'
        },
        {
          'name': 'booking-request.update-managed-shop',
          'description': 'Update booking request record belongs to shops managed by User',
          'category': 'BookingRequest'
        },
        {
          'name': 'booking-request.update-shop',
          'description': 'Update booking request record belongs to shops owned by User',
          'category': 'BookingRequest'
        },
        {
          'name': 'booking-request.update-own',
          'description': 'Update booking request record belongs to User',
          'category': 'BookingRequest'
        }
      ], function (err, res) {
        if (!err) {
          console.log(res.insertedCount + " permission(s) created");
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
        query: { name: config.get('areaManagerRoleName') },
        update: {
          $push: {
            permissions: {
              $each: [
                permissions['booking-request.update-managed-shop']._id,
                permissions['booking-request.update-shop']._id
              ]
            }
          }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Updated ' + config.get('areaManagerRoleName') + ' role with 4 new permissions');
          return callback(null);
        } else {
          return cb(err, res);
        }
      })
    }, function (callback) {
      db._run('update', 'role', {
        query: { name: config.get('superadminRoleName') },
        update: {
          $push: {
            permissions: {
              $each: [
                permissions['booking-request.update']._id
              ]
            }
          }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Updated ' + config.get('superadminRoleName') + ' role with 1 new permissions');
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
                permissions['booking-request.update-shop']._id
              ]
            }
          }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Updated ' + config.get('shopOwnerRoleName') + ' role with 1 new permissions');
          return callback(null);
        } else {
          return cb(err, res);
        }
      })
    }, function (callback) {
      db._run('update', 'role', {
        query: { name: config.get('carOwnerRoleName') },
        update: {
          $push: {
            permissions: {
              $each: [
                permissions['booking-request.update-own']._id
              ]
            }
          }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Updated ' + config.get('carOwnerRoleName') + ' role with 1 new permissions');
          return callback(null);
        } else {
          return cb(err, res);
        }
      })
    }
  ], function (err, res) {
    if (!err) {
    }
    return cb(err, res);
  });
};

exports.down = function (db, cb) {
  async.waterfall([
    function (callback) {
      db._run('find', 'permission', {
        'name': {
          $in: [
            'booking-request.update',
            'booking-request.update-managed-shop',
            'booking-request.update-shop',
            'booking-request.update-own'
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
          console.log('Removed permissions from ' + config.get('areaManagerRoleName') + ' role');
          return callback(null);
        } else {
          return cb(err, res);
        }
      })
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
          console.log('Removed permission from ' + config.get('superadminRoleName') + ' role');
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
  "version": 1
};

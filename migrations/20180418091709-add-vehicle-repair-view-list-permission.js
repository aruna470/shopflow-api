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
          'name': 'vehicle-repair-history.view',
          'description': 'View any vehicle repair history record',
          'category': 'VehicleRepairHistory'
        },
        {
          'name': 'vehicle-repair-history.view-managed-shop',
          'description': 'View vehicle repair history record belongs to shops managed by User',
          'category': 'VehicleRepairHistory'
        },
        {
          'name': 'vehicle-repair-history.view-shop',
          'description': 'View vehicle repair history record belongs to shops owned by User',
          'category': 'VehicleRepairHistory'
        },
        {
          'name': 'vehicle-repair-history.view-own',
          'description': 'View vehicle repair history record belongs to User',
          'category': 'VehicleRepairHistory'
        },
        {
          'name': 'vehicle-repair-history.list',
          'description': 'List vehicle repair history records',
          'category': 'VehicleRepairHistory'
        },
        {
          'name': 'vehicle-repair-history.list-managed-shop',
          'description': 'List vehicle repair history records belongs to shops managed by User',
          'category': 'VehicleRepairHistory'
        },
        {
          'name': 'vehicle-repair-history.list-shop',
          'description': 'List vehicle repair history records belongs to shops owned by User',
          'category': 'VehicleRepairHistory'
        },
        {
          'name': 'vehicle-repair-history.list-own',
          'description': 'List vehicle repair history records belongs to User',
          'category': 'VehicleRepairHistory'
        },
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
                permissions['vehicle-repair-history.view-managed-shop']._id,
                permissions['vehicle-repair-history.view-shop']._id,
                permissions['vehicle-repair-history.list-managed-shop']._id,
                permissions['vehicle-repair-history.list-shop']._id
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
                permissions['vehicle-repair-history.view']._id,
                permissions['vehicle-repair-history.list']._id
              ]
            }
          }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Updated ' + config.get('superadminRoleName') + ' role with 2 new permissions');
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
                permissions['vehicle-repair-history.view-shop']._id,
                permissions['vehicle-repair-history.list-shop']._id
              ]
            }
          }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Updated ' + config.get('shopOwnerRoleName') + ' role with 2 new permissions');
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
                permissions['vehicle-repair-history.view-own']._id,
                permissions['vehicle-repair-history.list-own']._id
              ]
            }
          }
        }
      }, function (err, res) {
        if (!err) {
          console.log('Updated ' + config.get('carOwnerRoleName') + ' role with 2 new permissions');
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
            'vehicle-repair-history.view',
            'vehicle-repair-history.view-managed-shop',
            'vehicle-repair-history.view-shop',
            'vehicle-repair-history.view-own',
            'vehicle-repair-history.list',
            'vehicle-repair-history.list-managed-shop',
            'vehicle-repair-history.list-shop',
            'vehicle-repair-history.list-own',
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

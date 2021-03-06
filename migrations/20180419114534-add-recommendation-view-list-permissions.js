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
          'name': 'vehicle-recommendation.view',
          'description': 'View any vehicle recommendation record',
          'category': 'VehicleRecommendation'
        },
        {
          'name': 'vehicle-recommendation.view-managed-shop',
          'description': 'View vehicle recommendation record belongs to shops managed by User',
          'category': 'VehicleRecommendation'
        },
        {
          'name': 'vehicle-recommendation.view-shop',
          'description': 'View vehicle recommendation record belongs to shops owned by User',
          'category': 'VehicleRecommendation'
        },
        {
          'name': 'vehicle-recommendation.view-own',
          'description': 'View vehicle recommendation record belongs to User',
          'category': 'VehicleRecommendation'
        },
        {
          'name': 'vehicle-recommendation.list',
          'description': 'List vehicle recommendation records',
          'category': 'VehicleRecommendation'
        },
        {
          'name': 'vehicle-recommendation.list-managed-shop',
          'description': 'List vehicle recommendation records belongs to shops managed by User',
          'category': 'VehicleRecommendation'
        },
        {
          'name': 'vehicle-recommendation.list-shop',
          'description': 'List vehicle recommendation records belongs to shops owned by User',
          'category': 'VehicleRecommendation'
        },
        {
          'name': 'vehicle-recommendation.list-own',
          'description': 'List vehicle recommendation records belongs to User',
          'category': 'VehicleRecommendation'
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
                permissions['vehicle-recommendation.view-managed-shop']._id,
                permissions['vehicle-recommendation.view-shop']._id,
                permissions['vehicle-recommendation.list-managed-shop']._id,
                permissions['vehicle-recommendation.list-shop']._id
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
                permissions['vehicle-recommendation.view']._id,
                permissions['vehicle-recommendation.list']._id
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
                permissions['vehicle-recommendation.view-shop']._id,
                permissions['vehicle-recommendation.list-shop']._id
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
                permissions['vehicle-recommendation.view-own']._id,
                permissions['vehicle-recommendation.list-own']._id
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
            'vehicle-recommendation.view',
            'vehicle-recommendation.view-managed-shop',
            'vehicle-recommendation.view-shop',
            'vehicle-recommendation.view-own',
            'vehicle-recommendation.list',
            'vehicle-recommendation.list-managed-shop',
            'vehicle-recommendation.list-shop',
            'vehicle-recommendation.list-own',
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

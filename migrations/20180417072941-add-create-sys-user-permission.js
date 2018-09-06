'use strict';

var dbm;
var type;
var seed;
var async = require('async');
var config = require('config');
var createSysUserPermission;

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
      db.insert('permission', {
        'name': 'user.create-sys-user',
        'description': 'Create system user',
        'category': 'User'
      }, function (err, res) {
        if (!err) {
          console.log('user.create-sys-user permission created');
          createSysUserPermission = res.ops[0]._id;
          return callback(null);
        } else {
          return cb(err, res);
        }
      })
    }, function (callback) {
      console.log(createSysUserPermission);
      db._run('update', 'role', {
        query: { name: config.get('areaManagerRoleName') },
        update: { $push: { 'permissions': createSysUserPermission } }
      }, function (err, res) {
        if (!err) {
          console.log('Updated ' + config.get('areaManagerRoleName') + ' role with user.create-sys-user permission');
          db._run('update', 'role', {
            query: { name: config.get('superadminRoleName') },
            update: { $push: { 'permissions': createSysUserPermission } }
          }, function (err, res) {
            if (!err) {
              console.log('Updated ' + config.get('superadminRoleName') + ' role with user.create-sys-user permission');
              return callback(null);
            } else {
              return cb(err, res);
            }
          })
        } else {
          return cb(err, res);
        }
      })
    }
  ], function (err, res) {
    if (!err) {
      console.log(res);
    }
    return cb(err, res);
  });
};

exports.down = function (db, cb) {
  async.waterfall([
    function (callback) {
      db._run('find', 'permission', {
        'name': 'user.create-sys-user'
      }, function (err, res) {
        if (!err) {
          createSysUserPermission = res[0]._id;
          db._run('remove', 'permission', {
            '_id': createSysUserPermission
          }, function (err, res) {
            if (!err) {
              console.log('Removed user.create-sys-user permission');
              return callback(null);
            } else {
              return cb(err, res);
            }
          })
        } else {
          return cb(err, res);
        }
      })
    }, function (callback) {
      db._run('update', 'role', {
        query: { name: config.get('areaManagerRoleName') },
        update: { $pull: { 'permissions': createSysUserPermission } }
      }, function (err, res) {
        if (!err) {
          console.log('Removed user.create-sys-user permission from ' + config.get('areaManagerRoleName') + ' role');
          db._run('update', 'role', {
            query: { name: config.get('superadminRoleName') },
            update: { $pull: { 'permissions': createSysUserPermission } }
          }, function (err, res) {
            if (!err) {
              console.log('Removed user.create-sys-user permission from ' + config.get('superadminRoleName') + ' role');
              return callback(null);
            } else {
              return cb(err, res);
            }
          })
        } else {
          return cb(err, res);
        }
      })
    }
  ], function (err, res) {
    if (!err) {
      console.log(res);
    }
    return cb(err, res);
  });
};

exports._meta = {
  'version': 1
};

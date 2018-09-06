'use strict';

var async = require('async');
var dbm;
var type;
var seed;

var permissions = [];
var roles = [];

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function(db, cb) {
    async.waterfall([
        function(callback) {
            db.insert('permission', [
                {
                    "name": "vehicle-repair-history.sync-histories",
                    "description": "Sync vehicle repair histories",
                    "category": "VehicleRepairHistory"
                },
                {
                    "name": "vehicle-repair-history.delete",
                    "description": "Delete vehicle repair history",
                    "category": "VehicleRepairHistory"
                }
            ], function(err, res) {
                if (!err) {
                    console.log(res.insertedCount + " permission(s) created");
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
        function(callback) {
            db._run('update', 'role', {
                    query: {
                        'name': 'SyncTool'
                    },
                    update: {
                        $push: {
                            permissions: {
                                $each: [
                                    permissions['vehicle-repair-history.sync-histories']._id,
                                    permissions['vehicle-repair-history.delete']._id
                                ]
                            }
                        }
                    },
                    options: {}
                },
                function(err, res) {
                    if (!err) {
                        console.log("Permission assigned to SyncTool role");
                        callback(null);
                    } else {
                        callback(err, res);
                    }
                }
            )
        }
    ], function(err, result) {
        cb(err, result);
    });
};

exports.down = function(db, cb) {
    let pemissions = ['vehicle-repair-history.sync-histories', 'vehicle-repair-history.delete'];

    async.each(pemissions, function (permission, callback) {
        db._find('permission', {'name': permission}, function(err, res) {
            if (res) {
                var id = res[0]._id;
                var options = {
                    query: {'name': 'SyncTool'},
                    update: {$pull: {permissions: id}},
                    options: {}
                };

                db._run('update', 'role', options, function(err, res) {
                    if (!err) {
                        console.log("Permission " + permission + " revoked from SyncTool");
                        db._run('remove', 'permission', {'name': permission}, function(err, res) {
                            if (!err) {
                                console.log("Permission " + permission + " removed");
                                callback(null);
                            } else {
                                console.log("Permission " + permission + " remove failed");
                                callback(err, res);
                            }
                        });
                    } else {
                        console.log("Permission " + permission + " revoked failed from SyncTool");
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
    "version": 1
};
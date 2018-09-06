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
                    "name": "vehicle-recommendation.sync-recommendations",
                    "description": "Sync vehicle recommendations",
                    "category": "VehicleRecommendations"
                },
                {
                    "name": "vehicle-recommendation.delete",
                    "description": "Delete vehicle recommendation",
                    "category": "VehicleRecommendations"
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
                        'name': config.get('syncToolRoleName')
                    },
                    update: {
                        $push: {
                            permissions: {
                                $each: [
                                    permissions['vehicle-recommendation.sync-recommendations']._id,
                                    permissions['vehicle-recommendation.delete']._id
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
    let pemissions = ['vehicle-recommendation.sync-recommendations', 'vehicle-recommendation.delete'];

    async.each(pemissions, function (permission, callback) {
        db._find('permission', {'name': permission}, function(err, res) {
            if (res) {
                var id = res[0]._id;
                var options = {
                    query: {'name': config.get('syncToolRoleName')},
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
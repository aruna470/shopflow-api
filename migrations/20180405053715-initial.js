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
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, cb) {
  async.waterfall([
    function (callback) {
      db.createCollection('role', function (err, res) {
        if (err) throw err;
        console.log("Collection Role has been created");
      }),
        db.createCollection('permission', function (err, res) {
          if (err) throw err;
          console.log("Collection Permission has been created");
        })
      db.createCollection('user', function (err, res) {
        if (err) throw err;
        console.log("Collection User has been created");
        return callback(null);
      })
    }, function (callback) {
      db.insert('permission',
        [
          // Permission
          {
            "name": "role.update",
            "description": "Update role",
            "category": "Role"
          },
          {
            "name": "role.list",
            "description": "List roles",
            "category": "Role"
          },
          {
            "name": "role.view",
            "description": "View role",
            "category": "Role"
          },
          {
            "name": "role.delete",
            "description": "Delete role",
            "category": "Role"
          },
          {
            "name": "role.create",
            "description": "Creat role",
            "category": "Role"
          },
          {
            "name": "permission.create",
            "description": "Create permission",
            "category": "Permission"
          },
          {
            "name": "permission.list",
            "description": "List permissions",
            "category": "Permission"
          },
          {
            "name": "permission.view",
            "description": "View permission",
            "category": "Permission"
          },
          {
            "name": "permission.update",
            "description": "Update permission",
            "category": "Permission"
          },
          {
            "name": "permission.delete",
            "description": "Delete permission",
            "category": "Permission"
          },

          // User
          {
            "name": "user.delete",
            "description": "Delete user",
            "category": "User"
          },
          {
            "name": "user.list",
            "description": "List users",
            "category": "User"
          },
          {
            "name": "user.view",
            "description": "View user",
            "category": "User"
          },
          {
            "name": "user.update",
            "description": "Update user",
            "category": "User"
          },
          {
            "name": "user.get-sync-tool-user-keys",
            "description": "Generate API keys for sync tool user",
            "category": "User"
          },
          {
            "name": "user.sync-m1-users",
            "description": "Sync Mitchelle 1 users",
            "category": "User"
          },

          // Shop
          {
            "name": "shop.create",
            "description": "Create shop",
            "category": "Shop"
          },
          {
            "name": "shop.update",
            "description": "Update shop",
            "category": "Shop"
          },
          {
            "name": "shop.list",
            "description": "List shops",
            "category": "Shop"
          },
          {
            "name": "shop.view",
            "description": "View shop",
            "category": "Shop"
          },
          {
            "name": "shop.delete",
            "description": "Delete shop",
            "category": "Shop"
          },
          {
            "name": "shop.create-managed-shop",
            "description": "Create Managed shop",
            "category": "Shop"
          },
          {
            "name": "shop.update-managed-shop",
            "description": "Update User Managed Shop",
            "category": "Shop"
          },
          {
            "name": "shop.delete-managed-shop",
            "description": "Delete User Managed Shop",
            "category": "Shop"
          },
          {
            "name": "shop.assign-owner",
            "description": "Assign owner to a shop",
            "category": "Shop"
          },

          // CarOwnerSubscription
          {
            "name": "car-owner-subscription.create",
            "description": "Create CarOwnerSubscription",
            "category": "CarOwnerSubscription"
          },
          {
            "name": "car-owner-subscription.update",
            "description": "Update CarOwnerSubscription",
            "category": "CarOwnerSubscription"
          },
          {
            "name": "car-owner-subscription.list",
            "description": "List CarOwnerSubscription",
            "category": "CarOwnerSubscription"
          },
          {
            "name": "car-owner-subscription.view",
            "description": "View CarOwnerSubscription",
            "category": "CarOwnerSubscription"
          },
          {
            "name": "car-owner-subscription.delete",
            "description": "Delete CarOwnerSubscription",
            "category": "CarOwnerSubscription"
          },

          // ShopInvite
          {
            "name": "shop-invite.create",
            "description": "Create shop invitation",
            "category": "ShopInvite"
          },

          // PushNotification Info
          {
            "name": "push-notification-info.view",
            "description": "View push notifications",
            "category": "PushNotification"
          },

          {
            "name": "push-notification-info.list",
            "description": "List push notifications",
            "category": "PushNotification"
          },

          {
            "name": "push-notification-info.delete",
            "description": "Delete push notification",
            "category": "PushNotification"
          },

          {
            "name": "push-notification-info.msg-count",
            "description": "Get message counts",
            "category": "PushNotification"
          },

          {
            "name": "push-notification-info.mark-as-read",
            "description": "Mark message as read",
            "category": "PushNotification"
          },


          // PushNotificationRequest
          {
            "name": "push-notification-request.create",
            "description": "Create push notification request",
            "category": "PushNotificationRequest"
          },

          // Vehicle
          {
            "name": "vehicle.sync-vehicles",
            "description": "Sync vehicle records",
            "category": "Vehicle"
          },
          {
            "name": "vehicle.delete",
            "description": "Delete vehicle records",
            "category": "Vehicle"
          },
          {
            "name": "vehicle.list",
            "description": "List vehicle records",
            "category": "Vehicle"
          },
          {
            "name": "vehicle.list-managed-shop-vehicles",
            "description": "List vehicle records belongs to user managed shops",
            "category": "Vehicle"
          },
          {
            "name": "vehicle.list-shop-vehicles",
            "description": "List vehicle records belongs to shop",
            "category": "Vehicle"
          },
          {
            "name": "vehicle.list-own",
            "description": "List own vehicle records",
            "category": "Vehicle"
          },
          {
            "name": "vehicle.view",
            "description": "View vehicle record",
            "category": "Vehicle"
          },
          {
            "name": "vehicle.view-managed-shop-vehicle",
            "description": "View vehicle record belongs to user managed shop",
            "category": "Vehicle"
          },
          {
            "name": "vehicle.view-shop-vehicle",
            "description": "View vehicle record belongs to shop",
            "category": "Vehicle"
          },
          {
            "name": "vehicle.view-own",
            "description": "View own vehicle record",
            "category": "Vehicle"
          },
          // GoogleReviewInvite
          {
            "name": "google-review-invite.create",
            "description": "Create google review invitation",
            "category": "GoogleReviewInvite"
          }
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

      db.insert('role', [
        // Super admin role
        {
          "name": "Superadmin",
          "description": "Super administrator",
          "isDefault": 1,
          "permissions": [
            permissions['role.create']._id,
            permissions['role.update']._id,
            permissions['role.list']._id,
            permissions['role.view']._id,
            permissions['role.delete']._id,
            permissions['permission.create']._id,
            permissions['permission.list']._id,
            permissions['permission.view']._id,
            permissions['permission.update']._id,
            permissions['permission.delete']._id,
            permissions['user.delete']._id,
            permissions['user.list']._id,
            permissions['user.view']._id,
            permissions['user.update']._id,
            permissions['shop.create']._id,
            permissions['shop.update']._id,
            permissions['shop.list']._id,
            permissions['shop.view']._id,
            permissions['shop.delete']._id,
            permissions['shop-invite.create']._id,
            permissions['push-notification-request.create']._id,
            permissions['push-notification-info.list']._id,
            permissions['push-notification-info.view']._id,
            permissions['push-notification-info.msg-count']._id,
            permissions['push-notification-info.mark-as-read']._id,
            permissions['push-notification-info.delete']._id,
            permissions['car-owner-subscription.create']._id,
            permissions['car-owner-subscription.update']._id,
            permissions['car-owner-subscription.list']._id,
            permissions['car-owner-subscription.view']._id,
            permissions['car-owner-subscription.delete']._id,
            permissions['vehicle.delete']._id,
            permissions['vehicle.list']._id,
            permissions['vehicle.view']._id
          ]
        },
        // Shop owner role
        {
          "name": "ShopOwner",
          "description": "Shop owner",
          "isDefault": 1,
          "permissions": [
            permissions['user.list']._id,
            permissions['user.view']._id,
            permissions['user.update']._id,
            permissions['user.get-sync-tool-user-keys']._id,
            permissions['shop.list']._id,
            permissions['shop.view']._id,
            permissions['shop.create-managed-shop']._id,
            permissions['shop.update-managed-shop']._id,
            permissions['shop.delete-managed-shop']._id,
            permissions['shop-invite.create']._id,
            permissions['push-notification-request.create']._id,
            permissions['car-owner-subscription.create']._id,
            permissions['car-owner-subscription.update']._id,
            permissions['car-owner-subscription.list']._id,
            permissions['car-owner-subscription.view']._id,
            permissions['car-owner-subscription.delete']._id,
            permissions['vehicle.list-managed-shop-vehicles']._id,
            permissions['vehicle.list-shop-vehicles']._id,
            permissions['vehicle.view-managed-shop-vehicle']._id,
            permissions['vehicle.view-shop-vehicle']._id
          ]
        },
        // Car owner role
        {
          "name": "CarOwner",
          "description": "Car owner",
          "isDefault": 1,
          "permissions": [
            permissions['user.view']._id,
            permissions['user.update']._id,
            permissions['push-notification-info.list']._id,
            permissions['push-notification-info.view']._id,
            permissions['push-notification-info.msg-count']._id,
            permissions['push-notification-info.mark-as-read']._id,
            permissions['push-notification-info.delete']._id,
            permissions['car-owner-subscription.create']._id,
            permissions['car-owner-subscription.update']._id,
            permissions['car-owner-subscription.list']._id,
            permissions['car-owner-subscription.view']._id,
            permissions['car-owner-subscription.delete']._id,
            permissions['vehicle.list-own']._id,
            permissions['vehicle.view-own']._id
          ]
        },
        // Sync tool user role
        {
          "name": "SyncTool",
          "description": "Sync tool user",
          "isDefault": 1,
          "permissions": [
            permissions['user.sync-m1-users']._id,
            permissions['vehicle.sync-vehicles']._id
          ]
        },
        // Area manager user role
        {
          "name": "AreaManager",
          "description": "Shop Area Manager",
          "isDefault": 1,
          "permissions": [
            permissions['shop.list']._id,
            permissions['shop.view']._id,
            permissions['shop.create-managed-shop']._id,
            permissions['shop.update-managed-shop']._id,
            permissions['shop.delete-managed-shop']._id,
            permissions['push-notification-request.create']._id,
            permissions['car-owner-subscription.create']._id,
            permissions['car-owner-subscription.update']._id,
            permissions['car-owner-subscription.list']._id,
            permissions['car-owner-subscription.view']._id,
            permissions['car-owner-subscription.delete']._id,
            permissions['vehicle.list-managed-shop-vehicles']._id,
            permissions['vehicle.list-shop-vehicles']._id,
            permissions['vehicle.view-managed-shop-vehicle']._id,
            permissions['vehicle.view-shop-vehicle']._id
          ]
        }], function (err, res) {
          if (!err) {
            console.log(res.insertedCount + " roles(s) created");
            roles = res.ops;
            for (let i = 0; i < res.ops.length; i++) {
              roles[res.ops[i].name] = res.ops[i];
            }
            return callback(null);
          } else {
            return cb(err, res);
          }
        })
    }, function (callback) {
      // Super admdin account
      // Password is $uperadm!n@sf
      db.insert('user', {
        "firstName": "Super",
        "lastName": "Administrator",
        "userType": 1,
        "sysEmail": "super@gmail.com",
        "password": "$2a$05$XJ5j/HsgwKiuS1/qYmhmU..sq3l4ceVkJYhBGDtITTcoPcjDBBBA2",
        "roleId": roles['Superadmin']._id,
        "status": 1,
        "isEmailVerified": 1,
        "mobile": "773959699",
        "gender": 1
      }, callback);
    }
  ], function (err, res) {
    if (!err) {
      console.log(res.insertedCount + " user(s) created");
      roles = res.ops;
    }
    return cb(err, res);
  });
};

exports.down = function (db, callback) {
  async.series([
    db.dropTable.bind(db, 'permission'),
    db.dropTable.bind(db, 'role'),
    db.dropTable.bind(db, 'user')
  ], callback);
};

exports._meta = {
  "version": 1
};

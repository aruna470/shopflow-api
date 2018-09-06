/************ User Object *********/

/**
 * @api {user-object} {} User Object
 * @apiDescription User object attributes.
 * @apiName UserObject
 * @apiGroup Objects
 *
 * @apiParam {Number} userType 1 - System user, 2 - Normal user.
 * @apiParam {String{30}} [firstName] Firstname of the user.
 * @apiParam {String{60}} [lastName] Lastname of the user.
 * @apiParam {String{150}} [email] User email. If user type is 2 then this attribute is mandatory. Unique
 * @apiParam {String} password User password, SHA1 encrypted password.
 * @apiParam {String{150}} [sysEmail] Email for system users. If user type is 1 then this attribute is mandatory. Unique
 * @apiParam {String} [timezone] User timezone. Default Asia/Colombo. Use https://momentjs.com/timezone/ to pick timezone
 * @apiParam {String} [roleId] Role id of the user.
 * @apiParam {Number} [status] 1 - Active, 2 - Inactive.
 * @apiParam {String{30}} [mobile] User mobile number.
 * @apiParam {Number} [gender] 1 - Male, 2 - Female. Default 1
 * @apiParam {Date} [lastAccess] Last access date & time in UTC.
 * @apiParam {Date} [createdAt] Record created date & time in UTC.
 * @apiParam {Date} [updatedAt] Record updated date & time in UTC.
 * @apiParam {Object} [createdBy] Partial user object of the record creator.
 * @apiParam {Object} [updatedBy] Partial user object of the record updator.
 * @apiParam {String} [accessToken] Json Web Token.
 * @apiParam {String} [oldPassword] Old password.
 * @apiParam {String} [newPassword] New password.
 * @apiParam {Number} [isM1SyncedUser] Whether M1 Synced user. 1 - Yes, 0 - No
 * @apiParam {ObjectId} [shopId] Shop id user associates. This is only for system users(shop owners, system users)
 * @apiParam {String} [homePhone] User's home phone number. This is available only for users synced from M1.
 */


/************ Permission Object *********/

/**
 * @api {permission-object} {} Permission Object
 * @apiDescription Permission object attributes.
 * @apiName PermissionObject
 * @apiGroup Objects
 *
 * @apiParam {String} name Permission name. Ex:user.create, user.update. unique
 * @apiParam {String} [category] Permission category.
 * @apiParam {String} [description] Description of the permission.
 * @apiParam {Date} [createdAt] Record created date & time in UTC.
 * @apiParam {Date} [updatedAt] Record updated date & time in UTC.
 * @apiParam {Object} [createdBy] Partial user object of the record creator.
 * @apiParam {Object} [updatedBy] Partial user object of the record updator.
 */

/************ Role Object *********/

/**
 * @api {role-object} {} Role Object
 * @apiDescription Role object attributes.
 * @apiName RoleObject
 * @apiGroup Objects
 *
 * @apiParam {String} name Role name. unique
 * @apiParam {String} [description] Role description.
 * @apiParam {String[]} [permissions] Array of permission Ids or Objects.
 * @apiParam {Date} [createdAt] Record created date & time in UTC.
 * @apiParam {Date} [updatedAt] Record updated date & time in UTC.
 * @apiParam {Object} [createdBy] Partial user object of the record creator.
 * @apiParam {Object} [updatedBy] Partial user object of the record updator.
 */

/************ MockUser Object *********/

/**
 * @api {mock-user-object} {} Mock User Object
 * @apiDescription Mock User object attributes.
 * @apiName MockUserObject
 * @apiGroup Objects
 *
 * @apiParam {String} firstname First name
 * @apiParam {String} lastName Last name.
 * @apiParam {email} email address.
 */


/************ Shop Object *********/

/**
 * @api {shop-object} {} Shop Object
 * @apiDescription Shop object attributes.
 * @apiName ShopObject
 * @apiGroup Objects
 *
 * @apiParam {ObjectId} id Object id.
 * @apiParam {String{150}} brandName Brand name of the shop.
 * @apiParam {String{150}} businessName Business name of the shop.
 * @apiParam {String{60}} registrationNumber Shop registration number.
 * @apiParam {String} streetName Street name
 * @apiParam {String{100}} city City
 * @apiParam {String{100}} state State
 * @apiParam {Number{15}} zip ZIP code.
 * @apiParam {String{30}} phoneNumber Shop phone number
 * @apiParam {String{30}} [faxNumber] Shop fax number
 * @apiParam {String{100}} email Shop email.
 * @apiParam {String{100}} gmail Shop gmail.
 * @apiParam {String} [googlePlusPageUrl] Google+ page URL
 * @apiParam {String} [facebookPageUrl] Facebook page URL.
 * @apiParam {String} [twitterPageUrl] Twitter page URL.
 * @apiParam {String} [instagramPageUrl] Instagram page URL.
 * @apiParam {String} [logoName] business logo Unique identifier which was returned from S3 upload.
 * @apiParam {String} [bannerName] business banner Unique identifier which was returned from S3 upload.
 * @apiParam {Object} [shopOwner] owner of the shop.
 * @apiParam {Object} [createdBy] Partial user object of the record creator.
 * @apiParam {Object} [updatedBy] Partial user object of the record updator.
 * @apiParam {Object} [subscriptionStatus] User,s subscriptions status to the shop. 0 - Pending, 1 - Accepted, 2 - Rejected, 3 - Unsubscribed, -1 - No subscription
 * @apiParam {Number[]} [businessDays] Business operational days as integer array. 1-Sunday, 7-Saturday
 * @apiParam {String} [geoLocation] Comma seperated geo coordinates of the shop location latitude,longitude. Ex:6.925438417003826,79.88441728588873
 * @apiParam {Object} [businessHours] as digital time without colon ';' 
 * <br/> Example: <br/>
 * "businessHours": { <br/>
 * "openTime": 900, <br/>
 * "closeTime": 1800 <br/>
 * @apiParam {Object} [shopManager] Shop manager details in following format' 
 * <br/> Example: <br/>
 * "shopManager": { <br/>
 * "name": "John Mathews", <br/>
 * "email": "jmathews@sf.com", <br/>
 * "phone": 1800 <br/>
 * },
 */

 /************ DeviceInfo Object *********/

/**
 * @api {shop-object} {} DeviceInfo Object
 * @apiDescription DeviceInfo object attributes.
 * @apiName DeviceInfoObject
 * @apiGroup Objects
 *
 * @apiParam {ObjectId} id Object id.
 * @apiParam {String{150}} token Unique device token
 * @apiParam {String{500}} endpointArn device endpoint arn
 * @apiParam {Number} deviceType 1 - Android, 2 - iOS.
 * @apiParam {ObjectId} [userId] car owner's userId.
 * @apiParam {Date} [createdAt] Record created date & time in UTC.
 * @apiParam {Date} [updatedAt] Record updated date & time in UTC.
 */

/************ Shop Invite Object *********/

/**
 * @api {shop-object} {} Shop Invite Object
 * @apiDescription Shop Invite object attributes.
 * @apiName ShopInviteObject
 * @apiGroup Objects
 *
 * @apiParam {String} id Object id.
 * @apiParam {String{100}} email User email.
 * @apiParam {Object} shopId.
 * @apiParam {Date} [createdAt] Record created date & time in UTC.
 * @apiParam {Date} [updatedAt] Record updated date & time in UTC.
 * @apiParam {Object} [createdBy] Partial user object of the record creator.
 * @apiParam {Object} [updatedBy] Partial user object of the record updator.
 */

/************ Push Notification Info Object *********/

/**
 * @api {push-notification-info} {} Push Notification Info Object
 * @apiDescription Push Notification Info object attributes.
 * @apiName PushNotificationInfoObject
 * @apiGroup Objects
 *
 * @apiParam {String} id Object id.
 * @apiParam {Number} status Message status. 1 - pending, 2 - delivered, 3 - failed
 * @apiParam {String} userId Id of the user
 * @apiParam {String} text Notification message
 * @apiParam {String} title Notification title
 * @apiParam {String} token Device token
 * @apiParam {String} shopId Id of the shop
 * @apiParam {Date} [createdAt] Record created date & time in UTC.
 */

/************ CarOwnerSubscription Object *********/

/**
 * @api {shop-object} {} CarOwnerSubscription Object
 * @apiDescription CarOwnerSubscription object attributes.
 * @apiName CarOwnerSubscriptionObject
 * @apiGroup Objects
 *
 * @apiParam {ObjectId} id Object id.
 * @apiParam {Number} [status] 0 - Pending, 1 - Accepted, 2 - Rejected, 3 - Unsubscribed, 4 - Synced
 * @apiParam {Object} user Partial user object.
 * @apiParam {Object} shop Partial shop object.
 * @apiParam {Date} [createdAt] Record created date & time in UTC.
 * @apiParam {Date} [updatedAt] Record updated date & time in UTC.
 * @apiParam {Object} [createdBy] Partial user object of the record creator.
 * @apiParam {Object} [updatedBy] Partial user object of the record updator.
 */

/************ Push Notification Request Object *********/

/**
 * @api {push-notification-request-object} {} Push Notification Request Object
 * @apiDescription Push notification request object attributes.
 * @apiName PushNotificationRequestObject
 * @apiGroup Objects
 *
 * @apiParam {Object} id Object id.
 * @apiParam {ObjectId} [shopId] Request making shop id. This is not necessary when super admin making a request.
 * @apiParam {String[]} [shopIds] Array of shop ids. If this is set, it will send push notifications to entire users in that shop.
 * Either shopIds or users param need to be present.
 * @apiParam {String[]} [users] Array of user ids. Either shopIds or users param need to be present.
 * @apiParam {String} text Notification message
 * @apiParam {String} [title] Notification title. Default title is set to ShopFlow
 * @apiParam {Date} [createdAt] Record created date & time in UTC.
 * @apiParam {Date} [updatedAt] Record updated date & time in UTC.
 * @apiParam {Object} [createdBy] Partial user object of the record creator.
 * @apiParam {Object} [updatedBy] Partial user object of the record updator.
 */

/************ Vehicle Object *********/

/**
 * @api {vehicle-object} {} Vehicle Object
 * @apiDescription Vehicle object attributes.
 * @apiName VehicleObject
 * @apiGroup Objects
 *
 * @apiParam {ObjectId} id Object id.
 * @apiParam {ObjectId} [shopId] Shop id
 * @apiParam {ObjectId} [userId] User object id
 * @apiParam {String} [make] Vehicle make
 * @apiParam {String} [licenseNumber] Vehicle license number
 * @apiParam {Number} [year] Vehicle manufactured year
 * @apiParam {String} [name] Vehicle name
 * @apiParam {String} [model] Vehicle modle name
 * @apiParam {Number} [vehicleId] Vehicle id as in M1 DB
 * @apiParam {String} [custEmail] Associated customer email address
 * @apiParam {Number} [odometer] Vehicle odometer
 * @apiParam {Date} [inspDate] Inspect date
 * @apiParam {Date} [lastInDate] Last inspect date
 * @apiParam {Date} [mfgDate] Vehicle manufactured date
 * @apiParam {Date} [createdAt] Record created date & time in UTC.
 * @apiParam {Date} [updatedAt] Record updated date & time in UTC.
 */

/************ Vehicle Repair History Object *********/

/**
 * @api {vehicle-repair-history-object} {} VehicleRepairHistory Object
 * @apiDescription Vehicle repair history object attributes.
 * @apiName VehicleRepairHistoryObject
 * @apiGroup Objects
 *
 * @apiParam {ObjectId} id Object id.
 * @apiParam {ObjectId} [vehicleId] Vehicle object id
 * @apiParam {ObjectId} [userId] User object id
 * @apiParam {ObjectId} [shopId] Shop object id
 * @apiParam {Number} [m1VehicleId] Vehicle id as in M1 DB
 * @apiParam {Number} [repairOrderId] Repair order
 * @apiParam {Number} [lineItemId] Line item
 * @apiParam {Number} [invoiceNo] Invoice number 
 * @apiParam {Date} [dateOfService] Last service date
 * @apiParam {Number} [odometer] Odometer reading at the service
 * @apiParam {String} [description] Service description
 * @apiParam {Date} [createdAt] Record created date & time in UTC.
 */

/************ Vehicle Recommedation Object *********/

/**
 * @api {vehicle-recommedation-object} {} VehicleRecommedation Object
 * @apiDescription Vehicle recommedation object attributes.
 * @apiName VehicleRecommedationObject
 * @apiGroup Objects
 *
 * @apiParam {ObjectId} id Object id.
 * @apiParam {String} [action] Action. A-New record, U-Modified record, D-deleted record
 * @apiParam {ObjectId} [vehicleId] Vehicle object id
 * @apiParam {ObjectId} [userId] User object id
 * @apiParam {ObjectId} [shopId] Shop object id
 * @apiParam {Number} [m1VehicleId] Vehicle id as in M1 DB
 * @apiParam {Number} [recommendationId] Recommendation id as in M1 DB
 * @apiParam {Date} [recommendDate] Recommend date
 * @apiParam {String} [description] Service description
 * @apiParam {Number} [isNotified] Whether push notification sent or not. 0 - No, 1 - Yes
 * @apiParam {Date} [createdAt] Record created date & time in UTC.
 */

/************ Booking Request Object *********/

/**
 * @api {booking-request-object} {} BookingRequest Object
 * @apiDescription booking request object attributes.
 * @apiName BookingRequestObject
 * @apiGroup Objects
 *
 * @apiParam {ObjectId} id Object id.
 * @apiParam {ObjectId} userId User object id
 * @apiParam {ObjectId} shopId Shop object id
 * @apiParam {ObjectId} vehicleId Vehicle object id
 * @apiParam {Date} bookingDateTime Preferred booking date
 * @apiParam {String} [message] Booking Request message
 * @apiParam {Number} [status] 0 - Pending, 1 - Accepted, 2 - Rejected, 3- Cancelled
 * @apiParam {Number} [isNotified] Whether booking request notified to shop manager. 0 - No, 1 - Yes
 * @apiParam {String} [reply] Shop owner's replay on booking request
 * @apiParam {Date} [createdAt] Record created date & time in UTC.
 * @apiParam {Date} [updatedAt] Record updated date & time in UTC.
 * @apiParam {Object} [createdBy] Partial user object of the record creator.
 * @apiParam {Object} [updatedBy] Partial user object of the record updator.
 */

/************ Chat Object *********/

/**
 * @api {chat-object} {} Chat Object
 * @apiDescription Chat object attributes.
 * @apiName ChatObject
 * @apiGroup Objects
 *
 * @apiParam {ObjectId} id Object id.
 * @apiParam {ObjectId} [shopId] Shop object id
 * @apiParam {Object} [sender] User object
 * @apiParam {ObjectId} [senderId] User id of the message sender
 * @apiParam {Object} [receiver] User object
 * @apiParam {ObjectId} [receiverId] User id of the message receiver. When shop manager sending message, this should be carowner id.
 * When car owner sending a message to shop, then this should be shop owner id.
 * @apiParam {Number} [isNotified] Whether notified to shop manager. 0 - No, 1 - Yes
 * @apiParam {Number} [readStatus] Whether message read by the receiver. 0 - No, 1 - Yes
 * @apiParam {String} [message] Chat message
 * @apiParam {attachments[]} [attachments] List of file names uploaded to S3 bucket
 * @apiParam {Object} [createdBy] User object of the message creator
 * @apiParam {Date} [createdAt] Record created date & time in UTC.
 */

/************ Push Notification Template Object *********/

/**
 * @api {push-notification-template-object} {} Push Notification Template Object
 * @apiDescription Push notification template object attributes.
 * @apiName PushNotificationTemplateObject
 * @apiGroup Objects
 *
 * @apiParam {Object} id Object id.
 * @apiParam {ObjectId} shopId Request making shop id.
 * @apiParam {String{100}} title Title of the template.
 * @apiParam {String{150}} subject Push notification subject.
 * @apiParam {String} text Notification message
 * @apiParam {Number} isDefault Whether default template(super admin added) or not.
 * @apiParam {Date} [createdAt] Record created date & time in UTC.
 * @apiParam {Date} [updatedAt] Record updated date & time in UTC.
 * @apiParam {Object} [createdBy] Partial user object of the record creator.
 * @apiParam {Object} [updatedBy] Partial user object of the record updator.
 */

/************ Reward Object *********/

/**
 * @api {reward-object} {} Reward Object
 * @apiDescription Reward object attributes.
 * @apiName RewardObject
 * @apiGroup Objects
 *
 * @apiParam {Object} id Object id.
 * @apiParam {ObjectId} shopId Shop ObjectID.
 * @apiParam {ObjectId} userId User ObjectID.
 * @apiParam {Number} points Remaining reward points.
 * @apiParam {Date} [createdAt] Record created date & time in UTC.
 * @apiParam {Date} [updatedAt] Record updated date & time in UTC.
 * @apiParam {Object} [createdBy] Partial user object of the record creator.
 */

/************ Reward Transaction Object *********/

/**
 * @api {reward-object} {} Reward Transaction Object
 * @apiDescription Reward Transaction object attributes.
 * @apiName RewardTransactionObject
 * @apiGroup Objects
 *
 * @apiParam {Object} id Object id.
 * @apiParam {ObjectId} rewardId Reward ObjectID.
 * @apiParam {Number} points Transaction points.
 * @apiParam {Number} action  0 - Add, 1 - Redeem points.
 * @apiParam {String} remarks Transaction remark
 * @apiParam {Date} [createdAt] Record created date & time in UTC.
 * @apiParam {Date} [updatedAt] Record updated date & time in UTC.
 * @apiParam {Object} [createdBy] Partial user object of the record creator.
 */
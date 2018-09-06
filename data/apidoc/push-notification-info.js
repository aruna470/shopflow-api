/************ Get PushNotificationInfo *********/
 
/**
 * @api {get} http://<base-url>/push-notification-info/:id Get Push Notification Info
 * @apiDescription Retrieve push notification info. 
 * - Response - "Common Response" containig the push notification info object
 * - Authorization token required in header.
 * - System users can get push notification associated with any user.
 * - CarOwners can get only push notification intented for him
 *
 * @apiName GetPushNotificationInfo
 * @apiGroup PushNotificationInfo
 *
 * @apiParam {String} id notification Info ID
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "pushNotificationInfo": {
 *                  "token": "fs_NIbP0ILs:APA91bEODGiP76f4qe47X_5AG01Bp1DbqjhAicOALzmsIhvNvQl70YFiSWqgZK5M0j78ejhx-MGSDmLm-Iskb9iB5a6dMvr-UEDeQ0lqLLmjqg2HnSfNaTf6vk-hRn3JSzbgl24sNr3u",
 *                  "createdAt": "2018-03-02 07:30:01",
 *                  "status": 2, 
 *                  "shop": {
 *                      "id": "5a72bb075fa38e2440255f7d",
 *                      "brandName": "img1",
 *                      "logo": "https://s3.amazonaws.com/shop-flow-dev/JD45ILO7ACPDQ.jpg"
 *                  },
 *                  "userId": "5a7929db37ab8e0cb4f587b2",
 *                  "title": "My title",
 *                  "text": "Hello",
 *                  "id": "5a98fd79e045fc25e433d906"
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /push-notification-info/5aa6342b9851a92a3ca21fac
 *
 */

/************ List PushNotificationInfo *********/
 
/**
 * @api {get} http://<base-url>/push-notification-info/list List Push Notification Info
 * @apiDescription Retrieve list of push notifications. 
 * - Response - "Common Response" containig the push notification info objects
 * - Authorization token required in header.
 * - System users can get push notifications associated with any user.
 * - CarOwners can get only push notifications recevied by him
 *
 * @apiName ListPushNotificationInfo
 * @apiGroup PushNotificationInfo
 *
 * @apiParam {string} [userId] User id of the push notification receiver.
 * @apiParam {string} [token] Device token. Send this parameter when you need to get notification of specific device.
 * @apiParam {string} [shopId] Shop id. Send this parameter when you need to filter notifications by shop.
 * @apiParam {number} [pageNo] Page number.
 * @apiParam {number} [limit] Records per page.
 * @apiParam {string} [sort] Sorting field. Prepend "-" for decending, otherwise ascending. 
 * Possible sort fields are - createdAt
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "pushNotificationInfo": {
 *                "total": 2,
 *                "data": [
 *                    {
 *                        "token": "fs_NIbP0ILs:APA91bEODGiP76f4qe47X_5AG01Bp1DbqjhAicOALzmsIhvNvQl70YFiSWqgZK5M0j78ejhx-MGSDmLm-Iskb9iB5a6dMvr-UEDeQ0lqLLmjqg2HnSfNaTf6vk-hRn3JSzbgl24sNr3u",
 *                        "createdAt": "2018-03-02 07:30:01",
 *                        "status": 2,
 *                        "shop": {
 *                              "id": "5a72bb075fa38e2440255f7d",
 *                              "brandName": "img1",
 *                              "logo": "https://s3.amazonaws.com/shop-flow-dev/JD45ILO7ACPDQ.jpg"
 *                        },
 *                        "userId": "5a7929db37ab8e0cb4f587b2",
 *                        "title": "My title",
 *                        "text": "Hello",
 *                        "logo": "https://s3.amazonaws.com/shop-flow-dev/JD45ILO7ACPDB.jpg",
 *                        "id": "5a98fd79e045fc25e433d906"
 *                    },
 *                    {
 *                        "token": "f6hcTL2mtXU:APA91bGNmXjKE7oDriRVmoRIAlMOGu_NFm_fFf5gLF2DqrZYO6LX2GFbOzYRddVy6W7gWfxjjy69Um2sv0sR7tDLzQf1-2iKg_5bIMR50RZPJumKWLc2qKB6JWyZwqtSmLBzRsiBUi0G",
 *                        "createdAt": "2018-03-02 07:30:01",
 *                        "status": 2,
 *                        "shop": {
 *                              "id": "5a72bb075fa38e2440255f7d",
 *                              "brandName": "img1",
 *                              "logo": "https://s3.amazonaws.com/shop-flow-dev/JD45ILO7ACPDQ.jpg"
 *                        },
 *                        "userId": "5a7929db37ab8e0cb4f587b2",
 *                        "title": "My title",
 *                        "text": "Hello",
 *                        "logo": "https://s3.amazonaws.com/shop-flow-dev/JD45ILO7ACPDC.jpg",
 *                        "id": "5a98fd79e045fc25e433d905"
 *                    }
 *                ]
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /push-notification-info/list
 *
 */

/************ Delete PushNotificationInfo *********/
 
/**
 * @api {delete} http://<base-url>/push-notification-info/:id Delete Push Notification Info
 * @apiDescription Delete existing PushNotificationInfo. 
 * - Response - "Common Response"
 * - Authorization token required in header.
 *
 * @apiName DeletePushNotificationInfo
 * @apiGroup PushNotificationInfo
 *
 * @apiParam {string} id PushNotificationInfo id.
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": "",
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /push-notification-info/5a8a59c67fea9013b015e6a4
 *
 */

 /************ Get PushNotificationInfo Count *********/

 /**
 * @api {get} http://<base-url>/push-notification-info/msg-count Retreive Message Counts
 * @apiDescription Retrieve message counts of specific user. 
 * - Response - "Common Response"
 * - Authorization token required in header.
 * - Possible eror codes: <br/>
 * SUCCESS <br/>
 * PERMISSION_DENIED <br>
 * FAIL <br>
 * MISSING_MANDATORY_ATTRIBUTE <br>
 *
 * @apiName MessageCount
 * @apiGroup PushNotificationInfo
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "msgCounts": {
 *                "total": 2,
 *                "unread": 0,
 *                "read": 2
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /push-notification-info/msg-count?userId=5a8a59c67fea9013b015e6a4
 *
 */

/************ Mark Message as Read *********/

 /**
 * @api {put} http://<base-url>/push-notification-info/:id/mark-as-read Message Mark as Read
 * @apiDescription Mark message status as read 
 * - Response - "Common Response"
 * - Authorization token required in header.
 * - Possible eror codes: <br/>
 * SUCCESS <br/>
 * PERMISSION_DENIED <br>
 * FAIL <br>
 * MISSING_MANDATORY_ATTRIBUTE <br>
 * RECORD_NOT_FOUND
 *
 * @apiName MarkAsRead
 * @apiGroup PushNotificationInfo
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": "",
 *        "message": ""
 *    }
 */
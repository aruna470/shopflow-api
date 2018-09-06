/************ Create CarOwnerSubscription *********/

/**
 * @api {post} http://<base-url>/car-owner-subscription Create CarOwnerSubscription
 * @apiDescription Creates CarOwnerSubscription that subscribes users to a shop
 * <br/> Subscription Status would be PENDING till shop owner accept/reject the subscription
 * <br/> Subscription Status would be ACCEPTED if shop owner subscribes a user to their shop
 * - Authorization token required in header.
 * - Refer "CarOwnerSubscription Object" for necessary parameters. Following example illustrates the valid parameters for CarOwnerSubscription create.
 * Rest of the parameters described in "CarOwnerSubscription Object" are used for viewing and some other requests.
 * - Response - "Common Response". Possible response codes are,
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> PERMISSION_DENIED
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 * <br/> INVALID_USER_ID
 * <br/> INVALID_SHOP_ID
 * <br/> ALREADY_SUBSCRIBED
 *
 * @apiName CreateCarOwnerSubscription
 * @apiGroup CarOwnerSubscription
 *
 * @apiExample Example Request:
 *    {
 *      "userId":"5a6ac1fd289fe72aac248476",
 *      "shopId":"5a6ac1fd289fe72aac248477"
 *    }
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": "",
 *        "message": ""
 *    }
 */

 /************ Update CarOwnerSubscription *********/

/**
 * @api {put} http://<base-url>/car-owner-subscription/:id Update CarOwnerSubscription
 * @apiDescription Update CarOwnerSubscription, can also be used to unsubscribe from a shop
 * <br/> Setting status to 3 will unsubscribe a carowner from shop
 * - Authorization token required in header.
 * - Refer "CarOwnerSubscription Object" for necessary parameters. Following example illustrates the valid parameters for CarOwnerSubscription update.
 * Rest of the parameters described in "CarOwnerSubscription Object" are used for viewing and some other requests.
 * - Response - "Common Response". Possible response codes are,
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> PERMISSION_DENIED
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 * <br/> INVALID_USER_ID
 * <br/> INVALID_SHOP_ID
 * <br/> RECORD_NOT_FOUND
 *
 * @apiName UpdateCarOwnerSubscription
 * @apiGroup CarOwnerSubscription
 *
 * @apiExample Example Request:
 *    {
 *      "userId":"5a6ac1fd289fe72aac248476",
 *      "shopId":"5a6ac1fd289fe72aac248477",
 *      "status": 3
 *    }
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": "",
 *        "message": ""
 *    }
 * @apiExample Example Request:
 * /car-owner-subscription/5a3a4e096f6cd628e4d922a8
 */

 /************ Get CarOwnerSubscription *********/
 
/**
 * @api {get} http://<base-url>/car-owner-subscription/:id Get CarOwnerSubscription
 * @apiDescription Retrieve existing CarOwnerSubscription details. 
 * - Authorization token required in header.
 * - Response - "Common Response" containig the CarOwnerSubscription object. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>RECORD_NOT_FOUND
 * <br/>PERMISSION_DENIED
 *
 * @apiName GetCarOwnerSubscription
 * @apiGroup CarOwnerSubscription
 *
 * @apiParam {string} id CarOwnerSubscription id.
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": {
 *          "subscription": {
 *              "user": {
 *                  "id": "5a8c0af12c12042d143f359a",
 *                  "email": "user@gmail.com",
 *                  "firstName": "First",
 *                  "lastName": "Last"
 *              },
 *              "shopId": "5a72bb075fa38e2440255f7d",
 *              "updatedAt": null,
 *              "createdAt": "2018-02-20 07:40:22",
 *              "status": 0,
 *              "createdBy": {
 *                  "firstName": "First",
 *                  "lastName": "Last"
 *              },
 *              "updatedBy": null,
 *              "id": "5a8bd0e65432b82f849c881a"
 *          }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /car-owner-subscription/5a3a4e096f6cd628e4d922a8
 *
 */

 /************ List CarOwnerSubscription *********/
 
/**
 * @api {get} http://<base-url>/car-owner-subscription/list List CarOwnerSubscriptions
 * @apiDescription Retrieve list of CarOwnerSubscription. 
 * <br/><b>Results could be filtered using:</b> shopId, userId, status, firstName, lastName, email, fullName
 * <br/><b>Sorted using:</b> firstName, lastName, email, status, createdAt, company
 * <br/>
 * - Authorization token required in header.
 * - Response - "Common Response" containig the CarOwnerSubscription objects. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>PERMISSION_DENIED 
 *
 * @apiName ListCarOwnerSubscription
 * @apiGroup CarOwnerSubscription
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "users": {
 *                "total": 1,
 *                "data": [
 *                    {
 *                      "user": {
 *                          "id": "5a8c0af12c12042d143f359a",
 *                          "email": "user@gmail.com",
 *                          "firstName": "First",
 *                          "lastName": "Last",
 *                          "mobile": "773959699",
 *                          "createdAt": "2018-02-20T11:48:01.784Z"
 *                          "isM1SyncedUser": 1,
 *                          "company": "McDonald"
 *                      },
 *                      "shop": {
 *                          "id": "5a72bb075fa38e2440255f7d",
 *                          "brandName": "automag",
 *                          "businessName": "automag",
 *                          "createdAt": "2018-02-01T07:00:23.112Z"
 *                      },
 *                      "updatedAt": null,
 *                      "createdAt": "2018-02-20 07:40:22",
 *                      "status": 0,
 *                      "createdBy": {
 *                          "firstName": "First",
 *                          "lastName": "Last"
 *                      },
 *                      "updatedBy": null,
 *                      "id": "5a8bd0e65432b82f849c881a"
 *                    }
 *                ]
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /car-owner-subscription/list?pageNo=1&limit=3&sort=-createdAt
 *
 */

/************ Delete CarOwnerSubscription *********/
 
/**
 * @api {delete} http://<base-url>/car-owner-subscription/:id Delete CarOwnerSubscription
 * @apiDescription Delete existing CarOwnerSubscription. 
 * - Authorization token required in header.
 * - Response - "Common Response". Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>PERMISSION_DENIED
 * <br/>RECORD_NOT_FOUND
 *
 * @apiName DeleteCarOwnerSubscription
 * @apiGroup CarOwnerSubscription
 *
 * @apiParam {string} id CarOwnerSubscription id.
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
 * /car-owner-subscription/5a3a4e096f6cd628e4d922a8
 *
 */

/************ Invite M1 Synced User *********/
 
/**
 * @api {post} http://<base-url>/car-owner-subscription/:id/invite-m1-user Invite M1 Subscribed User
 * @apiDescription Invite M1 Subscribed User. 
 * - Authorization token required in header.
 * - Response - "Common Response". Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>PERMISSION_DENIED
 * <br/>RECORD_NOT_FOUND
 *
 * @apiName InviteM1User
 * @apiGroup CarOwnerSubscription
 *
 * @apiParam {string} id CarOwnerSubscription id.
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
 * /car-owner-subscription/5a3a4e096f6cd628e4d922a8/invite-m1-user
 *
 */
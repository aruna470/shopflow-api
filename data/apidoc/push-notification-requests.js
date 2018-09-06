/************ Create Push Notification Request *********/
 
/**
 * @api {post} http://<base-url>/push-notification-request Create Push Notification Request
 * @apiDescription Add new push notification request
 * - Authorization token required in header.
 * - Mandatory fields - Either users or shopIds need to be present
 * - Refer "Push Notification Request Object" for necessary parameters. Following example illustrates the valid parameters for push notification request create.
 * Rest of the parameters described in "Push Notification Request Object" are used for viewing and some other requests.
 * - Response - "Common Response" with push notification request id. Possible response codes are,
 * <br/> PERMISSION_DENIED
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 *
 * @apiName Create
 * @apiGroup PushNotificationRequest
 *
 * @apiExample Example Request:
 *    {
 *    	"shopId":"5a6ad448c80f921fc47c89ec",
 *    	"shopIds": [],
 *    	"users": ["5a792a2cd419dd10c4f9c094", "5a7929db37ab8e0cb4f587b2"],
 *      "title": "Hello",
 *    	"text": "Hello World"
 *    }
 *
 */

/************ List Push Notification Requests *********/
 
/**
 * @api {get} http://<base-url>/push-notification-request/list?shopId=<shopId> List Push Notification Requests
 * @apiDescription List Push Notification Requests.
 * - Response - "Common Response" containig the PushNotificationRequest objects. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>PERMISSION_DENIED
 * <br/>MISSING_MANDATORY_ATTRIBUTE
 * - Authorization token required in header.
 *
 * @apiName ListPushNotificationRequests
 * @apiGroup PushNotificationRequest
 *
 * @apiParam {string} [shopId] ShopId for filtering
 * @apiParam {number} [pageNo] Page number.
 * @apiParam {number} [limit] Records per page.
 * @apiParam {string} [sort] Sorting field. Prepend "-" for decending, otherwise ascending. 
 * @apiExample Example Request:
 * /push-notification-request/list
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "pushNotificationRequests": {
 *                "total": 1,
 *                "data": [
 *                    {
 *                        "updatedAt": "2018-05-21 05:24:51",
 *                        "createdAt": "2018-05-21 05:24:43",
 *                        "title": "Update on your booking",
 *                        "text": "Appointment confirmed",
 *                        "status": 2,
 *                        "users": [
 *                            {
 *                                "id": "5ad5908836e28a2500ab6bff",
 *                                "firstName": "John",
 *                                "lastName": "Dwulet"
 *                            }
 *                        ],
 *                        "shopIds": [],
 *                        "shopId": "5ad58a7f78d2130704b3ce05",
 *                        "createdBy": {
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        },
 *                        "updatedBy": null,
 *                        "id": "5b02581b00e15a275cc371ea"
 *                    }
 *                ]
 *            }
 *        },
 *        "message": ""
 *    }
 */

/************ Get Single Push Notification Details *********/
 
/**
 * @api {get} http://<base-url>/push-notification-request/:id Get Push Notification Request
 * @apiDescription Get Push Notification Request.
 * - Response - "Common Response" containig the Push Notification Request object. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>RECORD_NOT_FOUND
 * <br/>PERMISSION_DENIED
 * - Authorization token required in header.
 *
 * @apiName GetPushNotificationRequest
 * @apiGroup PushNotificationRequest
 *
 * @apiExample Example Request:
 * /push-notification-request/5b02581b00e15a275cc371ea
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "pushNotificationRequest": {
 *                "updatedAt": "2018-05-21 05:24:51",
 *                "createdAt": "2018-05-21 05:24:43",
 *                "title": "Update on your booking",
 *                "text": "Appointment confirmed",
 *                "status": 2,
 *                "users": [
 *                    "5ad5908836e28a2500ab6bff"
 *                ],
 *                "shopIds": [],
 *                "shopId": "5ad58a7f78d2130704b3ce05",
 *                "createdBy": {
 *                    "firstName": "Aruna",
 *                    "lastName": "Attanayake"
 *                },
 *                "updatedBy": null,
 *                "id": "5b02581b00e15a275cc371ea"
 *            }
 *        },
 *        "message": ""
 *    }
 */

/************ Delete Push Notification Request *********/
 
/**
 * @api {delete} http://<base-url>/push-notification-request/:id Delete Push Notification Request
 * @apiDescription Delete push notification request. This will deletes all the associated push notifications as well. 
 * - Response - "Common Response"
 * - Authorization token required in header.
 *
 * @apiName DeletePushNotificationRequest
 * @apiGroup PushNotificationRequest
 *
 * @apiParam {string} id Push notification request record id.
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
 * /push-notification-request/5b02581b00e15a275cc371ea
 *
 */
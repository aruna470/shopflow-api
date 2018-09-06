/************ Create Push Notification Template *********/
 
/**
 * @api {post} http://<base-url>/push-notification-template Create Push Notification Template
 * @apiDescription Add new push notification template
 * - Authorization token required in header.
 * - Mandatory fields - shopId, title, subject, text
 * - Refer "Push Notification Template Object" for necessary parameters. Following example illustrates the valid parameters for push notification template create.
 * Rest of the parameters described in "Push Notification Template Object" are used for viewing and some other requests.
 * - Response - "Common Response" with push notification template id. Possible response codes are,
 * <br/> PERMISSION_DENIED
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 *
 * @apiName Create
 * @apiGroup PushNotificationTemplate
 *
 * @apiExample Example Request:
 *   {
 *     "shopId": "5ad58a7f78d2130704b3ce05",
 *     "title": "Engin repir offer",
 *     "subject": "body wash",
 *     "text": "viranga body wash...."
 *   }
 *
 */

/************ Update Push Notification Template *********/
 
/**
 * @api {put} http://<base-url>/push-notification-template/:id Update Push Notification Template
 * @apiDescription Update existing notification template
 * - Authorization token required in header.
 * - Refer "Push Notification Template Object" for necessary parameters. Following example illustrates the valid parameters for push notification template update.
 * Rest of the parameters described in "Push Notification Template Object" are used for viewing and some other requests.
 * - Response - "Common Response" with push notification template id. Possible response codes are,
 * <br/> PERMISSION_DENIED
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 *
 * @apiName Create
 * @apiGroup PushNotificationTemplate
 *
 * @apiExample Example Request:
 *   {
 *     "shopId": "5ad58a7f78d2130704b3ce05",
 *     "title": "Engin repir offer",
 *     "subject": "body wash",
 *     "text": "viranga body wash...."
 *   }
 *
 */

/************ List Push Notification Templates *********/
 
/**
 * @api {get} http://<base-url>/push-notification-template/list?shopId=<shopId> List Push Notification Templates
 * @apiDescription List Push Notification Templates.
 * - Response - "Common Response" containig the PushNotificationTemplate objects. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>PERMISSION_DENIED
 * <br/>MISSING_MANDATORY_ATTRIBUTE
 * - Authorization token required in header.
 *
 * @apiName ListPushNotificationTemplates
 * @apiGroup PushNotificationTemplate
 *
 * @apiParam {string} [shopId] ShopId for filtering
 * @apiParam {number} [pageNo] Page number.
 * @apiParam {number} [limit] Records per page.
 * @apiParam {string} [sort] Sorting field. Prepend "-" for decending, otherwise ascending. 
 * @apiExample Example Request:
 * /push-notification-template/list
 * 
 * @apiSuccessExample Success-Response:
*    {
*        "code": "SUCCESS",
*        "attribute": null,
*        "data": {
*            "pushNotificationTemplates": {
*                "total": 3,
*                "data": [
*                    {
*                        "updatedAt": "2018-07-11 04:11:43",
*                        "createdAt": "2018-07-10 09:31:31",
*                        "title": "bodyddd wash",
*                        "subject": "bodyddd wash",
*                        "text": "Yohan body wash....",
*                        "isDefault": 1,
*                        "shopId": "5ad58a7f78d2130704b3ce05",
*                        "createdBy": {
*                            "firstName": "Aruna",
*                            "lastName": "Attanayake"
*                        },
*                        "updatedBy": {
*                            "firstName": "Aruna",
*                            "lastName": "Attanayake"
*                        },
*                        "id": "5b447cf393f46d349022bf2d"
*                    },
*                    {
*                        "updatedAt": "2018-07-10 09:31:29",
*                        "createdAt": "2018-07-10 09:31:29",
*                        "title": "body wash",
*                        "subject": "body wash",
*                        "text": "viranga body wash....",
*                        "isDefault": 0,
*                        "shopId": "5ad58a7f78d2130704b3ce05",
*                        "createdBy": {
*                            "firstName": "Aruna",
*                            "lastName": "Attanayake"
*                        },
*                        "updatedBy": null,
*                        "id": "5b447cf193f46d349022bf2c"
*                    },
*                    {
*                        "updatedAt": "2018-07-10 08:45:51",
*                        "createdAt": "2018-07-10 08:45:51",
*                        "title": "body wash",
*                        "subject": "body wash",
*                        "text": "body wash....",
*                        "isDefault": 0,
*                        "shopId": "5ad58a7f78d2130704b3ce05",
*                        "createdBy": {
*                            "firstName": "Aruna",
*                            "lastName": "Attanayake"
*                        },
*                        "updatedBy": null,
*                        "id": "5b44723f5afa431ecc9dcf70"
*                    }
*                ]
*            }
*        },
*        "message": ""
*    }
 */

/************ Get Single Push Notification Template *********/
 
/**
 * @api {get} http://<base-url>/push-notification-template/:id Get Push Notification Template
 * @apiDescription Get Push Notification Template.
 * - Response - "Common Response" containig the Push Notification Template object. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>RECORD_NOT_FOUND
 * <br/>PERMISSION_DENIED
 * - Authorization token required in header.
 *
 * @apiName GetPushNotificationTempate
 * @apiGroup PushNotificationTemplate
 *
 * @apiExample Example Request:
 * /push-notification-template/5b02581b00e15a275cc371ea
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "pushNotificationTemplate": {
 *                "updatedAt": "2018-07-10 08:45:51",
 *                "createdAt": "2018-07-10 08:45:51",
 *                "title": "body wash",
 *                "subject": "body wash",
 *                "text": "body wash....",
 *                "isDefault": 0,
 *                "shopId": "5ad58a7f78d2130704b3ce05",
 *                "createdBy": {
 *                    "firstName": "Aruna",
 *                    "lastName": "Attanayake"
 *                },
 *                "updatedBy": null,
 *                "id": "5b44723f5afa431ecc9dcf70"
 *            }
 *        },
 *        "message": ""
 *    }
 */

/************ Delete Push Notification Template *********/
 
/**
 * @api {delete} http://<base-url>/push-notification-template/:id Delete Push Notification Template
 * @apiDescription Delete push notification template.
 * - Response - "Common Response"
 * - Authorization token required in header.
 *
 * @apiName DeletePushNotificationTemplate
 * @apiGroup PushNotificationTemplate
 *
 * @apiParam {string} id Push notification template record id.
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
 * /push-notification-template/5b02581b00e15a275cc371ea
 *
 */
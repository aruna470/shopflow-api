/************ Create Permission *********/
 
/**
 * @api {post} http://<base-url>/permission Create Permission
 * @apiDescription Add new permission
 * - Refer "Permission Object" for necessary parameters. Following example illustrates the valid parameters for permission create.
 * Rest of the parameters described in "Permission Object" are used for viewing and some other requests.
 * - Response - "Common Response" with permission id
 * - Authorization token required in header.
 *
 * @apiName Create
 * @apiGroup Permission
 *
 * @apiExample Example Request:
 *    {
 *      "name":"Permission.Create",
 *      "description":"Create a permission",
 *      "category":"Permission"
 *    }
 *
 */

/************ Update Permission *********/

 /**
 * @api {put} http://<base-url>/permission/<id> Update Permission
 * @apiDescription Update existing permission details.
 * - Refer "Permission Object" for necessary parameters. Following example illustrates the valid parameters for permission update.
 * Rest of the parameters described in "Permission Object" are used for viewing and some other requests.
 * - Response - "Common Response"
 * - Authorization token required in header.
 *
 * @apiName Update
 * @apiGroup Permission
 *
 * @apiExample Example Request:
 *    {
 *      "name":"Permission.Create",
 *      "description":"Create a permission",
 *      "category":"Permission"
 *    }
 *
 */

/************ Get Permission *********/
 
/**
 * @api {get} http://<base-url>/permission/:id Get Permission
 * @apiDescription Retrieve existing permission details. 
 * - Response - "Common Response" containig the permission object
 * - Authorization token required in header.
 *
 * @apiName GetPermission
 * @apiGroup Permission
 *
 * @apiParam {string} id Permission id.
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": {
 *            "permission": {
 *                "name": "Permission.Update",
 *                "description": "Create a permission",
 *                "category": "Permission",
 *                "updatedAt": null,
 *                "createdAt": "2017-12-26 11:34:07",
 *                "createdBy": {
 *                    "firstName": "Aruna",
 *                    "lastName": "Attanayake"
 *                },
 *                "updatedBy": null,
 *                "id": "5a4233af66b74f082c948566"
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /permission/5a4233af66b74f082c948566
 *
 */

/************ List permissions *********/
 
/**
 * @api {get} http://<base-url>/permission/list List permissions
 * @apiDescription Retrieve list of permissions. 
 * - Response - "Common Response" containig the permission objects
 * - Authorization token required in header.
 *
 * @apiName ListPermissions
 * @apiGroup Permission
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "permissions": {
 *                "total": 3,
 *                "data": [
 *                    {
 *                        "name": "Permission.Update",
 *                        "description": "Create a permission",
 *                        "category": "Permission",
 *                        "updatedAt": null,
 *                        "createdAt": "2017-12-26 11:34:07",
 *                        "createdBy": {
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        },
 *                        "updatedBy": null,
 *                        "id": "5a4233af66b74f082c948566"
 *                    },
 *                    {
 *                        "name": "Permission.1e11q",
 *                        "description": "Updated",
 *                        "category": "Permission",
 *                        "updatedAt": "2017-12-26 15:17:00",
 *                        "createdAt": "2017-12-26 11:34:50",
 *                        "createdBy": {
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        },
 *                        "updatedBy": {
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        },
 *                        "id": "5a4233da66b74f082c948568"
 *                    },
 *                    {
 *                        "name": "Permission.Create",
 *                        "description": "Create a permission",
 *                        "category": "Permission",
 *                        "updatedAt": null,
 *                        "createdAt": "2017-12-28 02:20:58",
 *                        "createdBy": {
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        },
 *                        "updatedBy": null,
 *                        "id": "5a44550a9a07ce2bb052a9bf"
 *                    }
 *                ]
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /permission/list
 *
 */

/************ Delete Permission *********/
 
/**
 * @api {delete} http://<base-url>/permission/:id Delete Permission
 * @apiDescription Delete existing permission. 
 * - Response - "Common Response"
 * - Authorization token required in header.
 *
 * @apiName DeletePermission
 * @apiGroup Permission
 *
 * @apiParam {string} id Permission id.
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
 * /permission/5a3a4e096f6cd628e4d922a8
 *
 */

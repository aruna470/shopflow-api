/************ Create Role *********/
 
/**
 * @api {post} http://<base-url>/role Create Role
 * @apiDescription Add new role
 * - Refer "Role Object" for necessary parameters. Following example illustrates the valid parameters for role create.
 * Rest of the parameters described in "Role Object" are used for viewing and some other requests.
 * - Response - "Common Response" with role id
 * - Authorization token required in header.
 *
 * @apiName Create
 * @apiGroup Role
 *
 * @apiExample Example Request:
 *    {
 *      "name":"staf",
 *      "description":"Staff Role",
 *      "permissions":["5a4233af66b74f082c948566", "5a4233da66b74f082c948568"]
 *    }
 *
 */

/************ Update Role *********/

 /**
 * @api {put} http://<base-url>/role/<id> Update Role
 * @apiDescription Update existing role details.
 * - Refer "Role Object" for necessary parameters. Following example illustrates the valid parameters for role update.
 * Rest of the parameters described in "Role Object" are used for viewing and some other requests.
 * - Response - "Common Response"
 * - Authorization token required in header.
 *
 * @apiName Update
 * @apiGroup Role
 *
 * @apiExample Example Request:
 *    {
 *      "name":"staf",
 *      "description":"Staff Role",
 *      "permissions":["5a4233af66b74f082c948566", "5a4233da66b74f082c948568"]
 *    }
 *
 */

/************ Get Role *********/
 
/**
 * @api {get} http://<base-url>/role/:id Get Role
 * @apiDescription Retrieve existing role details. 
 * - Response - "Common Response" containig the role object
 * - Authorization token required in header.
 *
 * @apiName GetRole
 * @apiGroup Role
 *
 * @apiParam {string} id Role id.
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": {
 *            "role": {
 *                "name": "admin",
 *                "description": "Administrator Role",
 *                "updatedAt": "2017-12-29 10:49:56",
 *                "createdAt": "2017-12-29 05:57:20",
 *                "permissions": [
 *                    {
 *                        "id": "5a4233af66b74f082c948566",
 *                        "name": "Permission.Update"
 *                    },
 *                    {
 *                        "id": "5a4233da66b74f082c948568",
 *                        "name": "Permission.1e11q"
 *                    }
 *                ],
 *                "createdBy": {
 *                    "firstName": "Aruna",
 *                    "lastName": "Attanayake"
 *                },
 *                "updatedBy": {
 *                    "firstName": "Aruna",
 *                    "lastName": "Attanayake"
 *                },
 *                "id": "5a45d940aaa7600ae4599ce7"
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /role/5a4233af66b74f082c948566
 *
 */

/************ List Roles *********/
 
/**
 * @api {get} http://<base-url>/role/list List roles
 * @apiDescription Retrieve list of roles. 
 * - Response - "Common Response" containig the role objects
 * - Authorization token required in header.
 *
 * @apiName ListRoles
 * @apiGroup Role
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "roles": {
 *                "total": 2,
 *                "data": [
 *                    {
 *                        "name": "admin",
 *                        "description": "Administrator Role",
 *                        "updatedAt": "2017-12-29 10:50:56",
 *                        "createdAt": "2017-12-29 05:57:20",
 *                        "permissions": [
 *                            {
 *                                "id": "5a4233af66b74f082c948566",
 *                                "name": "Permission.Update"
 *                            }
 *                        ],
 *                        "createdBy": {
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        },
 *                        "updatedBy": {
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        },
 *                        "id": "5a45d940aaa7600ae4599ce7"
 *                    },
 *                    {
 *                        "name": "staf",
 *                        "description": "Staff Role",
 *                        "updatedAt": null,
 *                        "createdAt": "2017-12-29 10:41:20",
 *                        "permissions": [
 *                            {
 *                                "id": "5a4233af66b74f082c948566",
 *                                "name": "Permission.Update"
 *                            },
 *                            {
 *                                "id": "5a4233da66b74f082c948568",
 *                                "name": "Permission.1e11q"
 *                            }
 *                        ],
 *                        "createdBy": {
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        },
 *                        "updatedBy": null,
 *                        "id": "5a461bd004721910e49332dc"
 *                    }
 *                ]
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /role/list
 *
 */

/************ Delete Role *********/
 
/**
 * @api {delete} http://<base-url>/role/:id Delete Role
 * @apiDescription Delete existing role. Roles those are assigned to any user cannot be deleted.
 * - Response - "Common Response"
 * - Authorization token required in header.
 *
 * @apiName DeleteRole
 * @apiGroup Role
 *
 * @apiParam {string} id Role id.
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
 * /role/5a3a4e096f6cd628e4d922a8
 *
 */

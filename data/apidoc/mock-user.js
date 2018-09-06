/************ Create Mock User *********/
 
/**
 * @api {post} http://<base-url>/mock-user Create Mock User
 * @apiDescription Add new mock user
 * - Refer "Mock User Object" for necessary parameters. Following example illustrates the valid parameters for mock user create.
 * Rest of the parameters described in "Mock User Object" are used for viewing and some other requests.
 * - Response - "Common Response"
 *
 * @apiName Create
 * @apiGroup MockUser
 *
 * @apiExample Example Request:
 *    {
 *      "firstName":"Jhon",
 *      "email":"jhon@gmail.com",
 *      "lastName":"Smith"
 *    }
 *
 */

/************ Update Mock User *********/

 /**
 * @api {put} http://<base-url>/mock-user/<id> Update Mock User
 * @apiDescription Update existing mock user details.
 * - Refer "Mock User Object" for necessary parameters. Following example illustrates the valid parameters for mock user update.
 * Rest of the parameters described in "Mock User Object" are used for viewing and some other requests.
 * - Response - "Common Response"
 *
 * @apiName Update
 * @apiGroup MockUser
 *
 * @apiExample Example Request:
 *    {
 *      "firstName":"Jhon",
 *      "email":"jhon@gmail.com",
 *      "lastName":"Smith"
 *    }
 *
 */

/************ Get Mock User *********/
 
/**
 * @api {get} http://<base-url>/mock-user/:id Get Mock User
 * @apiDescription Retrieve existing mock user details. 
 * - Response - "Common Response" containig the mock user object
 *
 * @apiName GetMockUser
 * @apiGroup MockUser
 *
 * @apiParam {string} id mock user id.
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": {
 *            "mockUser": {
 *                "firstName": "Jhon",
 *                "email": "jhon@gmail.com",
 *                "lastName": "Smith"
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /mock-user/5a4233af66b74f082c948566
 *
 */

/************ List Mock Users *********/
 
/**
 * @api {get} http://<base-url>/mock-user/list List Mock Users
 * @apiDescription Retrieve list of mock users. 
 * - Response - "Common Response" containig the mock user objects
 *
 * @apiName ListMockUsers
 * @apiGroup MockUser
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": {
 *            "mockUsers": {
 *                "total": 2,
 *                "data": [
 *                    {
 *                        "firstName": "Jhon",
 *                        "email": "jhon@gmail.com",
 *                        "lastName": "Smith"
 *                    },
 *                    {
 *                        "firstName": "Gavin",
 *                        "email": "gavin@gmail.com",
 *                        "lastName": "Smith"
 *                    }
 *                ]
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /mock-user/list
 *
 */

/************ Delete Mock Users *********/
 
/**
 * @api {delete} http://<base-url>/mock-user/:id Delete Mock User
 * @apiDescription Delete existing mock user. 
 * - Response - "Common Response"
 *
 * @apiName DeleteMockUser
 * @apiGroup MockUser
 *
 * @apiParam {string} id Mock user id.
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
 * /mock-user/5a3a4e096f6cd628e4d922a8
 *
 */

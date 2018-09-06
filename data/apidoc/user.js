/************ Signup User *********/
 
/**
 * @api {post} http://<base-url>/user/signup User Signup
 * @apiDescription Sign up new user to the system. Use this end point for car owner registration only
 * - Refer "User Object Details" for necessary parameters. Following example illustrates the valid parameters for user create.
 * Rest of the parameters described in "User Object Details" are used for viewing and some other requests.
 * - Once record created it will send an verification email to the given email address.
 * - Response - "Common Response" with user id. Possible status codes are
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>MISSING_MANDATORY_ATTRIBUTE
 * <br/>DUPLICATE_RECORD
 * <br/>EXCEED_CHARACTER_LENGTH
 * <br/>INVALID_MOBILE
 * 
 * @apiName UserSignup
 * @apiGroup User
 *
 * @apiExample Example Request: Normal user
 *    {
 *      "firstName":"Yohan",
 *      "lastName":"Nalaka",
 *      "email":"yohan@gmail.com",
 *      "password":"tes.123",
 *      "mobile":"773959699",
 *      "gender":1,
 *      "timezone":"Asia/Colombo"
 *    }
 *
 */


/************ Create User *********/
 
/**
 * @api {post} http://<base-url>/user Create System User
 * @apiDescription Use this end point to create new system user. 
 * <br/> This requires user.create-user permission
 * - Refer "User Object Details" for necessary parameters. Following example illustrates the valid parameters for user create.
 * Rest of the parameters described in "User Object Details" are used for viewing and some other requests.
 * - Once record created it will send an verification email to the given email address.
 * - Response - "Common Response" with user id. Possible status codes are
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>MISSING_MANDATORY_ATTRIBUTE
 * <br/>DUPLICATE_RECORD
 * <br/>EXCEED_CHARACTER_LENGTH
 * <br/>INVALID_MOBILE
 * <br/>INVALID_EMAIL
 * 
 * @apiName CreateSystemUser
 * @apiGroup User
 *
 * @apiExample Example Request: System user
 *    {
 *      "firstName":"Yohan",
 *      "lastName":"Nalaka",
 *      "sysEmail":"yohan@gmail.com",
 *      "password":"tes.123",
 *      "roleId":"5a5e12f85360b42011558d5a",
 *      "mobile":"773959699",
 *      "gender":1,
 *      "timezone":"Asia/Colombo"
 *    }
 */

/************ Update User *********/

 /**
 * @api {put} http://<base-url>/user/<id> Update User
 * @apiDescription Update existing user details.
 * - Refer "User Object Details" for necessary parameters. Following example illustrates the valid parameters for user update.
 * Rest of the parameters described in "User Object Details" are used for viewing and some other requests.
 * - email, sysEmail and password cannot be updated via this endpoint..
 * - Response - "Common Response". Possible response codes are
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>MISSING_MANDATORY_ATTRIBUTE
 * <br/>DUPLICATE_RECORD
 * <br/>EXCEED_CHARACTER_LENGTH
 * <br/>INVALID_MOBILE
 *
 * - Authorization token required in header.
 *
 * @apiName Update
 * @apiGroup User
 *
 * @apiExample Example Request: Normal user
 *    {
 *      "firstName":"Yohan",
 *      "lastName":"Nalaka",
 *      "userType": 2,
 *      "mobile":"773959699",
 *      "gender":1,
 *      "timezone":"Asia/Colombo"
 *    }
 *
 */

/************ Get User *********/
 
/**
 * @api {get} http://<base-url>/user/:id Get User
 * @apiDescription Retrieve existing user details. 
 * - Authorization token required in header.
 * - Response - "Common Response" containig the user object. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>RECORD_NOT_FOUND
 *
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {string} id User id.
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": {
 *            "user": {
 *                "firstName": "Viranga",
 *                "userType": 1,
 *                "sysEmail": "nalaka@gmail.com",
 *                "isEmailVerified": 0,
 *                "accessToken": null,
 *                "updatedAt": null,
 *                "createdAt": "2017-12-20 11:48:25",
 *                "lastAccess": null,
 *                "gender": 1,
 *                "mobile": "773959693",
 *                "status": 1,
 *                "roleId": "5a56feb31605fa1ab8677e15",
 *                "timezone": "Asia/Colombo",
 *                "lastName": "Hirimuthugoda",
 *                "createdBy": null,
 *                "updatedBy": null,
 *                "id": "5a3a4e096f6cd628e4d922a8",
 *                "email": null,
 *                "shopId": "5a6ad448c80f921fc47c89ec",
 *                "isM1SyncedUser": 0,
 *                "homePhone": "112925647"
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /user/5a3a4e096f6cd628e4d922a8
 *
 */

/************ List users *********/
 
/**
 * @api {get} http://<base-url>/user/list List users
 * @apiDescription Retrieve list of users by various filters. 
 * - Authorization token required in header.
 * - Response - "Common Response" containig the user objects. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>RECORD_NOT_FOUND 
 *
 * @apiName ListUsers
 * @apiGroup User
 *
 * @apiParam {string} [firstName] First name of the user.
 * @apiParam {string} [email] Normal user email.
 * @apiParam {string} [createdBy] Filter using createdBy userId.
 * @apiParam {string} [sysEmail] System user email.
 * @apiParam {number} [status] User status.
 * @apiParam {number} [pageNo] Page number.
 * @apiParam {number} [limit] Records per page.
 * @apiParam {string} [sort] Sorting field. Prepend "-" for decending, otherwise ascending. 
 * Possible sort fields are - sysEmail, email, firstName, lastName, createdAt, updatedAt
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "users": {
 *                "total": 3,
 *                "data": [
 *                    {
 *                        "firstName": "Nalaka",
 *                        "userType": 2,
 *                        "email": "nalaka@gmail.com",
 *                        "accessToken": null,
 *                        "updatedAt": null,
 *                        "createdAt": "2017-12-24 00:51:11",
 *                        "lastAccess": null,
 *                        "gender": 1,
 *                        "mobile": "773959693",
 *                        "status": 1,
 *                        "roleName": "admin",
 *                        "timezone": "Asia/Colombo",
 *                        "lastName": "Hirimuthugoda",
 *                        "createdBy": {
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        },
 *                        "updatedBy": {
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        },
 *                        "id": "5a3ef9ffa2649a1720d6abfc",
 *                        "sysEmail": null,
 *                        "shopId": "5a6ad448c80f921fc47c89ec",
 *                        "isM1SyncedUser": 0,
 *                        "homePhone": "112925647"
 *                    },
 *                    {
 *                        "firstName": "Viranga",
 *                        "userType": 1,
 *                        "sysEmail": "aruna470@gmail.com",
 *                        "accessToken": null,
 *                        "updatedAt": null,
 *                        "createdAt": "2017-12-20 11:48:25",
 *                        "lastAccess": null,
 *                        "gender": 1,
 *                        "mobile": "773959693",
 *                        "status": 1,
 *                        "roleName": "admin",
 *                        "timezone": "Asia/Colombo",
 *                        "lastName": "Kekulawala",
 *                        "createdBy": {
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        },
 *                        "updatedBy": {
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        },
 *                        "id": "5a3a4e096f6cd628e4d922a8",
 *                        "email": null,
 *                        "shopId": "5a6ad448c80f921fc47c89ec",
 *                        "isM1SyncedUser": 0,
 *                        "homePhone": "112925647"
 *                    }
 *                ]
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /user/list?pageNo=1&limit=3&sort=-createdAt
 *
 */

/************ Delete User *********/
 
/**
 * @api {delete} http://<base-url>/user/:id Delete User
 * @apiDescription Delete existing user. 
 * - Authorization token required in header.
 * - Response - "Common Response". Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 *
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiParam {string} id User id.
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
 * /user/5a3a4e096f6cd628e4d922a8
 *
 */

/************ Authenticate User *********/
 
/**
 * @api {post} http://<base-url>/user/authenticate Authenticate User
 * @apiDescription Authenticate user. 
 * - Upon successfull authentication it will return accessToken.
 * - Response - "Common Response" along with user object. Possible error codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>INVALID_USERNAME_PASSWORD
 * <br/>INACTIVE_USER
 * <br/>EMAIL_NOT_VERIFIED
 *
 * @apiName AuthenticateUser
 * @apiGroup User
 *
 * @apiExample Example Request:
 *    {
 *      "userType": 1,
 *      "email":"super@gmail.com",
 *      "password":"tes.123"
 *    }
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": {
 *            "user": {
 *                "firstName": "Super",
 *                "userType": 1,
 *                "sysEmail": "super@gmail.com",
 *                "isEmailVerified": 0,
 *                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTVlMTJmODUzNjBiNDIwMTE1NThkNWEiLCJzeXNFbWFpbCI6InN1cGVyQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IlN1cGVyIiwiaWF0IjoxNTE2Mjg4MzAwfQ.AkqjMjRFhXOUB5rwKcsYd0xOGH8G4XN6R7nQu6BGciA",
 *                "updatedAt": null,
 *                "createdAt": "2018-01-18 15:11:40",
 *                "lastAccess": null,
 *                "gender": 1,
 *                "mobile": "773959699",
 *                "homePhone": "112925647",
 *                "status": 1,
 *                "timezone": "Asia/Colombo",
 *                "lastName": "Administrator",
 *                "createdBy": null,
 *                "updatedBy": null,
 *                "id": "5a5e12f85360b42011558d5a",
 *                "roleId": "5a56feb31605fa1ab8677e15",
 *                "role": {
 *                    "id": "5a56feb31605fa1ab8677e15",
 *                    "name": "Superadmin",
 *                    "permissions": [
 *                        {
 *                            "id": "5a56fe9a1605fa1ab8677e14",
 *                            "name": "Permission.Create"
 *                        }
 *                    ]
 *                },
 *                "email": null
 *            }
 *        },
 *        "message": ""
 *    }
 */


/************ Change Password *********/
 
/**
 * @api {post} http://<base-url>/user/change-password Change Password
 * @apiDescription Change password. 
 * - Response - "Common Response". Possible error codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>MISSING_MANDATORY_ATTRIBUTE
 * <br/>INVALID_OLD_PASSWORD
 *
 * @apiName ChangePassword
 * @apiGroup User
 *
 * @apiExample Example Request:
 *    {
 *      "oldPassword":"tes.123",
 *      "newPassword":"test.123"
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


/************ Verify Email *********/
 
/**
 * @api {post} http://<base-url>/user/verify-email Verify User Email
 * @apiDescription Verify email.
 * - Response - "Common Response".  Possible response codes are,
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 * <br/> INVALID_VERIFICATION_CODE
 * <br/> RECORD_NOT_FOUND
 *
 * @apiName VerifyEmail
 * @apiGroup User
 *
 * @apiExample Example Request:
 *    {
 *      "email":"you@yourmail.com"
 *      "code":"123456" // Code received via verify email.
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

/************ Forgot Password *********/
 
/**
 * @api {post} http://<base-url>/user/forgot-password Forgot Password
 * @apiDescription Endpoint to request for password reset. 
 * - Link to reset the password would be sent to user's registered email address
 * - Response - "Common Response"
 *
 * @apiName ForgotPassword
 * @apiGroup User
 *
 * @apiExample Example Request:
 *    {
 *      "email": "aruna470@gmail.com"
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

/************ Resend Verification Code *********/
 
/**
 * @api {post} http://<base-url>/user/resend-verification-code Resend Verification Code
 * @apiDescription Endpoint to request for verification code to be resend
 * - Email verification code would be sent to user's registered email address
 * - Response - "Common Response". Possible response codes are,
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 * <br/> RECORD_NOT_FOUND
 *
 * @apiName ResendVerificationCode
 * @apiGroup User
 *
 * @apiExample Example Request:
 *    {
 *      "email": "aruna470@gmail.com"
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

/************ Verify Password Reset Token *********/
 
/**
 * @api {post} http://<base-url>/user/verify-reset Verify Password Reset Token
 * @apiDescription Verify password reset token exists and not expired.
 * - Response - "Common Response". Possible response codes are,
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 * <br/> RECORD_NOT_FOUND
 *
 * @apiName VerifyReset
 * @apiGroup User
 *
 * @apiExample Example Request:
 *    {
 *      "email": "aruna470@gmail.com",
 *      "token": 123456
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

/************ Reset Password *********/
 
/**
 * @api {post} http://<base-url>/user/reset-password Reset Password
 * @apiDescription Endpoint to change account password using reset token. 
 * - Password reset confirmation email would be sent user's registered email address.
 * - Response - "Common Response". Possible response codes are,
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 * <br/> RECORD_NOT_FOUND
 *
 * @apiName ResetPassword
 * @apiGroup User
 *
 * @apiExample Example Request:
 *    {
 *      "password": "tes.123",
 *      "email": "aruna470@gmail.com",
 *      "token": 123456
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

/************ Get User Subscribed Shops *********/

/**
 * @api {get} http://<base-url>/user/:id/shops Get User's Shops
 * @apiDescription Retrieve user subscribed shops
 * - Authorization token required in header.
 * - Response - "Common Response" containig the list of Shop informations. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>RECORD_NOT_FOUND
 * <br/>PERMISSION_DENIED
 *
 * @apiName GetUserShops
 * @apiGroup User
 *
 * @apiParam {string} id User id.
 * @apiParam {Number[]} [subscriptionStatus] Subscription status as query param. 
 * <br/> Ex: ?subscriptionStatus=0,1
 * <br/>PENDING = 0,
 * <br/>APPROVED = 1,
 * <br/>REJECTED = 2,
 * <br/>UNSUBSCRIBED = 3
 *
* @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "shops": {
 *                "total": 1,
 *                "data": [
 *                    {
 *                        "brandName": "Magcity",
 *                        "businessName": "Magcity",
 *                        "registrationNumber": "123",
 *                        "streetName": "James Peris Mawatha",
 *                        "city": "Colombo",
 *                        "state": "Western",
 *                        "zip": 8080,
 *                        "phoneNumber": "+94773959689",
 *                        "homePhone": "112925647",
 *                        "faxNumber": "+94773959689",
 *                        "email": "magcity@gmail.com",
 *                        "gmail": "magcity@gmail.com",
 *                        "googlePlusUrl": "http://google.com",
 *                        "facebookPageUrl": "http://google.com",
 *                        "twitterPageUrl": "http://google.com",
 *                        "instagramPageUrl": "http://google.com",
 *                        "logoName": "logo.jpg",
 *                        "bannerImage": "banner.jpg",
 *                        "logo": "shop-flow-dev.s3.amazonaws.com/JD46TY0ETOYMB.jpg",
 *                        "banner": "shop-flow-dev.s3.amazonaws.com/JD46TZAJY20K6.jpg",
 *                        "id": "5a65b2e55d105a0e208935a0",
 *                        "subscriptionStatus": 1
 *                    }
 *                ]
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /user/5a3a4e096f6cd628e4d922a8/shops?status=1
 *
 */

 /************ Autocomplete users *********/
 
/**
 * @api {get} http://<base-url>/user/autcomplete/:name?userType Autocomplete Users
 * @apiDescription Search for user by name (firstName/lastName) returns 5 most matching results
 * - Authorization token required in header.
 * - Response - "Common Response" containig the partial user information. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>PERMISSION_DENIED
 * <br/>SUBCEED_CHARACTER_LENGTH
 *
 * @apiName AutocompleteUsers
 * @apiGroup User
 * 
 * @apiParam {string} name User name should be 3 or more characters.
 * @apiParam {string} [createdBy] Filter using createdBy userId.
 * @apiParam {int} [userType] User type for filtering
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "users": [
 *              {
 *                  "fullName": "AABCC XXY",
 *                  "email": "mail@user.com",
 *                  "id": "5a7435f05496072bb41d5100"
 *              },
 *              {
 *                  "fullName": "AABED XXY",
 *                  "email": "mail@user.com",
 *                  "id": "5a7435f05496072bb41d5100"
 *              }
 *          ]
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /user/autcomplete/abc
 *
 */

/************ Generate Sync Tool User *********/

/**
 * @api {post} http://<base-url>/generate-sync-tool-user-keys Generate Sync Tool User Keys
 * @apiDescription Generate API access keys for sync tool
 * - Authorization token required in header.
 * - Response - "Common Response". Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>PERMISSION_DENIED
 * <br/>MISSING_MANDATORY_ATTRIBUTE
 *
 * @apiName GenerateSyncToolUserKeys
 * @apiGroup User
 * 
 * @apiExample Example Request:
 *   {
 *      "shopId": "5ab332eecf49dc058c98cc7c"
 *   }
 *
 * @apiSuccessExample Success-Response:
 *   {
 *       "code": "SUCCESS",
 *       "attribute": null,
 *       "data": {
 *           "apiKey": "1o8w7fwjenzajew@sf.com",
 *           "apiSecret": "1o8w7fwjenzajes"
 *       },
 *       "message": ""
 *   }
 *
 * @apiExample Example Request:
 * /user/generate-sync-tool-user-keys?shopId=5a6ad448c80f921fc47c89ec
 *
 */

/************ Sync M1 Users *********/
 
/**
 * @api {post} http://<base-url>/user/sync-m1-users Sync M1 Users
 * @apiDescription Sync M1 Users. Sync Tool uses this end point
 * - Authorization token required in header.
 * - Response - "Common Response". Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>PERMISSION_DENIED
 * <br/>SOME_RECORDS_SYNCED
 *
 * @apiName SyncM1Users
 * @apiGroup User
 * 
 * @apiExample Example Request:
 *    {
 *    	"users": [
 *    		{
 *    			"firstName":"Nimal",
 *    			"lastName":"Guruge",
 *    			"email":"nimal@gmail.com"
 *    		}
 *    	]
 *    }
 *
 * @apiSuccessExample Success-Response:
 *   {
 *       "code": "SUCCESS",
 *       "attribute": null,
 *       "data": {
 *           "users": [
 *               "5ab332eecf49dc058c98cc7c"
 *           ]
 *       },
 *       "message": ""
 *   }
 *
 * @apiExample Example Request:
 * /user/sync-m1-users
 *
 */ 
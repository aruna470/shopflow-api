/************ Create Shop *********/
 
/**
 * @api {post} http://<base-url>/shop Create Shop
 * @apiDescription Add new shop
 * - Authorization token required in header.
 * - logoName, bannerName has to be fileName returned from S3 upload
 * - Refer "Shop Object" for necessary parameters. Following example illustrates the valid parameters for shop create.
 * Rest of the parameters described in "Shop Object" are used for viewing and some other requests.
 * - Response - "Common Response" with shop id. Possible response codes are,
 * <br/> PERMISSION_DENIED
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 * <br/> INVALID_EMAIL
 * <br/> INVALID_FAX
 * <br/> INVALID_PHONE 
 * <br/> INVALID_DATA_TYPE
 *
 * @apiName Create
 * @apiGroup Shop
 *
 * @apiExample Example Request:
 *    {
 *      "brandName":"Magcity",
 *      "businessName":"Magcity",
 *      "registrationNumber":"123",
 *      "streetName": "James Peris Mawatha",
 *      "city": "Colombo",
 *      "state": "Western",
 *      "zip": "8080",
 *      "phoneNumber": "+94773959689",
 *      "alternatePhoneNumber": "+94773959690",
 *      "faxNumber": "+94773959689",
 *      "email": "magcity@gmail.com",
 *      "alternateEmail": "magcityb@gmail.com",
 *      "gmail": "magcity@gmail.com",
 *      "googlePlusUrl": "http://google.com",
 *      "facebookPageUrl": "http://google.com",
 *      "twitterPageUrl": "http://google.com",
 *      "instagramPageUrl": "http://google.com",
 *      "logoName": "JD5HW8N2PA8WQ.jpg",
 *      "bannerName": "JD5HW8N2PA8WR.jpg",
 *      "shopOwner": "5a6ac1fd289fe72aac248476",
 *      "businessDays": [2,3,4,5,6],
 *      "businessHours": {
 *          "openTime": 0900,
 *          "closeTime": 1800
 *      },
 *      "shopManager": {
 *          "name": "John Mathews",
 *          "phone": "+94777777777",
 *          "email": "jmathews@sf.com"
 *      },
 *      "description": "some text description",
 *      "geoLocation": "6.96,79.88441728588873"
 *    }
 *
 */

/************ Update Shop *********/

/**
 * @api {put} http://<base-url>/shop/<id> Update Shop
 * @apiDescription Update existing shop details.
 * - Refer "Shop Object" for necessary parameters. Following example illustrates the valid parameters for shop update.
 * Rest of the parameters described in "Shop Object" are used for viewing and some other requests.
 * - Response - "Common Response". Possible response codes are,
 * <br/> PERMISSION_DENIED
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 * <br/> INVALID_EMAIL
 * <br/> INVALID_FAX
 * <br/> INVALID_PHONE
 * <br/> INVALID_USER_ID
 * <br/> INVALID_DATA_TYPE
 *
 * - Authorization token required in header.
 * - logoName, bannerName has to be fileName returned from S3 upload
 *
 * @apiName Update
 * @apiGroup Shop
 *
 * @apiExample Example Request:
 *    {
 *      "brandName":"Magcity",
 *      "businessName":"Magcity",
 *      "registrationNumber":"123",
 *      "streetName": "James Peris Mawatha",
 *      "city": "Colombo",
 *      "state": "Western",
 *      "zip": "8080",
 *      "phoneNumber": "+94773959689",
 *      "alternatePhoneNumber": "+94773959690",
 *      "faxNumber": "+94773959689",
 *      "email": "magcity@gmail.com",
 *      "alternateEmail": "magcityb@gmail.com",
 *      "gmail": "magcity@gmail.com",
 *      "googlePlusUrl": "http://google.com",
 *      "facebookPageUrl": "http://google.com",
 *      "twitterPageUrl": "http://google.com",
 *      "instagramPageUrl": "http://google.com",
 *      "logoName": "JD5HW8N2PA8WQ.jpg",
 *      "bannerName": "JD5HW8N2PA8WR.jpg",
 *      "shopOwner": "5a6ac1fd289fe72aac248476"
 *      "businessDays": [2,3,4,5,6],
 *      "businessHours": {
 *          "openTime": 0900,
 *          "closeTime": 1800
 *      },
  *      "shopManager": {
 *          "name": "John Mathews",
 *          "phone": "+94777777777",
 *          "email": "jmathews@sf.com"
 *      },
 *      "description": "some text description",
 *      "geoLocation": "6.96,79.88441728588873",
 *      "rewardStatus": 1
 *    }
 *
 */

/************ Get Shop *********/
 
/**
 * @api {get} http://<base-url>/shop/:id Get Shop
 * @apiDescription Retrieve existing shop details. 
 * - Response - "Common Response" containig the shop object
 * - Authorization token required in header.
 *
 * Possible response codes are,
 * <br/> PERMISSION_DENIED
 * <br/> SUCCESS
 * <br/> RECORD_NOT_FOUND
 *
 * @apiName GetShop
 * @apiGroup Shop
 *
 * @apiParam {string} id Shop id.
 *
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": {
 *            "shop": {
 *                "brandName": "Magcity",
 *                "businessName": "Magcity",
 *                "registrationNumber": "123",
 *                "streetName": "James Peris Mawatha",
 *                "city": "Colombo",
 *                "state": "Western",
 *                "zip": 8080,
 *                "phoneNumber": "+94773959689",
 *                "alternatePhoneNumber": "+94773959690",
 *                "faxNumber": "+94773959689",
 *                "email": "magcity@gmail.com",
 *                "alternateEmail": "magcityb@gmail.com",
 *                "gmail": "magcity@gmail.com",
 *                "googlePlusUrl": "http://google.com",
 *                "facebookPageUrl": "http://google.com",
 *                "twitterPageUrl": "http://google.com",
 *                "instagramPageUrl": "http://google.com",
 *                "logoName": "logo.jpg",
 *                "bannerImage": "banner.jpg",
 *                "updatedAt": null,
 *                "createdAt": "2018-01-22 09:46:13",
 *                "shopOwner": 5a6ac1fd289fe72aac248476,
 *                "logo": "shop-flow-dev.s3.amazonaws.com/JD46TY0ETOYMB.jpg",
 *                "banner": "shop-flow-dev.s3.amazonaws.com/JD46TZAJY20K6.jpg",
 *                "createdBy": {
 *                    "firstName": "Super",
 *                    "lastName": "Administrator"
 *                },
 *                "shopManager": {
 *                    "name": "John Mathews",
 *                    "phone": "+94777777777",
 *                    "email": "jmathews@sf.com"
 *                },
 *                "businessHours": {
 *                    "openTime": "0900",
 *                    "closeTime": "1700"
 *                },
 *                "businessDays": [
 *                     2,
 *                     3,
 *                     4,
 *                     5,
 *                     6
 *                ],
 *                "description": "Some text here",
 *                "updatedBy": null,
 *                "id": "5a65b2e55d105a0e208935a0",
 *                "subscriptionStatus": -1,
 *                "geoLocation": "6.96,79.88441728588873",
 *                "rewardStatus": 1
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /shop/5a65b2e55d105a0e208935a0
 *
 */

/************ List shops *********/
 
/**
 * @api {get} http://<base-url>/shop/list List shops
 * @apiDescription Retrieve list of shops. 
 * - Response - "Common Response" containig the shop objects
 * - Authorization token required in header.
 *
 * Possible response codes are
 * <br/> PERMISSION_DENIED
 * <br/> SUCCESS
 * <br/> FAIL
 * 
 * @apiName ListShops
 * @apiGroup Shop
 * 
 * @apiParam {String} [brandName] filter shops using brandName
 * @apiParam {String} [businessName] filter shops using businessName
 * @apiParam {String} [registrationNumber] filter shops using registrationNumber
 * @apiParam {String} [email] filter shops using email
 * @apiParam {ObjectId} [shopOwner] filter shops using shopOwner
 * @apiParam {ObjectId} [managedBy] filter shops managed by area manager
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "shops": {
 *                "total": 3,
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
 *                        "alternatePhoneNumber": "+94773959690",
 *                        "faxNumber": "+94773959689",
 *                        "email": "magcity@gmail.com",
 *                        "alternateEmail": "magcityb@gmail.com",
 *                        "gmail": "magcity@gmail.com",
 *                        "googlePlusUrl": "http://google.com",
 *                        "facebookPageUrl": "http://google.com",
 *                        "twitterPageUrl": "http://google.com",
 *                        "instagramPageUrl": "http://google.com",
 *                        "logoName": "logo.jpg",
 *                        "bannerImage": "banner.jpg",
 *                        "updatedAt": null,
 *                        "createdAt": "2018-01-22 09:46:13",
 *                        "shopOwner": 5a6ac1fd289fe72aac248476,
 *                        "logo": "shop-flow-dev.s3.amazonaws.com/JD46TY0ETOYMB.jpg",
 *                        "banner": "shop-flow-dev.s3.amazonaws.com/JD46TZAJY20K6.jpg",
 *                        "createdBy": {
 *                            "firstName": "Super",
 *                            "lastName": "Administrator"
 *                        }
 *                        "shopManager": {
 *                            "name": "John Mathews",
 *                            "phone": "+94777777777",
 *                            "email": "jmathews@sf.com"
 *                        },
 *                        "businessHours": {
 *                            "openTime": "0900",
 *                            "closeTime": "1700"
 *                        },
 *                        "businessDays": [
 *                            2,
 *                            3,
 *                            4,
 *                            5,
 *                            6
 *                        ],
 *                        "description": "Some text here",
 *                        "updatedBy": null,
 *                        "id": "5a65b2e55d105a0e208935a0",
 *                        "subscriptionStatus": -1,
 *                        "geoLocation": "6.96,79.88441728588873",
 *                        "rewardStatus" 1
 *                    }
 *                ]
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /shop/list
 *
 */

/************ Delete Shop *********/
 
/**
 * @api {delete} http://<base-url>/shop/:id Delete Shop
 * @apiDescription Delete existing shop. 
 * - Response - "Common Response"
 * - Authorization token required in header.
 *
 * @apiName DeleteShop
 * @apiGroup Shop
 *
 * @apiParam {string} id Shop id.
 * @apiParam {boolean} [force] set to 1 or 'true' to force delete the shop and its dependencies
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
 * /shop/5a3a4e096f6cd628e4d922a8
 *
 */

 /************ Get Subscribed Car Owners *********/

/**
 * @api {get} http://<base-url>/shop/:id/car-owners Get Shop's CarOwners
 * @apiDescription Retrieve subscribed carowners
 * - Authorization token required in header.
 * - Response - "Common Response" containig the list of User informations. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>RECORD_NOT_FOUND
 * <br/>PERMISSION_DENIED
 *
 * @apiName GetShopUsers
 * @apiGroup Shop
 *
 * @apiParam {string} id Shop id.
 * @apiParam {string} [status] Subscription status as query param.
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
 *                        "role": {
 *                              "id": "5a65a205858467622d026eb8",
 *                              "name": "CarOwner"
 *                        },
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
 *                        "sysEmail": null
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
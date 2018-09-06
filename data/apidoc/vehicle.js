/************ List Vehicles *********/
 
/**
 * @api {post} http://<base-url>/vehicle/list List Vehicles
 * @apiDescription List Vehicle records. Any user can request their own vehicle records without additional permission.
 * - Response - "Common Response" containig the Vehicle objects. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * - Authorization token required in header.
 * <br/><b>Sorting also possible using:</b> firstName, lastName, createdAt and other fields
 *
 * @apiName ListVehicles
 * @apiGroup Vehicle
 *
 * @apiParam {string} [userId] UserId for filtering
 * @apiParam {string} [shopId] ShopId for filtering
 * @apiParam {string} [make] Vehicle make for filtering
 * @apiParam {string} [model] Vehicle model for filtering
 * @apiParam {number} [pageNo] Page number.
 * @apiParam {number} [limit] Records per page.
 * @apiParam {string} [sort] Sorting field. Prepend "-" for decending, otherwise ascending. 
 * @apiExample Example Request:
 * /vehicle/list
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "vehicles": {
 *                "total": 9,
 *                "data": [
 *                    {
 *                        "shopId": "5a6ad448c80f921fc47c89ec",
 *                        "updatedAt": "2018-04-04 10:34:24",
 *                        "createdAt": "2018-04-04 10:34:24",
 *                        "mfgDate": "1980-01-01 00:00:00",
 *                        "lastInDate": "2015-06-15 13:54:40",
 *                        "inspDate": "2015-05-31 00:00:00",
 *                        "odometer": 9958524,
 *                        "vehicleId": 582,
 *                        "model": "XC70 ",
 *                        "name": "2004 Volvo XC70",
 *                        "year": 2004,
 *                        "licenseNumber": "GTP1531",
 *                        "make": "Volvo",
 *                        "id": "5ac4aa30cf3dad10a8c44d17",
 *                        "user": {
 *                            "id": "5ac48f7f9f504b39ac9e5c2c",
 *                            "firstName": "Daniel",
 *                            "lastName": "Warner"
 *                        }
 *                    },
 *                    {
 *                        "shopId": "5a6ad448c80f921fc47c89ec",
 *                        "updatedAt": "2018-04-04 10:34:24",
 *                        "createdAt": "2018-04-04 10:34:24",
 *                        "mfgDate": "2015-10-14 00:00:00",
 *                        "lastInDate": null,
 *                        "inspDate": "2015-10-14 00:00:00",
 *                        "odometer": 0,
 *                        "vehicleId": 637,
 *                        "model": "Sprinter 2500",
 *                        "name": "2006 Dodge Sprinter",
 *                        "year": 2006,
 *                        "licenseNumber": "YZC0161",
 *                        "make": "Dodge",
 *                        "id": "5ac4aa30cf3dad10a8c44d16",
 *                        "user": {
 *                            "id": "5ac48f7f9f504b39ac9e5c2c",
 *                            "firstName": "Daniel",
 *                            "lastName": "Warner"
 *                        }
 *                    },
 *                    {
 *                        "shopId": "5a6ad448c80f921fc47c89ec",
 *                        "updatedAt": "2018-04-04 10:34:24",
 *                        "createdAt": "2018-04-04 10:34:24",
 *                        "mfgDate": "2016-03-08 00:00:00",
 *                        "lastInDate": null,
 *                        "inspDate": "2016-03-08 00:00:00",
 *                        "odometer": 0,
 *                        "vehicleId": 643,
 *                        "model": "",
 *                        "name": "0  ",
 *                        "year": null,
 *                        "licenseNumber": "YSJ9622",
 *                        "make": "",
 *                        "id": "5ac4aa30cf3dad10a8c44d15",
 *                        "user": {
 *                            "id": "5ac48f7f9f504b39ac9e5c2a",
 *                            "firstName": "Dan",
 *                            "lastName": "Tules"
 *                        }
 *                    }
 *                ]
 *            }
 *        },
 *        "message": ""
 *    }
 */

/************ Get Vehicle *********/
 
/**
 * @api {post} http://<base-url>/vehicle/:id Get Vehicle
 * @apiDescription Get Vehicle record. Any user can request their own vehicle record without additional permission.
 * - Response - "Common Response" containig the Vehicle object. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>RECORD_NOT_FOUND
 * <br/>PERMISSION_DENIED
 * - Authorization token required in header.
 *
 * @apiName GetVehicle
 * @apiGroup Vehicle
 *
 * @apiExample Example Request:
 * /vehicle/5ac331990f67c617da6046ee
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": {
 *            "vehicle": {
 *                "shopId": "5a6ad448c80f921fc47c89ec",
 *                "updatedAt": "2018-04-04 10:34:24",
 *                "createdAt": "2018-04-04 10:34:24",
 *                "mfgDate": "1980-01-01 00:00:00",
 *                "lastInDate": "2015-06-15 13:54:40",
 *                "inspDate": "2015-05-31 00:00:00",
 *                "odometer": 9958524,
 *                "vehicleId": 582,
 *                "model": "XC70 ",
 *                "name": "2004 Volvo XC70",
 *                "year": 2004,
 *                "licenseNumber": "GTP1531",
 *                "make": "Volvo",
 *                "id": "5ac4aa30cf3dad10a8c44d17",
 *                "user": {
 *                    "id": "5ac48f7f9f504b39ac9e5c2c",
 *                    "firstName": "Daniel",
 *                    "lastName": "Warner"
 *                }
 *            }
 *        },
 *        "message": ""
 *    }
 */

/************ Sync Vehicles *********/
 
/**
 * @api {post} http://<base-url>/vehicle/sync-vehicles Sync vehicles
 * @apiDescription This method is given for Sync tool to sync M1 vehicles. It will insert new records and update existing records
 * - Refer "Vehicle Object" for necessary parameters. Following example illustrates the valid parameters for vehicle create/update.
 * Rest of the parameters described in "Vehicle Object" are used for viewing and some other requests.
 * - Response - "Common Response"
 * - Authorization token required in header.
 *
 * @apiName Create
 * @apiGroup Vehicle
 *
 * @apiExample Example Request:
 *    {
 *      "vehicles": [
 *        {
 *          "make":"Toyota1",
 *          "licenseNumber":"CAH-6227",
 *          "year":"2015",
 *          "name":"Toyota Axio 2015",
 *          "model":"Axio",
 *          "vehicleId":125,
 *          "custEmail":"Dan.Warner@mitchell1.com",
 *          "mfgDate": "1980-01-01 00:00:00",
 *          "lastInDate": "2015-06-15 13:54:40",
 *          "inspDate": "2015-05-31 00:00:00",
 *          "odometer": 9958524,
 *        }
 *      ]
 *    }
 */


/************ Delete Vehicle *********/
 
/**
 * @api {delete} http://<base-url>/vehicle/:id Delete Vehicle
 * @apiDescription Delete existing vehicle. 
 * - Response - "Common Response"
 * - Authorization token required in header.
 *
 * @apiName DeleteVehicle
 * @apiGroup Vehicle
 *
 * @apiParam {string} id Vehicle id.
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
 * /vehicle/5a3a4e096f6cd628e4d922a8
 *
 */
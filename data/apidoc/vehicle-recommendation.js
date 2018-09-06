/************ List Vehicles Recommendation *********/
 
/**
 * @api {get} http://<base-url>/vehicle-recommendation/list List Vehicles Recommendations
 * @apiDescription List Vehicle recommendation records. Any user can request their own vehicle repair recommendation records without additional permission.
 * - Response - "Common Response" containig the VehicleRecommendation objects. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>PERMISSION_DENIED
 * - Authorization token required in header.
 *
 * @apiName ListVehicleRecommendations
 * @apiGroup VehicleRecommendation
 *
 * @apiParam {string} [userId] UserId for filtering
 * @apiParam {string} [shopId] ShopId for filtering
 * @apiParam {string} [vehicleId] VehicleId for filtering
 * @apiParam {string} [start] recommendation date start value in format <b>YYYY-MM-DD</b>
 * @apiParam {string} [end] recommendation date end value in format <b>YYYY-MM-DD</b>
 * @apiParam {number} [pageNo] Page number.
 * @apiParam {number} [limit] Records per page.
 * @apiParam {string} [sort] Sorting field. Prepend "-" for decending, otherwise ascending. 
 * @apiExample Example Request:
 * /vehicle-recommendation/list
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "vehicleRecommendations": {
 *                "total": 2,
 *                "data": [
 *                  {
 *                      "shopId": "5a6f035a318ff528089bb857",
 *                      "vehicleId": "5ac32fca0f67c617da60457e",
 *                      "createdAt": "2018-04-18 05:24:56",
 *                      "updatedAt": "2018-04-18 05:24:56",
 *                      "isNotified": 0,
 *                      "recommendDate": "2000-06-25T00:00:00.000Z",
 *                      "description": "R4 Print recommendation",
 *                      "m1VehicleId": 126,
 *                      "recommendationId": 1815,
 *                      "id": "5ad6d6a8b527e96dbb6d04e3",
 *                      "user": {
 *                          "id": "5a8c0af12c12042d143f359a",
 *                          "firstName": "Dan",
 *                          "lastName": "ShopFlow"
 *                      }
 *                 },
*                  {
 *                      "shopId": "5a6f035a318ff528089bb857",
 *                      "vehicleId": "5ac32fca0f67c617da60457e",
 *                      "createdAt": "2018-04-18 05:24:56",
 *                      "updatedAt": "2018-04-18 05:24:56",
 *                      "isNotified": 0,
 *                      "recommendDate": "2000-06-25T00:00:00.000Z",
 *                      "description": "R3 Print recommendation",
 *                      "m1VehicleId": 126,
 *                      "recommendationId": 1817,
 *                      "id": "5ad6d6a8b527e96dbb6d04e4",
 *                      "user": {
 *                          "id": "5a8c0af12c12042d143f359a",
 *                          "firstName": "Dan",
 *                          "lastName": "ShopFlow"
 *                      }
 *                  }
 *                ]
 *            }
 *        },
 *        "message": ""
 *    }
 */

 /************ Get Vehicle Repair Recommendation *********/
 
/**
 * @api {get} http://<base-url>/vehicle-recommendation/:id Get Vehicle Recommendation
 * @apiDescription Get Vehicle  Repair Recommendation Record. Any user can request their own vehicle repair  recommendation record without additional permission.
 * - Response - "Common Response" containig the Vehicle object. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>RECORD_NOT_FOUND
 * <br/>PERMISSION_DENIED
 * - Authorization token required in header.
 *
 * @apiName GetVehicleRecommendation
 * @apiGroup VehicleRecommendation
 *
 * @apiExample Example Request:
 * vehicle-recommendation/5ad6d6a8b527e96dbb6d04e3
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": {
 *          "vehicleRecommendation": {
 *              "shopId": "5a6f035a318ff528089bb857",
 *              "vehicleId": "5ac32fca0f67c617da60457e",
 *              "createdAt": "2018-04-18 05:24:56",
 *              "updatedAt": "2018-04-18 05:24:56",
 *              "isNotified": 0,
 *              "recommendDate": "2000-06-25T00:00:00.000Z",
 *              "description": "R4 Print recommendation",
 *              "m1VehicleId": 126,
 *              "recommendationId": 1815,
 *              "id": "5ad6d6a8b527e96dbb6d04e3",
 *              "user": {
 *                  "id": "5a8c0af12c12042d143f359a",
 *                  "firstName": "Dan",
 *                  "lastName": "ShopFlow"
 *              }
 *          }
 *        },
 *        "message": ""
 *    }
 */

/************ Sync Vehicle Recommendations *********/
 
/**
 * @api {post} http://<base-url>/vehicle-recommendation/sync-recommendations Sync vehicle recommendations
 * @apiDescription This method is given for Sync tool to sync M1 vehicle recommendations. It will insert new records and update existing records
 * - Refer "Vehicle Recommendation Object" for necessary parameters. Following example illustrates the valid parameters for vehicle recommendation create/update.
 * Rest of the parameters described in "Vehicle Recommendation Object" are used for viewing and some other requests.
 * - Response - "Common Response"
 * - Authorization token required in header.
 *
 * @apiName Create
 * @apiGroup VehicleRecommendation
 *
 * @apiExample Example Request:
 *    {
 *      "vehicleRecommendations": [
 *        {
 *          "action": A,
 *          "m1VehicleId": 642,
 *          "recommendationId": 1812,
 *          "recommendDate": "2000-06-25",
 *          "description": "NEED TO R&R HEAD, INSPECT AND RESEAL"
 *        },
 *        {
 *          "action": U,
 *          "m1VehicleId": 642,
 *          "recommendationId": 1813,
 *          "recommendDate": "2000-06-25",
 *          "description": "Print recommendation"
 *        }
 *      ]
 *    }
 */

/************ Delete Recommendation *********/
 
/**
 * @api {delete} http://<base-url>/vehicle-recommendation/:id Delete Vehicle Recommendation
 * @apiDescription Delete existing vehicle Recommendation record. 
 * - Response - "Common Response"
 * - Authorization token required in header.
 *
 * @apiName DeleteVehicleRecommendation
 * @apiGroup VehicleRecommendation
 *
 * @apiParam {string} id Vehicle recommendation record id.
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
 * /vehicle-recommendation/5a3a4e096f6cd628e4d922a8
 *
 */

/************ Sync Deleted Recommendations *********/
 
/**
 * @api {put} http://<base-url>/vehicle-recommendation/sync-deleted Sync deleted vehicle recommendations
 * @apiDescription Compare synced recommendations ids sent from sync tool and delete deleted ones from SF DB. 
 * - Response - "Common Response"
 * - Authorization token required in header.
 *
 * @apiName SyncDeletedRecommendation
 * @apiGroup VehicleRecommendation
 *
 * @apiParam {string} [recommendationIds] List of recommendation ids.
 * @apiParam {date} shopId Date(today).
 *
 * @apiExample Example Request:
 *    {
 *      "recommendationIds": [214, 216, 213, 225, 209, 212, 215],
 *      "date":"2018-06-20"
 *    }
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
 * /vehicle-recommendation/5a3a4e096f6cd628e4d922a8
 *
 */
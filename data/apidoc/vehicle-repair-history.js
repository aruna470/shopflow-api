/************ List Vehicles Repair History *********/
 
/**
 * @api {get} http://<base-url>/vehicle-repair-history/list List Vehicles Histories
 * @apiDescription List Vehicle repair history records. Any user can request their own vehicle repair history records without additional permission.
 * - Response - "Common Response" containig the VehicleRepairHistory objects. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>PERMISSION_DENIED
 * - Authorization token required in header.
 *
 * @apiName ListVehicleRepairHistories
 * @apiGroup VehicleRepairHistory
 *
 * @apiParam {string} [userId] UserId for filtering
 * @apiParam {string} [shopId] ShopId for filtering
 * @apiParam {string} [vehicleId] VehicleId for filtering
 * @apiParam {number} [pageNo] Page number.
 * @apiParam {number} [limit] Records per page.
 * @apiParam {string} [sort] Sorting field. Prepend "-" for decending, otherwise ascending. 
 * @apiExample Example Request:
 * /vehicle-repair-history/list
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "vehicleRepairHistory": {
 *                "total": 2,
 *                "data": [
 *                  {
 *                      "shopId": "5a6f035a318ff528089bb857",
 *                      "vehicleId": "5ac32fca0f67c617da60457e",
 *                      "createdAt": "2018-04-18 05:24:56",
 *                      "updatedAt": "2018-04-18 05:24:56",
 *                      "description": "ENGINE - ANALYZE [B]",
 *                      "odometer": 123654,
 *                      "dateOfService": "2000-04-25T00:00:00.000Z",
 *                      "invoiceNo": 329,
 *                      "lineItemId": 1611,
 *                      "repairOrderId": 1813,
 *                      "m1VehicleId": 125,
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
 *                      "description": "ENGINE - ANALYZE [A]",
 *                      "odometer": 123654,
 *                      "dateOfService": "2000-04-25T00:00:00.000Z",
 *                      "invoiceNo": 329,
 *                      "lineItemId": 1611,
 *                      "repairOrderId": 1813,
 *                      "m1VehicleId": 125,
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

/************ Get Vehicle Repair History *********/
 
/**
 * @api {get} http://<base-url>/vehicle-repair-history/:id Get Vehicle Repair History
 * @apiDescription Get Vehicle  Repair History Record. Any user can request their own vehicle repair history record without additional permission.
 * - Response - "Common Response" containig the VehicleRepairHistory object. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>RECORD_NOT_FOUND
 * <br/>PERMISSION_DENIED
 * - Authorization token required in header.
 *
 * @apiName GetVehicleRepairHistory
 * @apiGroup VehicleRepairHistory
 *
 * @apiExample Example Request:
 * vehicle-repair-history/5ad6d6a8b527e96dbb6d04e3
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": {
 *          "vehicleRepairHistory": {
 *              "shopId": "5a6f035a318ff528089bb857",
 *              "vehicleId": "5ac32fca0f67c617da60457e",
 *              "createdAt": "2018-04-18 05:24:56",
 *              "updatedAt": "2018-04-18 05:24:56",
 *              "description": "ENGINE - ANALYZE [B]",
 *              "odometer": 123654,
 *              "dateOfService": "2000-04-25T00:00:00.000Z",
 *              "invoiceNo": 329,
 *              "lineItemId": 1611,
 *              "repairOrderId": 1813,
 *              "m1VehicleId": 125,
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

/************ Sync Vehicle Repair History *********/
 
/**
 * @api {post} http://<base-url>/vehicle-repair-history/sync-histories Sync vehicle repair histories
 * @apiDescription This method is given for Sync tool to sync M1 vehicle repair histories. It will insert new records and update existing records
 * - Refer "Vehicle Repair History Object" for necessary parameters. Following example illustrates the valid parameters for vehicle repair history create/update.
 * Rest of the parameters described in "Vehicle Repair History Object" are used for viewing and some other requests.
 * - Response - "Common Response"
 * - Authorization token required in header.
 *
 * @apiName Create
 * @apiGroup VehicleRepairHistory
 *
 * @apiExample Example Request:
 *    {
 *      "vehicleRepairHistory": [
 *        {
 *          "m1VehicleId": 642,
 *          "repairOrderId": 1812,
 *          "lineItemId": 1611,
 *          "invoiceNo": 329,
 *          "dateOfService": "2000-04-25",
 *          "odometer": 123654,
 *          "description": "ENGINE - ANALYZE [B]"
 *        },
 *        {
 *          "m1VehicleId": 642,
 *          "repairOrderId": 1812,
 *          "lineItemId": 1612,
 *          "invoiceNo": 329,
 *          "dateOfService": "2000-04-25",
 *          "odometer": 123654,
 *          "description": "R&R SPARK PLUGS"
 *        }
 *      ]
 *    }
 */


/************ Delete Vehicle *********/
 
/**
 * @api {delete} http://<base-url>/vehicle-repair-history/:id Delete Vehicle Reapir History
 * @apiDescription Delete existing vehicle repair history record. 
 * - Response - "Common Response"
 * - Authorization token required in header.
 *
 * @apiName DeleteVehicleRepairHistory
 * @apiGroup VehicleRepairHistory
 *
 * @apiParam {string} id Vehicle repair history record id.
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
 * /vehicle-repair-history/5a3a4e096f6cd628e4d922a8
 *
 */
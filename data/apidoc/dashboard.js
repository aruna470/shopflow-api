/************ Get shop-owner dashboard statistics *********/

/**
 * @api {get} http://<base-url>/dashboard/shop-owner/statistics Get ShopOwner Dashboard Statistics
 * @apiDescription Get statistics for shop-owner dashboard of requested shop owner
 * - Authorization token required in header.
 * - Response - "Common Response". Possible response codes are,
 * <br/> SUCCESS
 * <br/> FAIL
 *
 * @apiName GetShopOwnerDashboardStatistics
 * @apiGroup Dashboard
 *
 * @apiExample Example Request:
 * /dashboard/shop-owner/statistics
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": {
 *          "shopCount": 3,
 *          "userCount": 2
 *        },
 *        "message": ""
 *    }
 */

 /************ Get shop statistics for shop-owner dashboard  *********/

/**
 * @api {get} http://<base-url>/dashboard/shop/:id/statistics Get Shop Statistics
 * @apiDescription Get shop statistics for shop-owner dashboard of requested shop owner
 * - Authorization token required in header.
 * - Response - "Common Response". Possible response codes are,
 * <br/> SUCCESS
 * <br/> FAIL
 *
 * @apiName GetShopStatistics
 * @apiGroup Dashboard
 *
 * @apiExample Example Request:
 * /dashboard/shop/5ab9e33d0d7ca81b8cb8ed3/statistics
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": {
 *          "shopCount": 1,
 *          "userCount": 2,
 *          "vehicleCount": 9,
 *          "appointmentRequestCount": 3,
 *          "chatCount": 2
 *        },
 *        "message": ""
 *    }
 */


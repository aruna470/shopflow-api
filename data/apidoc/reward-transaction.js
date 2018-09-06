/************ Create Reward Transaction *********/
 
/**
 * @api {post} http://<base-url>/reward-transaction Add/Redeem Reward
 * @apiDescription Add/Redeem Reward points of a user
 * - Authorization token required in header.
 * - Refer "RewardTransaction Object" for necessary parameters. Following example illustrates the valid parameters for creating reward transaction.
 * Rest of the parameters described in "RewardTransaction Object" are used for viewing and some other requests.
 * - Response - "Common Response" with RewardTransaction id. Possible response codes are,
 * <br/> PERMISSION_DENIED
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 * <br/> USER_NOT_SUBSCRIBED
 * <br/> INSUFFICIENT_POINTS
 * @apiParam {String} userId User ID
 * @apiParam {String} shopId Shop ID
 * @apiParam {Number} points Transaction reward points
 * @apiParam {Number} action 0 - Add, 1 - Redeem points
 * @apiParam {String} [remarks] Remark for the transaction
 * @apiName CreateRewardTransaction
 * @apiGroup RewardTransaction
 *
 * @apiExample Example Request:
 *    {
 *    	"shopId": "5ad58a7f78d2130704b3ce05",
 *    	"userId": "5ad5908836e28a2500ab6bff",
 *    	"remarks": "You deserve this",
 *    	"points": 5,
 *      "action": 0
 *    }
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *      "code": "SUCCESS",
 *      "attribute": "",
 *      "data": {
 *      "rewardTransaction": {
 *          "updatedAt": "2018-08-27 07:16:49",
 *          "createdAt": "2018-08-27 07:16:49",
 *          "rewardId": "5b7bc08b312ac30b3c9cdd7b",
 *          "shopId": "5b7bb7d736492f20bc6f0894",
 *          "remarks": "Reward for your loyality",
 *          "points": 1,
 *          "action": 0,
 *          "createdBy": {
 *              "firstName": "shop-owner",
 *              "lastName": "layansan"
 *          },
 *          "updatedBy": null,
 *          "id": "5b83a561481bc93b10a6d349",
 *          "user": {
 *              "id": "5b7bb55d0491aecd3cb426ab",
 *              "firstName": "car-owner",
 *              "lastName": "layansan",
 *              "company": "keeneye"
 *              }
 *          }
 *      },
 *  "message": ""
}
 *
 */

/************ Reward Transaction List *********/

/**
 * @api {get} http://<base-url>/reward-transaction/list?shopId={shopId}&userId={userId} List Reward Transactions
 * @apiDescription Retrieve Reward Transaction List.
 * - Refer "RewardTransaction Object" for necessary parameters. Following example illustrates the valid parameters for Reward Transaction list.
 * Rest of the parameters described in "RewardTransaction Object" are used for viewing and some other requests.
 * - Response - "Common Response" containig the shop objects. Possible response codes are
 * <br/> PERMISSION_DENIED
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 *
 * - Authorization token required in header.
 *
 * @apiName ListRewardTransaction
 * @apiGroup RewardTransaction
 *
 * @apiParam {String} shopId Shop id (required).
 * @apiParam {String} userId User id (required).
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "rewardTransactions": {
 *                "total": 2,
 *                "data": [
 *                    {
 *                        "updatedAt": "2018-06-05 06:06:46",
 *                        "createdAt": "2018-06-05 06:06:46",
 *                        "rewardId": "5ad58a7f78d2130704b3ce05",
 *                        "remarks": "Points added",
 *                        "points": 2,
 *                        "action": 0,
 *                        "createdBy": {
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        },
 *                        "id": "5b162876f96bc2069c5b8c18",
 *                        "user": {
 *                            "id": "5b7bb55d0491aecd3cb426ab",
 *                            "firstName": "layansan",
 *                            "lastName": "rajendram",
 *                            "company": "keeneye"
 *                        }
 *                    },
 *                    {
 *                        "updatedAt": "2018-06-05 06:06:46",
 *                        "createdAt": "2018-06-05 06:06:46",
 *                        "rewardId": "5ad58a7f78d2130704b3ce05",
 *                        "remarks": "Points redeemed",
 *                        "points": 2,
 *                        "action": 1,
 *                        "createdBy": {
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        },
 *                        "id": "5b162876f96bc2069c5b8c19"
 *                        "user": {
 *                            "id": "5b7bb55d0491aecd3cb426ab",
 *                            "firstName": "layansan",
 *                            "lastName": "rajendram",
 *                            "company": "keeneye"
 *                        }
 *                    },
 *                ]
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /reward-transaction/list?shopId=5a6f035a318ff528089bb857&userId=5a8c0af12c12042d143f359a
 */
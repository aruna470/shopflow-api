/************ Reward List *********/

/**
 * @api {get} http://<base-url>/reward/list?shopId=<shopId> List rewards
 * @apiDescription Retrieve rewards
 * - Refer "Reward Object". Following example illustrates the valid parameters for reward list.
 * Rest of the parameters described in "Reward Object" are used for viewing and some other requests.
 * - Response - "Common Response" containig the reward objects. Possible response codes are
 * <br/> PERMISSION_DENIED
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 *
 * - Authorization token required in header.
 *
 * @apiName ListRewards
 * @apiGroup Reward
 *
 * @apiParam {String} [shopId] Shop id. (Mandatory for shop owner)
 * @apiParam {String} [userId] User id for filtering
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "rewards": {
 *                "total": 2,
 *                "data": [
 *                    {
 *                        "updatedAt": "2018-06-05 06:06:46",
 *                        "createdAt": "2018-06-05 06:06:46",
 *                        "shopId": "5ad58a7f78d2130704b3ce05",
 *                        "points": 0,
 *                        "readStatus": 0,
 *                        "createdBy": {
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        },
 *                        "updatedBy": null,
 *                        "id": "5b162876f96bc2069c5b8c18",
 *                        "user": {
 *                            "id": "5ad58a1178d2130704b3ce04",
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        }
 *                    },
 *                    {
 *                        "updatedAt": "2018-06-05 03:44:30",
 *                        "createdAt": "2018-06-05 03:44:30",
 *                        "shopId": "5ad58a7f78d2130704b3ce05",
 *                        "points": 5,
 *                        "createdBy": {
 *                            "firstName": "John",
 *                            "lastName": "Dwulet"
 *                        },
 *                        "updatedBy": null,
 *                        "id": "5b16071ee880590288787dcf",
 *                        "user": {
 *                            "id": "5ad58a1178d2130704b3ce04",
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        }
 *                    }
 *                ]
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /reward/list?shopId=5a6f035a318ff528089bb857
 */

 /************ Get Reward *********/
 
/**
 * @api {get} http://<base-url>/reward?userId=:id&shopId=:id Get Reward
 * @apiDescription Retrieve Reward by userId and shopId. 
 * - Authorization token required in header.
 * - Response - "Common Response" containig the user object. Possible response codes are,
 * <br/> PERMISSION_DENIED
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>RECORD_NOT_FOUND
 *
 * @apiName GetReward
 * @apiGroup Reward
 *
 * @apiParam {String} shopId  Shop id.
 * @apiParam {String} userId  User id.
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": {
 *            "reward": {
 *                "updatedAt": null,
 *                "createdAt": "2017-12-20 11:48:25",
 *                "shopId": "5a6f035a318ff528089bb857",
 *                "points": 1,
 *                "createdBy": {
 *                  "firstName": "Layansan",
 *                  "lastName": "Rajendram"
 *                },
 *                "updatedBy": null,
 *                "id": "5b72a0fc44210707906eb3a7",
 *                "user": {
 *                  "id": "5a8c0af12c12042d143f359a",
 *                  "firstName": "Layansan",
 *                  "lastName": "Rajendram"
 *                }
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /reward?shopId=5a6f035a318ff528089bb857&userId=5a8c0af12c12042d143f359a
 *
 */
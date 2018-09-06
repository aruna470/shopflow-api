/************ Invite User *********/

/**
 * @api {post} http://<base-url>/shop-invite Invite User using Email address
 * @apiDescription Invite user to a shop
 * User will get an email with invitation to join the shop
 * - Authorization token required in header.
 *
 * - Response - "Common Response". Possible response codes are,
 * <br/> PERMISSION_DENIED
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 * <br/> RECORD_NOT_FOUND
 * <br/> ALREADY_SUBSCRIBED
 *
 * @apiName Invite User
 * @apiGroup ShopInvite
 *
 * @apiExample Example Request:
 *    {
 *      "shopId": "5a794842876dfb2e8c1d714a"
 *      "email": "user@yourmail.com"
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

/************ Verify Invite *********/

/**
 * @api {post} http://<base-url>/shop-invite/:code/verify Verify Invitation
 * @apiDescription Verify shop invite code
 * - Authorization token not required.
 *
 * - Response - "Common Response" with invitation detail. Possible response codes are,
 * <br/> INVALID_INVITE_CODE
 * <br/> SUCCESS
 *
 * @apiName Verify Invitation
 * @apiGroup ShopInvite
 *
 * @apiExample Example Request:
 * shop-invite/5a7bda08b631441be0ae5b34/verify
 * 
 * @apiSuccessExample Success-Response:
 *      {
 *          "code": "SUCCESS",
 *          "attribute": "",
 *          "data": {
 *              "invitation": {
 *                  "email": "layansan@keeneye.solutions",
 *                  "shop": "5a794842876dfb2e8c1d714a",
 *                  "registered": true,
 *                  "subscribed": true
 *              }
 *          },
 *          "message": ""
 *      }
 */

/************ Subscribe to Shop *********/

/**
 * @api {post} http://<base-url>/shop-invite/:code/subscribe Subscribe to Shop
 * @apiDescription Subscribe registered user to a shop using invite code
 * - Authorization token required in header.
 *
 * - Response - "Common Response". Possible response codes are,
 * <br/> INVALID_INVITE_CODE
 * <br/> SUCCESS
 * <br/> PERMISSION_DENIED
 * <br/> FAIL
 * <br/> RECORD_NOT_FOUND
 * <br/> ALREADY_SUBSCRIBED
 *
 * @apiName Subscribe to Shop
 * @apiGroup ShopInvite
 *
 * @apiExample Example Request:
 * shop-invite/5a7bda08b631441be0ae5b34/subscribe
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": "",
 *        "message": ""
 *    }
 */

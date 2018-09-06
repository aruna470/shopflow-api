/************ Post Invite to Review on Google *********/

/**
 * @api {post} http://<base-url>/google-review/invite Invite to Review on Google
 * @apiDescription Invite User to review business on Google
 * <br/>
 * - Response - "Common Response". Possible response codes are,
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 * <br/> PERMISSION_DENIED
 *
 * @apiName Google Review Invite
 * @apiGroup GoogleReview
 *
 * @apiParam {ObjectId} shopId Shop ObjectId which has to be reviewed
 * @apiParam {ObjectId} userId  CarOwner User ObjectId
 * @apiParam {String} [placeId]  Google business PlaceId. This is mandotary if placeId is not specified in Shop the profile.
 * In case it is specified in both places placeId in the request will be used
 *  
 * @apiExample Example Request:
 *    {
 *      "userId": "5a7435f05496072bb41d5e63",
 *      "shopId": "5a794842876dfb2e8c1d714a",
 *      "placeId": "ChIJ13Jw0wxZ4joR1JDgjjjj-Xk",
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

 
/************ List Google Review Invites *********/
 
/**
 * @api {get} http://<base-url>/google-review/invite/list List Google Review Invites
 * @apiDescription Retrieve list of Google Review Invites for the user. 
 * - Response - "Common Response" containig the google review invite objects
 *
 * @apiName ListGoogleReviewInvite
 * @apiGroup GoogleReview
 *
 * @apiParam {string} [userId] Filter by Invite receiver's userId
 * @apiParam {string} [status] Filter by Invitation status
 * @apiParam {string} [shopId] Filter by Invitation by shopId.
 * @apiParam {number} pageNo Page number.
 * @apiParam {number} limit Records per page.
 * @apiParam {string} sort Sorting field. Prepend "-" for decending, otherwise ascending. 
 * Possible sort fields are - createdAt
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *              "googleReviewInvite": {
 *                  "total": 1,
 *                  "data": [
 *                      "endpointArn": [
 *                          "arn:aws:sns:us-east-1:075215484795:endpoint/GCM/dev-sf-android/f1edd961-0000-3d9d-837e-82e353f29594"
 *                      ],
 *                      "deviceType": [ 1 ],
 *                      "status": 0,
 *                      "createdAt": "2018-03-08 07:48:39",
 *                      "updatedAt": null,
 *                      "createdById": "5a8c0af12c12042d143f359a",
 *                      "updatedById": null,
 *                      "title": "ShopFlow",
 *                      "message": "Review img1 on Google",
 *                      "placeId": "ChIJ13Jw0wxZ4joR1JDg6woe-Xk",
 *                      "userId": "5a8c0af12c12042d143f359a",
 *                      "shopId": "5a72bb075fa38e2440255f7d",
 *                      "link": "https://goo.gl/tFskJ9",
 *                      "id": "5aa0ead709d24609385e4d80"
 *                ]
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /google-review/invite/list
 *
 */

/************ Get Google Review Invite *********/
 
/**
 * @api {get} http://<base-url>/google-review/invite/{id} Get Google Review Invites
 * @apiDescription Get Google Review Invite. 
 * - Response - "Common Response" containig the google review invite object
 *
 * @apiName GetGoogleReviewInvite
 * @apiGroup GoogleReview
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *              "googleReviewInvite": {
 *                  "endpointArn": [
 *                      "arn:aws:sns:us-east-1:075215484795:endpoint/GCM/dev-sf-android/f1edd961-0000-3d9d-837e-82e353f29594"
 *                  ],
 *                  "deviceType": [ 1 ],
 *                  "status": 0,
 *                  "createdAt": "2018-03-08 07:48:39",
 *                  "updatedAt": null,
 *                  "createdById": "5a8c0af12c12042d143f359a",
 *                  "updatedById": null,    
 *                  "title": "ShopFlow",
 *                  "message": "Review img1 on Google",
 *                  "placeId": "ChIJ13Jw0wxZ4joR1JDg6woe-Xk",
 *                  "userId": "5a8c0af12c12042d143f359a",
 *                  "shopId": "5a72bb075fa38e2440255f7d",
 *                  "link": "https://goo.gl/tFskJ9",
 *                  "id": "5aa0ead709d24609385e4d80"
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /google-review/invite/5aa0ead709d24609385e4d80
 *
 */
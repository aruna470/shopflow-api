/************ Create Device Info *********/

/**
 * @api {post} http://<base-url>/device-info Create DeviceInfo
 * @apiDescription Add new device information
 * - Authorization token required in header.
 * - Refer "DeviceInfo Object" for necessary parameters. Following example illustrates the valid parameters for deviceInfo create.
 * Rest of the parameters described in "DeviceInfo Object" are used for viewing and some other requests.
 * - Response - "Common Response". Possible response codes are,
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 * <br/> INVALID_DEVICE_TYPE
 *
 * @apiName Create
 * @apiGroup DeviceInfo
 *
 * @apiExample Example Request:
 *    {
 *      "userId":"5a6ac1fd289fe72aac248476",
 *      "token":"JD5HW8N2PA8WQ",
 *      "deviceType":"1"
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

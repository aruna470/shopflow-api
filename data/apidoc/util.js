/************ Upload File to S3 *********/
 
/**
 * @api {post} http://<base-url>/util/s3-upload Upload File to S3
 * @apiDescription Enables Authorized user to upload file to S3 bucket
 * - Form-data key for the file should be "fileData"
 * - Query param "public" (Optional) if set to "true" object ACL will be public-read, private otherwise
 * 
 * - Response - "Common Response" along with file unique name and presigned URL. Possible error codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>MISSING_MANDATORY_ATTRIBUTE
 *
 * @apiName UploadToS3
 * @apiGroup Util
 *
 * @apiExample Example Request: form-data
 *    
 *  "fileData": <file>,
 *
 * @apiExample Success-Response
 *  {
 *      "code": "SUCCESS",
 *      "data": {
 *          "fileName": "JCZS97735BIHW.txt",
 *          "location": "https://shop-flow-dev.s3.amazonaws.com/JCZS97735BIHW.txt?AWSAccessKeyId=AKIAIW7AKD5WV7AWZJRQ&Expires=1517207882&Signature=YCekd47ImnVSXSM9%2BzF0VRKglEM%3D"
 *      }
 *  }
 */

/************ Get Filefrom S3 *********/
 
/**
 * @api {get} http://<base-url>/util/s3-get-file/:fileName Get File from S3
 * @apiDescription Provides Presigned URL for given file name
 * 
 * - Response - "Common Response" along with file unique name and presigned URL. Possible error codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>MISSING_MANDATORY_ATTRIBUTE
 *
 * @apiName GetFromS3
 * @apiGroup Util
 *
 * @apiExample Success-Response
 *  {
 *      "code": "SUCCESS",
 *      "data": {
 *          "fileName": "JCZS97735BIHW.txt",
 *          "location": "https://shop-flow-dev.s3.amazonaws.com/JCZS97735BIHW.txt?AWSAccessKeyId=AKIAIW7AKD5WV7AWZJRQ&Expires=1517207882&Signature=YCekd47ImnVSXSM9%2BzF0VRKglEM%3D"
 *      }
 *  }
 */

/************ Get Last Sync Info *********/
 
/**
 * @api {get} http://<base-url>/util/get-last-sync-info Get last sync info
 * @apiDescription Provides for sync tool to retreive last sync details before start syncing process
 * 
 * - Response - "Common Response" along with file unique name and presigned URL. Possible error codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 *
 * @apiName GetLastSyncInfo
 * @apiGroup Util
 *
 * @apiExample Success-Response
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "syncInfo": {
 *                "maxRecommendationId": 205,
 *                "maxRepairOrderId": 1651
 *            }
 *        },
 *        "message": ""
 *    }
 */
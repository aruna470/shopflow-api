/**
 * @api {auth-header} {} API Authentication
 * @apiDescription Need to send following parameters on request header. Authorization is optional unless it is specifically mentioned.
 * @apiName APIAuth
 * @apiGroup General
 *
 * @apiHeader {String} api-key API access key.
 * @apiHeader {String} api-secret API access secret.
 * @apiHeader {String} [Authorization] User access token obtained while user authentication. 
 * @apiHeader {String} content-type application/json
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "api-key": "SDAERERRERKHKJH23Y79237927",
 *       "api-secret": "ESFSFSHGJHGJYTUTUTU896",
 *       "Authorization": Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTNlZjlmZmEyNjQ5YTE3MjBkNmFiZmMiLCJlbWFpbCI6ImFydW5hNDcwQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkFydW5hIiwiaWF0IjoxNTE0MTM0Mjg1fQ.A9K2Q7FpoBW-XJuQt2buGonNvkMGEN8IgE-UQXyn0m0,
 *       "Content-Type": application/json
 *     }
 */

/**
 * @api {common-response} {} Common Response
 * @apiDescription Following is the general response returned by the API.
 * @apiName Common Response
 * @apiGroup General
 *
 * @apiSuccess (Success) {String} code Status code. Status codes are <br/> 
 * SUCCESS</br>
 * FAIL</br>
 * MISSING_MANDATORY_ATTRIBUTE</br>
 * DUPLICATE_RECORD</br>
 * RECORD_NOT_FOUND</br>
 * NOT_FOUND</br>
 * INVALID_EMAIL</br>
 * EXCEED_CHARACTER_LENGTH</br>
 * INVALID_MOBILE</br>
 * INVALID_USERNAME_PASSWORD</br>
 * AUTH_FAILED</br>
 * ROLE_IN_USE</br>
 * PERMISSION_IN_USE</br>
 * PERMISSION_DENIED</br>
 * INVALID_OLD_PASSWORD</br>
 * UNKNOWN_ERROR</br>
 * INACTIVE_USER</br>
 * EMAIL_NOT_VERIFIED</br>
 * INVALID_FAX</br>
 * INVALID_PHONE</br>
 * DEFAULT_ROLE</br>
 *
 * @apiSuccess (Success) {String} [message] Any other informative message to be deliverd. Most of the time this is empty.
 * @apiSuccess (Success) {Object} [data] Contains additional data.
 * @apiSuccess (Success) {String} [attribute] Attribute name associates with the failure.
 *
 * @apiSuccessExample Success-Response - Example 1:
 * 	{
 *     "code": "SUCCESS",
 *	   "attribute": "",
 *     "data": "",
 *     "message": ""
 *  }
 *
 * @apiSuccessExample Success-Response - Example 2:
 * {
 *     "code": "SUCCESS",
 *     "attribute": null,
 *     "data": {
 *         "permissions": {
 *             "total": 2,
 *             "data": [
 *                 {
 *                     "name": "Permission.Update",
 *                     "description": "Create a permission",
 *                     "category": "Permission",
 *                     "updatedAt": null,
 *                     "createdAt": "2017-12-26 11:34:07",
 *                     "createdBy": {
 *                         "firstName": "Aruna",
 *                         "lastName": "Attanayake"
 *                     },
 *                     "updatedBy": null,
 *                     "id": "5a4233af66b74f082c948566"
 *                 },
 *                 {
 *                     "name": "Permission.1e11q",
 *                     "description": "Updated",
 *                     "category": "Permission",
 *                     "updatedAt": "2017-12-26 15:17:00",
 *                     "createdAt": "2017-12-26 11:34:50",
 *                     "createdBy": {
 *                         "firstName": "Aruna",
 *                         "lastName": "Attanayake"
 *                     },
 *                     "updatedBy": {
 *                         "firstName": "Aruna",
 *                         "lastName": "Attanayake"
 *                     },
 *                     "id": "5a4233da66b74f082c948568"
 *                 }
 *             ]
 *         }
 *     },
 *     "message": ""
 * }
 *
 * @apiErrorExample Error-Response:
 *	{
 *	    "code": "DUPLICATE_RECORD",
 *	    "attribute": "name",
 *	    "data": "",
 *	    "message": ""
 *	}
 */



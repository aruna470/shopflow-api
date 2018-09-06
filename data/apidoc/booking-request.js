/************ List Booking Request *********/
 
/**
 * @api {get} http://<base-url>/booking-request/list List Booking Requests
 * @apiDescription List Booking request records. Any user can request their own booking request records without additional permission.
 * - Response - "Common Response" containig the BookingRequest objects. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>PERMISSION_DENIED
 * - Authorization token required in header.
 *
 * @apiName ListBookingRequests
 * @apiGroup BookingRequest
 *
 * @apiParam {string} [userId] UserId for filtering
 * @apiParam {string} [shopId] ShopId for filtering
 * @apiParam {number} [isNotified] Filter by shop manager notified status. 0-No, 1-Yes
 * @apiParam {string} [start] recommendation date start value in format <b>YYYY-MM-DD</b>
 * @apiParam {string} [end] recommendation date end value in format <b>YYYY-MM-DD</b>
 * @apiParam {number} [pageNo] Page number.
 * @apiParam {number} [limit] Records per page.
 * @apiParam {string} [sort] Sorting field. Prepend "-" for decending, otherwise ascending. 
 * @apiExample Example Request:
 * /booking-request/list
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "bookingRequests": {
 *                "total": 2,
 *                "data": [
 *                  {
 *                      "shopId": "5a6f035a318ff528089bb857",
 *                      "createdAt": "2018-04-18 05:24:56",
 *                      "updatedAt": "2018-04-18 05:24:56",
 *                      "bookingDateTime": "2018-03-20 11:49:00",
 *                      "message": "My booking message [1]",
 *                      "status": 0,
 *                      "isNotified": 1,
 *                      "reply": null,
 *                      "id": "5ad6d6a8b527e96dbb6d04e3",
 *                      "user": {
 *                          "id": "5a8c0af12c12042d143f359a",
 *                          "firstName": "Dan",
 *                          "lastName": "ShopFlow"
 *                      },
 *                      "createdBy": {
 *                          "firstName": "Dan",
 *                          "lastName": "ShopFlow"
 *                      },
 *                      "updatedBy": null,
 *                      "vehicle": {
 *                           "id": "5af9519adf3fffb98b4d6e62",
 *                           "model": "Corolla LE",
 *                           "licenseNumber": "CAH-6227",
 *                           "make": "Toyota"
 *                      }
 *                  },
 *                  {
 *                      "shopId": "5a6f035a318ff528089bb858",
 *                      "createdAt": "2018-04-18 05:24:56",
 *                      "updatedAt": "2018-04-18 05:24:56",
 *                      "bookingDateTime": "2018-03-21 11:49:00",
 *                      "message": "My booking message [2]",
 *                      "status": 0,
 *                      "isNotified": 0,
 *                      "reply": null,
 *                      "id": "5ad6d6a8b527e96dbb6d04e3",
 *                      "user": {
 *                          "id": "5a8c0af12c12042d143f359a",
 *                          "firstName": "Dan",
 *                          "lastName": "ShopFlow"
 *                      },
 *                      "createdBy": {
 *                          "firstName": "Dan",
 *                          "lastName": "ShopFlow"
 *                      },
 *                      "updatedBy": null,
 *                      "vehicle": {
 *                           "id": "5af9519adf3fffb98b4d6e62",
 *                           "model": "Corolla LE",
 *                           "licenseNumber": "CAH-6227",
 *                           "make": "Toyota"
 *                      }
 *                  },
 *                ]
 *            }
 *        },
 *        "message": ""
 *    }
 */

 /************ Get booking request *********/
 
/**
 * @api {get} http://<base-url>/booking-request/:id Get Booking request
 * @apiDescription Get Booking Request Record. Any user can request their own booking request record without additional permission.
 * - Response - "Common Response" containig the "Booking Request" object. Possible response codes are,
 * <br/>SUCCESS
 * <br/>FAIL
 * <br/>RECORD_NOT_FOUND
 * <br/>PERMISSION_DENIED
 * - Authorization token required in header.
 *
 * @apiName GetBookingRequest
 * @apiGroup BookingRequest
 *
 * @apiExample Example Request:
 * booking-request/5ad6d6a8b527e96dbb6d04e3
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": {
 *          "bookingRequest": {
 *              "shopId": "5a6f035a318ff528089bb858",
 *              "createdAt": "2018-04-18 05:24:56",
 *              "updatedAt": "2018-04-18 05:24:56",
 *              "bookingDateTime": "2018-03-21 11:49:00",
 *              "message": "My booking message [2]",
 *              "status": 0,
 *              "isNotified": 1,
 *              "reply": null,
 *              "id": "5ad6d6a8b527e96dbb6d04e3",
 *              "user": {
 *                  "id": "5a8c0af12c12042d143f359a",
 *                  "firstName": "Dan",
 *                  "lastName": "ShopFlow"
 *               },
 *               "createdBy": {
 *                   "firstName": "Dan",
 *                   "lastName": "ShopFlow"
 *               },
 *               "updatedBy": null,
*                "vehicle": {
 *                   "id": "5af9519adf3fffb98b4d6e62",
 *                   "model": "Corolla LE",
 *                   "licenseNumber": "CAH-6227",
 *                   "make": "Toyota"
 *               }
 *          }
 *        },
 *        "message": ""
 *    }
 */

/************ Create Booking Request *********/
 
/**
 * @api {post} http://<base-url>/booking-request/ Create Booking Request
 * @apiDescription Enable car owners to create a booking with a shop they have subscribed to.
 * - Refer "Booking Recommendation Object" for necessary parameters. Following example illustrates the valid parameters for Booking request create.
 * Rest of the parameters described in "Booking Recommendation Object" are used for viewing.
 * - Response - "Common Response". Possible response codes are,
 * <br/>SUCCESS
 * <br/>USER_NOT_SUBSCRIBED
 * <br/>FAIL
 * - Authorization token required in header.
 *
 * @apiName CreateBookingRequest
 * @apiGroup BookingRequest
 *
 * @apiParam {ObjectId} shopId Shop Id
*  @apiParam {ObjectId} vehicleId Vehicle Id
 * @apiParam {String} [message] Optional booking request message
 * @apiParam {String} bookingDateTime Preferred booking date time. Format should be <b> YYYY-MM-DD HH:MM </b>
 * @apiExample Example Request:
 *    {
 *      "shopId": "5ab9e33d0d7ca81b8cb8ed3a",
 *      "vehicleId": "5af9519adf3fffb98b4d6e62",
 *      "message": "test booking message",
 *      "bookingDateTime": "2018-02-20 17:19"
 *    }
 */

 /************ Update Booking Request *********/
 
/**
 * @api {put} http://<base-url>/booking-request/5ab9e33d0d7ca834b8cb8ed3a Update Booking Request
 * 
 * @apiDescription This API Enables car owner to cancel a booking request or update the message, booking date &amp; time.
 * <br/> Shop owner/Area manager can approve/reject the booking request and update a reply to user. 
 * <br/> -Following example illustrates the valid parameters for Booking request update.
 * Car owner will get a push notification if status/reply was updated
 * - Response - "Common Response". Possible response codes are,
 * <br/>SUCCESS
 * <br/>PERMISSION_DENIED
 * <br/>RECORD_NOT_FOUND
 * <br/>FAIL
 * - Authorization token required in header.
 *
 * @apiName UpdateBookingRequest
 * @apiGroup BookingRequest
 *
 * @apiParam {ObjectId} shopId ShopId
 * @apiParam {String} [message] Optional booking request message <b>(Valid only for Car owners)</b>
 * @apiParam {String} [reply] Optional reply to car owner <b>(Valid only for Sop owner/Area maanger)</b>
 * @apiParam {String} [bookingDateTime] Preferred booking date time. Format should be <b> YYYY-MM-DD HH:MM </b>. <b>(Valid only for Car owners)</b>
 * @apiParam {Number} [status] 1 - ACCEPTED, 2 - REJECTED, 3 - CANCELLED <b> (Status 1,2 can be set by shop owner/area manager. Status 3 can be set by car owner)
 * @apiParam {Number} [isNotified] Update notified status. 1-Yes, 0-No
 * @apiExample Example Request by shop owner/area manager:
 *    {
 *      "shopId": "5ab9e33d0d7ca81b8cb8ed3a",
 *      "reply": "Appointment confirmed",
 *      "status": 1
 *    }
 * 
 *  @apiExample Example Request by shop owner/area manager for updating notified status:
 *    {
 *       "isNotified": 1
 *    }
 * 
 * @apiExample Example Request by car owner:
 *    {
 *      "shopId": "5ab9e33d0d7ca81b8cb8ed3a",
 *      "message": "I've updated my booking time",
 *      "bookingDateTime": "2018-03-20 18:19"
 *    }
 */

/************ Delete Booking Request *********/
 
/**
 * @api {delete} http://<base-url>/booking-request/:id Delete Booking Request
 * @apiDescription Delete existing shop booking request record. Requires booking-request.delete permission
 * - Response - "Common Response"
 * - Authorization token required in header.
 *
 * @apiName DeleteBookingRequest
 * @apiGroup BookingRequest
 *
 * @apiParam {ObjectId} id Booking request record id.
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
 * /booking-request/5a3a4e096f6cd628e4d922a8
 *
 */

/************ How to receive appointment notification *********/

/**
 * @api {}  How to receive appointment notification
 * @apiDescription In your socket client there should be a listner with name "appointmentNotification". When backend receives a message if 
 * receiver is online, then immediately send the notification message otherwise when receiver connects it sends all the pending notifications.
 * Please refer "Initialize Socket Connection" for setting up socket connection with backend.
 * 
 * @apiName HowToReceiveAppointmentNotification
 * @apiGroup BookingRequest
 * 
 * @apiSuccessExample Sample BookingRequest Notification:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": "",
 *        "data": {
 *          "bookingRequest": {
 *              "shopId": "5a6f035a318ff528089bb858",
 *              "createdAt": "2018-04-18 05:24:56",
 *              "updatedAt": "2018-04-18 05:24:56",
 *              "bookingDateTime": "2018-03-21 11:49:00",
 *              "message": "My booking message [2]",
 *              "status": 0,
 *              "isNotified": 1,
 *              "reply": null,
 *              "id": "5ad6d6a8b527e96dbb6d04e3",
 *              "user": {
 *                  "id": "5a8c0af12c12042d143f359a",
 *                  "firstName": "Dan",
 *                  "lastName": "ShopFlow"
 *               },
 *               "createdBy": {
 *                   "firstName": "Dan",
 *                   "lastName": "ShopFlow"
 *               },
 *               "updatedBy": null,
*                "vehicle": {
 *                   "id": "5af9519adf3fffb98b4d6e62",
 *                   "model": "Corolla LE",
 *                   "licenseNumber": "CAH-6227",
 *                   "make": "Toyota"
 *               }
 *          }
 *        },
 *        "message": ""
 *    }
 * 
 */
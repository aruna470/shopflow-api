/************ Create Chat *********/
 
/**
 * @api {post} http://<base-url>/chat Create chat
 * @apiDescription Send chat message
 * - Authorization token required in header.
 * - Attachement field should contains list of filenames.
 * - Refer "Chat Object" for necessary parameters. Following example illustrates the valid parameters for chat create.
 * Rest of the parameters described in "Chat Object" are used for viewing and some other requests.
 * - Mandatory fields are shopId, receiverId, message or attachments
 * - Response - "Common Response" with chat id. Possible response codes are,
 * <br/> PERMISSION_DENIED
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 * <br/> USER_NOT_SUBSCRIBED
 *
 * @apiName Create
 * @apiGroup Chat
 *
 * @apiExample Example Request:
 *    {
 *    	"shopId": "5ad58a7f78d2130704b3ce05",
 *    	"receiverId": "5ad5908836e28a2500ab6bff",
 *    	"message": "test message",
 *    	"attachments":["test.jpg", "ligts.jpg"]
 *    }
 *
 */


/************ Update Chat *********/
 
/**
 * @api {put} http://<base-url>/chat Update chat
 * @apiDescription Update chat message
 * - Authorization token required in header.
 * - Attachement field should contains list of filenames.
 * - Refer "Chat Object" for necessary parameters. Following example illustrates the valid parameters for chat update.
 * Rest of the parameters described in "Chat Object" are used for viewing and some other requests.
 * - Response - "Common Response" with chat id. Possible response codes are,
 * <br/> PERMISSION_DENIED
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 *
 * @apiName Update
 * @apiGroup Chat
 *
 * @apiExample Example Request:
 *    {
 *    	"readStatus": 1,
 *    	"attachments":[]
 *    	"message": "test message"
 *    }
 *
 */


/************ Chat List *********/

/**
 * @api {get} http://<base-url>/chat/list?shopId=<shopId> Chat Message List
 * @apiDescription Retrieve conversation history.
 * - Refer "Chat Object" for necessary parameters. Following example illustrates the valid parameters for chat list.
 * Rest of the parameters described in "Chat Object" are used for viewing and some other requests.
 * - Response - "Common Response" containig the shop objects. Possible response codes are
 * <br/> PERMISSION_DENIED
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 *
 * - Authorization token required in header.
 *
 * @apiName List
 * @apiGroup Chat
 *
 * @apiParam {String} [shopId] Shop id.
 * @apiParam {String} [senderId] User id of the message sender. This parameter is required for shop manager.
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *        "code": "SUCCESS",
 *        "attribute": null,
 *        "data": {
 *            "chatMessages": {
 *                "total": 2,
 *                "data": [
 *                    {
 *                        "updatedAt": "2018-06-05 06:06:46",
 *                        "createdAt": "2018-06-05 06:06:46",
 *                        "shopId": "5ad58a7f78d2130704b3ce05",
 *                        "attachments": [],
 *                        "message": "Reply to hello message-5",
 *                        "readStatus": 0,
 *                        "isNotified": 0,
 *                        "createdBy": {
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        },
 *                        "updatedBy": null,
 *                        "id": "5b162876f96bc2069c5b8c18",
 *                        "receiver": {
 *                            "id": "5ad5908836e28a2500ab6bff",
 *                            "firstName": "John",
 *                            "lastName": "Dwulet"
 *                        },
 *                        "sender": {
 *                            "id": "5ad58a1178d2130704b3ce04",
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        }
 *                    },
 *                    {
 *                        "updatedAt": "2018-06-05 03:44:30",
 *                        "createdAt": "2018-06-05 03:44:30",
 *                        "shopId": "5ad58a7f78d2130704b3ce05",
 *                        "attachments": [
 *                            "https://s3.amazonaws.com/shop-flow-dev/test.jpg",
 *                            "https://s3.amazonaws.com/shop-flow-dev/xxx.jpg"
 *                        ],
 *                        "message": "Hello message1",
 *                        "readStatus": 0,
 *                        "isNotified": 0,
 *                        "createdBy": {
 *                            "firstName": "John",
 *                            "lastName": "Dwulet"
 *                        },
 *                        "updatedBy": null,
 *                        "id": "5b16071ee880590288787dcf",
 *                        "receiver": {
 *                            "id": "5ad58a1178d2130704b3ce04",
 *                            "firstName": "Aruna",
 *                            "lastName": "Attanayake"
 *                        },
 *                        "sender": {
 *                            "id": "5ad5908836e28a2500ab6bff",
 *                            "firstName": "John",
 *                            "lastName": "Dwulet"
 *                        }
 *                    }
 *                ]
 *            }
 *        },
 *        "message": ""
 *    }
 *
 * @apiExample Example Request:
 * /chat/list
 */

/************ Get Chat Buddies *********/

/**
 * @api {get} http://<base-url>/chat/buddies?<shopId> Get Chat Buddies
 * @apiDescription Retrieve list of users related to recent conversations.
 * - Response - "Common Response" containig the user objects. Possible response codes are
 * <br/> PERMISSION_DENIED
 * <br/> SUCCESS
 * <br/> FAIL
 * <br/> MISSING_MANDATORY_ATTRIBUTE
 *
 * - Authorization token required in header.
 *
 * @apiName GetChatBuddies
 * @apiGroup Chat
 *
 * @apiParam {String} [shopId] Shop id.
 * 
 * @apiSuccessExample Success-Response:
 *   {
 *       "code": "SUCCESS",
 *       "attribute": null,
 *       "data": {
 *           "chatBuddies": {
 *               "total": 3,
 *               "data": [
 *                   {
 *                       "id": "5ae856ef929c5022c0f3e381",
 *                       "firstName": "Esandu",
 *                       "lastName": "Attanayake",
 *                       "email": "aruna@keeneye.solutions"
 *                   },
 *                   {
 *                       "id": "5ad5908836e28a2500ab6bff",
 *                       "firstName": "John",
 *                       "lastName": "Dwulet",
 *                       "email": "aruna470@gmail.com"
 *                   },
 *                   {
 *                       "id": "5ad58a1178d2130704b3ce04",
 *                       "firstName": "Aruna",
 *                       "lastName": "Attanayake"
 *                   }
 *               ]
 *           }
 *       },
 *       "message": ""
 *   }
 *
 * @apiExample Example Request:
 * /chat/buddies?shopId=5ad58a7f78d2130704b3ce05&pageNo=1&limit=10
 *
 *
 */

 /************ Initialize socket connection *********/

/**
 * @api {}  Initialize Socket Connection
 * @apiDescription To connect the socket server, need to send accessToken as query parameter in connection string.
 * Backend is developed using socket.io library and better to use client library provided by them for 
 * android (https://socket.io/blog/native-socket-io-and-android/#), ios(https://socket.io/blog/socket-io-on-ios/#) and web(https://cdnjs.com/libraries/socket.io)
 * <br>URL:http://base_url:3000
 * <br>Ex:accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
 * <br>
 * Need to maintain an error handler in socket client. When authentication fail it will send AUTH_FAILED error message.
 * 
 * @apiName Initialize
 * @apiGroup Chat
 */

/************ How to receive chat notification *********/

/**
 * @api {}  How to receive chat notification
 * @apiDescription In your socket client there should be a listner with name "shopChatNotification". When backend receives a message if 
 * receiver is online, then immediately send the notification message otherwise when receiver connects it sends all the pending notifications.
 * 
 * @apiName HowToReceiveChatNotification
 * @apiGroup Chat
 * 
 * @apiSuccessExample Sample Chat Notification:
 *    {
 *       "updatedAt":"2018-06-11 09:09:22",
 *       "createdAt":"2018-06-11 09:09:22",
 *       "shopId":"5ad58a7f78d2130704b3ce05",
 *       "attachments":[
 *          "https://s3.amazonaws.com/shop-flow-dev/test.jpg",
 *          "https://s3.amazonaws.com/shop-flow-dev/ligts.jpg"
 *       ],
 *       "message":"hello this is chcat notification2",
 *       "readStatus":0,
 *       "isNotified":0,
 *       "createdBy":{
 *          "firstName":"Aruna",
 *          "lastName":"Attanayake"
 *       },
 *       "updatedBy":null,
 *       "id":"5b1e3c42ce9bcc23843c72f4",
 *       "receiver":{
 *          "id":"5ad5908836e28a2500ab6bff",
 *          "firstName":"John",
 *          "lastName":"Dwulet"
 *       },
 *       "sender":{
 *          "id":"5ad58a1178d2130704b3ce04",
 *          "firstName":"Aruna",
 *          "lastName":"Attanayake"
 *       }
 *    }
 * 
 */

/************ How to notify typing *********/

/**
 * @api {}  How to notify typing
 * @apiDescription Socket client needs to emit to "typing" event with senderId & receiverId. This event needs be triggered
 * when user starts typing to send message(keydown event).
 * 
 * @apiName HowToNotifyTyping
 * @apiGroup Chat
 * 
 * @apiSuccessExample Sample data:
 *    {senderId:"5ad58a1178d2130704b3ce04", receiverId:"5ad5908836e28a2500ab6bff"}
 * 
 */

/************ How to receive typing *********/

/**
 * @api {}  How to receive typing
 * @apiDescription Socket client needs to have listner "typing" to capture typing event.
 * 
 * @apiName HowToReceiveTyping
 * @apiGroup Chat
 * 
 * @apiSuccessExample Sample data:
 *    {senderId:"5ad58a1178d2130704b3ce04", receiverId:"5ad5908836e28a2500ab6bff"}
 * 
 */
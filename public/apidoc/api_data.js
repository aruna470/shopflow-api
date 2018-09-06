define({ "api": [
  {
    "type": "post",
    "url": "http://<base-url>/booking-request/",
    "title": "Create Booking Request",
    "description": "<p>Enable car owners to create a booking with a shop they have subscribed to.</p> <ul> <li>Refer &quot;Booking Recommendation Object&quot; for necessary parameters. Following example illustrates the valid parameters for Booking request create. Rest of the parameters described in &quot;Booking Recommendation Object&quot; are used for viewing.</li> <li>Response - &quot;Common Response&quot;. Possible response codes are, <br/>SUCCESS <br/>USER_NOT_SUBSCRIBED <br/>FAIL</li> <li>Authorization token required in header.</li> </ul>",
    "name": "CreateBookingRequest",
    "group": "BookingRequest",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "shopId",
            "description": "<p>Shop Id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "vehicleId",
            "description": "<p>Vehicle Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "message",
            "description": "<p>Optional booking request message</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bookingDateTime",
            "description": "<p>Preferred booking date time. Format should be <b> YYYY-MM-DD HH:MM </b></p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"shopId\": \"5ab9e33d0d7ca81b8cb8ed3a\",\n  \"vehicleId\": \"5af9519adf3fffb98b4d6e62\",\n  \"message\": \"test booking message\",\n  \"bookingDateTime\": \"2018-02-20 17:19\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/booking-request.js",
    "groupTitle": "BookingRequest"
  },
  {
    "type": "delete",
    "url": "http://<base-url>/booking-request/:id",
    "title": "Delete Booking Request",
    "description": "<p>Delete existing shop booking request record. Requires booking-request.delete permission</p> <ul> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> </ul>",
    "name": "DeleteBookingRequest",
    "group": "BookingRequest",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Booking request record id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/booking-request/5a3a4e096f6cd628e4d922a8",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/booking-request.js",
    "groupTitle": "BookingRequest"
  },
  {
    "type": "get",
    "url": "http://<base-url>/booking-request/:id",
    "title": "Get Booking request",
    "description": "<p>Get Booking Request Record. Any user can request their own booking request record without additional permission.</p> <ul> <li>Response - &quot;Common Response&quot; containig the &quot;Booking Request&quot; object. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>RECORD_NOT_FOUND <br/>PERMISSION_DENIED</li> <li>Authorization token required in header.</li> </ul>",
    "name": "GetBookingRequest",
    "group": "BookingRequest",
    "examples": [
      {
        "title": "Example Request:",
        "content": "booking-request/5ad6d6a8b527e96dbb6d04e3",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": {\n      \"bookingRequest\": {\n          \"shopId\": \"5a6f035a318ff528089bb858\",\n          \"createdAt\": \"2018-04-18 05:24:56\",\n          \"updatedAt\": \"2018-04-18 05:24:56\",\n          \"bookingDateTime\": \"2018-03-21 11:49:00\",\n          \"message\": \"My booking message [2]\",\n          \"status\": 0,\n          \"isNotified\": 1,\n          \"reply\": null,\n          \"id\": \"5ad6d6a8b527e96dbb6d04e3\",\n          \"user\": {\n              \"id\": \"5a8c0af12c12042d143f359a\",\n              \"firstName\": \"Dan\",\n              \"lastName\": \"ShopFlow\"\n           },\n           \"createdBy\": {\n               \"firstName\": \"Dan\",\n               \"lastName\": \"ShopFlow\"\n           },\n           \"updatedBy\": null,\n            \"vehicle\": {\n               \"id\": \"5af9519adf3fffb98b4d6e62\",\n               \"model\": \"Corolla LE\",\n               \"licenseNumber\": \"CAH-6227\",\n               \"make\": \"Toyota\"\n           }\n      }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/booking-request.js",
    "groupTitle": "BookingRequest"
  },
  {
    "type": "",
    "url": "{}",
    "title": "How to receive appointment notification",
    "description": "<p>In your socket client there should be a listner with name &quot;appointmentNotification&quot;. When backend receives a message if receiver is online, then immediately send the notification message otherwise when receiver connects it sends all the pending notifications. Please refer &quot;Initialize Socket Connection&quot; for setting up socket connection with backend.</p>",
    "name": "HowToReceiveAppointmentNotification",
    "group": "BookingRequest",
    "success": {
      "examples": [
        {
          "title": "Sample BookingRequest Notification:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": {\n      \"bookingRequest\": {\n          \"shopId\": \"5a6f035a318ff528089bb858\",\n          \"createdAt\": \"2018-04-18 05:24:56\",\n          \"updatedAt\": \"2018-04-18 05:24:56\",\n          \"bookingDateTime\": \"2018-03-21 11:49:00\",\n          \"message\": \"My booking message [2]\",\n          \"status\": 0,\n          \"isNotified\": 1,\n          \"reply\": null,\n          \"id\": \"5ad6d6a8b527e96dbb6d04e3\",\n          \"user\": {\n              \"id\": \"5a8c0af12c12042d143f359a\",\n              \"firstName\": \"Dan\",\n              \"lastName\": \"ShopFlow\"\n           },\n           \"createdBy\": {\n               \"firstName\": \"Dan\",\n               \"lastName\": \"ShopFlow\"\n           },\n           \"updatedBy\": null,\n            \"vehicle\": {\n               \"id\": \"5af9519adf3fffb98b4d6e62\",\n               \"model\": \"Corolla LE\",\n               \"licenseNumber\": \"CAH-6227\",\n               \"make\": \"Toyota\"\n           }\n      }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/booking-request.js",
    "groupTitle": "BookingRequest"
  },
  {
    "type": "get",
    "url": "http://<base-url>/booking-request/list",
    "title": "List Booking Requests",
    "description": "<p>List Booking request records. Any user can request their own booking request records without additional permission.</p> <ul> <li>Response - &quot;Common Response&quot; containig the BookingRequest objects. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>PERMISSION_DENIED</li> <li>Authorization token required in header.</li> </ul>",
    "name": "ListBookingRequests",
    "group": "BookingRequest",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "userId",
            "description": "<p>UserId for filtering</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "shopId",
            "description": "<p>ShopId for filtering</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "isNotified",
            "description": "<p>Filter by shop manager notified status. 0-No, 1-Yes</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "start",
            "description": "<p>recommendation date start value in format <b>YYYY-MM-DD</b></p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "end",
            "description": "<p>recommendation date end value in format <b>YYYY-MM-DD</b></p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "pageNo",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "limit",
            "description": "<p>Records per page.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting field. Prepend &quot;-&quot; for decending, otherwise ascending.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/booking-request/list",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"bookingRequests\": {\n            \"total\": 2,\n            \"data\": [\n              {\n                  \"shopId\": \"5a6f035a318ff528089bb857\",\n                  \"createdAt\": \"2018-04-18 05:24:56\",\n                  \"updatedAt\": \"2018-04-18 05:24:56\",\n                  \"bookingDateTime\": \"2018-03-20 11:49:00\",\n                  \"message\": \"My booking message [1]\",\n                  \"status\": 0,\n                  \"isNotified\": 1,\n                  \"reply\": null,\n                  \"id\": \"5ad6d6a8b527e96dbb6d04e3\",\n                  \"user\": {\n                      \"id\": \"5a8c0af12c12042d143f359a\",\n                      \"firstName\": \"Dan\",\n                      \"lastName\": \"ShopFlow\"\n                  },\n                  \"createdBy\": {\n                      \"firstName\": \"Dan\",\n                      \"lastName\": \"ShopFlow\"\n                  },\n                  \"updatedBy\": null,\n                  \"vehicle\": {\n                       \"id\": \"5af9519adf3fffb98b4d6e62\",\n                       \"model\": \"Corolla LE\",\n                       \"licenseNumber\": \"CAH-6227\",\n                       \"make\": \"Toyota\"\n                  }\n              },\n              {\n                  \"shopId\": \"5a6f035a318ff528089bb858\",\n                  \"createdAt\": \"2018-04-18 05:24:56\",\n                  \"updatedAt\": \"2018-04-18 05:24:56\",\n                  \"bookingDateTime\": \"2018-03-21 11:49:00\",\n                  \"message\": \"My booking message [2]\",\n                  \"status\": 0,\n                  \"isNotified\": 0,\n                  \"reply\": null,\n                  \"id\": \"5ad6d6a8b527e96dbb6d04e3\",\n                  \"user\": {\n                      \"id\": \"5a8c0af12c12042d143f359a\",\n                      \"firstName\": \"Dan\",\n                      \"lastName\": \"ShopFlow\"\n                  },\n                  \"createdBy\": {\n                      \"firstName\": \"Dan\",\n                      \"lastName\": \"ShopFlow\"\n                  },\n                  \"updatedBy\": null,\n                  \"vehicle\": {\n                       \"id\": \"5af9519adf3fffb98b4d6e62\",\n                       \"model\": \"Corolla LE\",\n                       \"licenseNumber\": \"CAH-6227\",\n                       \"make\": \"Toyota\"\n                  }\n              },\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/booking-request.js",
    "groupTitle": "BookingRequest"
  },
  {
    "type": "put",
    "url": "http://<base-url>/booking-request/5ab9e33d0d7ca834b8cb8ed3a",
    "title": "Update Booking Request",
    "description": "<p>This API Enables car owner to cancel a booking request or update the message, booking date &amp; time. <br/> Shop owner/Area manager can approve/reject the booking request and update a reply to user. <br/> -Following example illustrates the valid parameters for Booking request update. Car owner will get a push notification if status/reply was updated</p> <ul> <li>Response - &quot;Common Response&quot;. Possible response codes are, <br/>SUCCESS <br/>PERMISSION_DENIED <br/>RECORD_NOT_FOUND <br/>FAIL</li> <li>Authorization token required in header.</li> </ul>",
    "name": "UpdateBookingRequest",
    "group": "BookingRequest",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "shopId",
            "description": "<p>ShopId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "message",
            "description": "<p>Optional booking request message <b>(Valid only for Car owners)</b></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "reply",
            "description": "<p>Optional reply to car owner <b>(Valid only for Sop owner/Area maanger)</b></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "bookingDateTime",
            "description": "<p>Preferred booking date time. Format should be <b> YYYY-MM-DD HH:MM </b>. <b>(Valid only for Car owners)</b></p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "status",
            "description": "<p>1 - ACCEPTED, 2 - REJECTED, 3 - CANCELLED <b> (Status 1,2 can be set by shop owner/area manager. Status 3 can be set by car owner)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "isNotified",
            "description": "<p>Update notified status. 1-Yes, 0-No</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Request by shop owner/area manager:",
        "content": "{\n  \"shopId\": \"5ab9e33d0d7ca81b8cb8ed3a\",\n  \"reply\": \"Appointment confirmed\",\n  \"status\": 1\n}",
        "type": "json"
      },
      {
        "title": "Example Request by shop owner/area manager for updating notified status:",
        "content": "{\n   \"isNotified\": 1\n}",
        "type": "json"
      },
      {
        "title": "Example Request by car owner:",
        "content": "{\n  \"shopId\": \"5ab9e33d0d7ca81b8cb8ed3a\",\n  \"message\": \"I've updated my booking time\",\n  \"bookingDateTime\": \"2018-03-20 18:19\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/booking-request.js",
    "groupTitle": "BookingRequest"
  },
  {
    "type": "post",
    "url": "http://<base-url>/car-owner-subscription",
    "title": "Create CarOwnerSubscription",
    "description": "<p>Creates CarOwnerSubscription that subscribes users to a shop <br/> Subscription Status would be PENDING till shop owner accept/reject the subscription <br/> Subscription Status would be ACCEPTED if shop owner subscribes a user to their shop</p> <ul> <li>Authorization token required in header.</li> <li>Refer &quot;CarOwnerSubscription Object&quot; for necessary parameters. Following example illustrates the valid parameters for CarOwnerSubscription create. Rest of the parameters described in &quot;CarOwnerSubscription Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot;. Possible response codes are, <br/> SUCCESS <br/> FAIL <br/> PERMISSION_DENIED <br/> MISSING_MANDATORY_ATTRIBUTE <br/> INVALID_USER_ID <br/> INVALID_SHOP_ID <br/> ALREADY_SUBSCRIBED</li> </ul>",
    "name": "CreateCarOwnerSubscription",
    "group": "CarOwnerSubscription",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"userId\":\"5a6ac1fd289fe72aac248476\",\n  \"shopId\":\"5a6ac1fd289fe72aac248477\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/car-owner-subscription.js",
    "groupTitle": "CarOwnerSubscription"
  },
  {
    "type": "delete",
    "url": "http://<base-url>/car-owner-subscription/:id",
    "title": "Delete CarOwnerSubscription",
    "description": "<p>Delete existing CarOwnerSubscription.</p> <ul> <li>Authorization token required in header.</li> <li>Response - &quot;Common Response&quot;. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>PERMISSION_DENIED <br/>RECORD_NOT_FOUND</li> </ul>",
    "name": "DeleteCarOwnerSubscription",
    "group": "CarOwnerSubscription",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>CarOwnerSubscription id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/car-owner-subscription/5a3a4e096f6cd628e4d922a8",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/car-owner-subscription.js",
    "groupTitle": "CarOwnerSubscription"
  },
  {
    "type": "get",
    "url": "http://<base-url>/car-owner-subscription/:id",
    "title": "Get CarOwnerSubscription",
    "description": "<p>Retrieve existing CarOwnerSubscription details.</p> <ul> <li>Authorization token required in header.</li> <li>Response - &quot;Common Response&quot; containig the CarOwnerSubscription object. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>RECORD_NOT_FOUND <br/>PERMISSION_DENIED</li> </ul>",
    "name": "GetCarOwnerSubscription",
    "group": "CarOwnerSubscription",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>CarOwnerSubscription id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": {\n      \"subscription\": {\n          \"user\": {\n              \"id\": \"5a8c0af12c12042d143f359a\",\n              \"email\": \"user@gmail.com\",\n              \"firstName\": \"First\",\n              \"lastName\": \"Last\"\n          },\n          \"shopId\": \"5a72bb075fa38e2440255f7d\",\n          \"updatedAt\": null,\n          \"createdAt\": \"2018-02-20 07:40:22\",\n          \"status\": 0,\n          \"createdBy\": {\n              \"firstName\": \"First\",\n              \"lastName\": \"Last\"\n          },\n          \"updatedBy\": null,\n          \"id\": \"5a8bd0e65432b82f849c881a\"\n      }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/car-owner-subscription/5a3a4e096f6cd628e4d922a8",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/car-owner-subscription.js",
    "groupTitle": "CarOwnerSubscription"
  },
  {
    "type": "post",
    "url": "http://<base-url>/car-owner-subscription/:id/invite-m1-user",
    "title": "Invite M1 Subscribed User",
    "description": "<p>Invite M1 Subscribed User.</p> <ul> <li>Authorization token required in header.</li> <li>Response - &quot;Common Response&quot;. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>PERMISSION_DENIED <br/>RECORD_NOT_FOUND</li> </ul>",
    "name": "InviteM1User",
    "group": "CarOwnerSubscription",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>CarOwnerSubscription id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/car-owner-subscription/5a3a4e096f6cd628e4d922a8/invite-m1-user",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/car-owner-subscription.js",
    "groupTitle": "CarOwnerSubscription"
  },
  {
    "type": "get",
    "url": "http://<base-url>/car-owner-subscription/list",
    "title": "List CarOwnerSubscriptions",
    "description": "<p>Retrieve list of CarOwnerSubscription. <br/><b>Results could be filtered using:</b> shopId, userId, status, firstName, lastName, email, fullName <br/><b>Sorted using:</b> firstName, lastName, email, status, createdAt, company <br/></p> <ul> <li>Authorization token required in header.</li> <li>Response - &quot;Common Response&quot; containig the CarOwnerSubscription objects. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>PERMISSION_DENIED</li> </ul>",
    "name": "ListCarOwnerSubscription",
    "group": "CarOwnerSubscription",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"users\": {\n            \"total\": 1,\n            \"data\": [\n                {\n                  \"user\": {\n                      \"id\": \"5a8c0af12c12042d143f359a\",\n                      \"email\": \"user@gmail.com\",\n                      \"firstName\": \"First\",\n                      \"lastName\": \"Last\",\n                      \"mobile\": \"773959699\",\n                      \"createdAt\": \"2018-02-20T11:48:01.784Z\"\n                      \"isM1SyncedUser\": 1,\n                      \"company\": \"McDonald\"\n                  },\n                  \"shop\": {\n                      \"id\": \"5a72bb075fa38e2440255f7d\",\n                      \"brandName\": \"automag\",\n                      \"businessName\": \"automag\",\n                      \"createdAt\": \"2018-02-01T07:00:23.112Z\"\n                  },\n                  \"updatedAt\": null,\n                  \"createdAt\": \"2018-02-20 07:40:22\",\n                  \"status\": 0,\n                  \"createdBy\": {\n                      \"firstName\": \"First\",\n                      \"lastName\": \"Last\"\n                  },\n                  \"updatedBy\": null,\n                  \"id\": \"5a8bd0e65432b82f849c881a\"\n                }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/car-owner-subscription/list?pageNo=1&limit=3&sort=-createdAt",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/car-owner-subscription.js",
    "groupTitle": "CarOwnerSubscription"
  },
  {
    "type": "put",
    "url": "http://<base-url>/car-owner-subscription/:id",
    "title": "Update CarOwnerSubscription",
    "description": "<p>Update CarOwnerSubscription, can also be used to unsubscribe from a shop <br/> Setting status to 3 will unsubscribe a carowner from shop</p> <ul> <li>Authorization token required in header.</li> <li>Refer &quot;CarOwnerSubscription Object&quot; for necessary parameters. Following example illustrates the valid parameters for CarOwnerSubscription update. Rest of the parameters described in &quot;CarOwnerSubscription Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot;. Possible response codes are, <br/> SUCCESS <br/> FAIL <br/> PERMISSION_DENIED <br/> MISSING_MANDATORY_ATTRIBUTE <br/> INVALID_USER_ID <br/> INVALID_SHOP_ID <br/> RECORD_NOT_FOUND</li> </ul>",
    "name": "UpdateCarOwnerSubscription",
    "group": "CarOwnerSubscription",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"userId\":\"5a6ac1fd289fe72aac248476\",\n  \"shopId\":\"5a6ac1fd289fe72aac248477\",\n  \"status\": 3\n}",
        "type": "json"
      },
      {
        "title": "Example Request:",
        "content": "/car-owner-subscription/5a3a4e096f6cd628e4d922a8",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/car-owner-subscription.js",
    "groupTitle": "CarOwnerSubscription"
  },
  {
    "type": "post",
    "url": "http://<base-url>/chat",
    "title": "Create chat",
    "description": "<p>Send chat message</p> <ul> <li>Authorization token required in header.</li> <li>Attachement field should contains list of filenames.</li> <li>Refer &quot;Chat Object&quot; for necessary parameters. Following example illustrates the valid parameters for chat create. Rest of the parameters described in &quot;Chat Object&quot; are used for viewing and some other requests.</li> <li>Mandatory fields are shopId, receiverId, message or attachments</li> <li>Response - &quot;Common Response&quot; with chat id. Possible response codes are, <br/> PERMISSION_DENIED <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE <br/> USER_NOT_SUBSCRIBED</li> </ul>",
    "name": "Create",
    "group": "Chat",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n\t\"shopId\": \"5ad58a7f78d2130704b3ce05\",\n\t\"receiverId\": \"5ad5908836e28a2500ab6bff\",\n\t\"message\": \"test message\",\n\t\"attachments\":[\"test.jpg\", \"ligts.jpg\"]\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/chat.js",
    "groupTitle": "Chat"
  },
  {
    "type": "get",
    "url": "http://<base-url>/chat/buddies?<shopId>",
    "title": "Get Chat Buddies",
    "description": "<p>Retrieve list of users related to recent conversations.</p> <ul> <li> <p>Response - &quot;Common Response&quot; containig the user objects. Possible response codes are <br/> PERMISSION_DENIED <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE</p> </li> <li> <p>Authorization token required in header.</p> </li> </ul>",
    "name": "GetChatBuddies",
    "group": "Chat",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "shopId",
            "description": "<p>Shop id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"chatBuddies\": {\n            \"total\": 3,\n            \"data\": [\n                {\n                    \"id\": \"5ae856ef929c5022c0f3e381\",\n                    \"firstName\": \"Esandu\",\n                    \"lastName\": \"Attanayake\",\n                    \"email\": \"aruna@keeneye.solutions\"\n                },\n                {\n                    \"id\": \"5ad5908836e28a2500ab6bff\",\n                    \"firstName\": \"John\",\n                    \"lastName\": \"Dwulet\",\n                    \"email\": \"aruna470@gmail.com\"\n                },\n                {\n                    \"id\": \"5ad58a1178d2130704b3ce04\",\n                    \"firstName\": \"Aruna\",\n                    \"lastName\": \"Attanayake\"\n                }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/chat/buddies?shopId=5ad58a7f78d2130704b3ce05&pageNo=1&limit=10",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/chat.js",
    "groupTitle": "Chat"
  },
  {
    "type": "",
    "url": "{}",
    "title": "How to notify typing",
    "description": "<p>Socket client needs to emit to &quot;typing&quot; event with senderId &amp; receiverId. This event needs be triggered when user starts typing to send message(keydown event).</p>",
    "name": "HowToNotifyTyping",
    "group": "Chat",
    "success": {
      "examples": [
        {
          "title": "Sample data:",
          "content": "{senderId:\"5ad58a1178d2130704b3ce04\", receiverId:\"5ad5908836e28a2500ab6bff\"}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/chat.js",
    "groupTitle": "Chat"
  },
  {
    "type": "",
    "url": "{}",
    "title": "How to receive chat notification",
    "description": "<p>In your socket client there should be a listner with name &quot;shopChatNotification&quot;. When backend receives a message if receiver is online, then immediately send the notification message otherwise when receiver connects it sends all the pending notifications.</p>",
    "name": "HowToReceiveChatNotification",
    "group": "Chat",
    "success": {
      "examples": [
        {
          "title": "Sample Chat Notification:",
          "content": "{\n   \"updatedAt\":\"2018-06-11 09:09:22\",\n   \"createdAt\":\"2018-06-11 09:09:22\",\n   \"shopId\":\"5ad58a7f78d2130704b3ce05\",\n   \"attachments\":[\n      \"https://s3.amazonaws.com/shop-flow-dev/test.jpg\",\n      \"https://s3.amazonaws.com/shop-flow-dev/ligts.jpg\"\n   ],\n   \"message\":\"hello this is chcat notification2\",\n   \"readStatus\":0,\n   \"isNotified\":0,\n   \"createdBy\":{\n      \"firstName\":\"Aruna\",\n      \"lastName\":\"Attanayake\"\n   },\n   \"updatedBy\":null,\n   \"id\":\"5b1e3c42ce9bcc23843c72f4\",\n   \"receiver\":{\n      \"id\":\"5ad5908836e28a2500ab6bff\",\n      \"firstName\":\"John\",\n      \"lastName\":\"Dwulet\"\n   },\n   \"sender\":{\n      \"id\":\"5ad58a1178d2130704b3ce04\",\n      \"firstName\":\"Aruna\",\n      \"lastName\":\"Attanayake\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/chat.js",
    "groupTitle": "Chat"
  },
  {
    "type": "",
    "url": "{}",
    "title": "How to receive typing",
    "description": "<p>Socket client needs to have listner &quot;typing&quot; to capture typing event.</p>",
    "name": "HowToReceiveTyping",
    "group": "Chat",
    "success": {
      "examples": [
        {
          "title": "Sample data:",
          "content": "{senderId:\"5ad58a1178d2130704b3ce04\", receiverId:\"5ad5908836e28a2500ab6bff\"}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/chat.js",
    "groupTitle": "Chat"
  },
  {
    "type": "",
    "url": "{}",
    "title": "Initialize Socket Connection",
    "description": "<p>To connect the socket server, need to send accessToken as query parameter in connection string. Backend is developed using socket.io library and better to use client library provided by them for android (https://socket.io/blog/native-socket-io-and-android/#), ios(https://socket.io/blog/socket-io-on-ios/#) and web(https://cdnjs.com/libraries/socket.io) <br>URL:http://base_url:3000 <br>Ex:accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.... <br> Need to maintain an error handler in socket client. When authentication fail it will send AUTH_FAILED error message.</p>",
    "name": "Initialize",
    "group": "Chat",
    "version": "0.0.0",
    "filename": "data/apidoc/chat.js",
    "groupTitle": "Chat"
  },
  {
    "type": "get",
    "url": "http://<base-url>/chat/list?shopId=<shopId>",
    "title": "Chat Message List",
    "description": "<p>Retrieve conversation history.</p> <ul> <li> <p>Refer &quot;Chat Object&quot; for necessary parameters. Following example illustrates the valid parameters for chat list. Rest of the parameters described in &quot;Chat Object&quot; are used for viewing and some other requests.</p> </li> <li> <p>Response - &quot;Common Response&quot; containig the shop objects. Possible response codes are <br/> PERMISSION_DENIED <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE</p> </li> <li> <p>Authorization token required in header.</p> </li> </ul>",
    "name": "List",
    "group": "Chat",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "shopId",
            "description": "<p>Shop id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "senderId",
            "description": "<p>User id of the message sender. This parameter is required for shop manager.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"chatMessages\": {\n            \"total\": 2,\n            \"data\": [\n                {\n                    \"updatedAt\": \"2018-06-05 06:06:46\",\n                    \"createdAt\": \"2018-06-05 06:06:46\",\n                    \"shopId\": \"5ad58a7f78d2130704b3ce05\",\n                    \"attachments\": [],\n                    \"message\": \"Reply to hello message-5\",\n                    \"readStatus\": 0,\n                    \"isNotified\": 0,\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"updatedBy\": null,\n                    \"id\": \"5b162876f96bc2069c5b8c18\",\n                    \"receiver\": {\n                        \"id\": \"5ad5908836e28a2500ab6bff\",\n                        \"firstName\": \"John\",\n                        \"lastName\": \"Dwulet\"\n                    },\n                    \"sender\": {\n                        \"id\": \"5ad58a1178d2130704b3ce04\",\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    }\n                },\n                {\n                    \"updatedAt\": \"2018-06-05 03:44:30\",\n                    \"createdAt\": \"2018-06-05 03:44:30\",\n                    \"shopId\": \"5ad58a7f78d2130704b3ce05\",\n                    \"attachments\": [\n                        \"https://s3.amazonaws.com/shop-flow-dev/test.jpg\",\n                        \"https://s3.amazonaws.com/shop-flow-dev/xxx.jpg\"\n                    ],\n                    \"message\": \"Hello message1\",\n                    \"readStatus\": 0,\n                    \"isNotified\": 0,\n                    \"createdBy\": {\n                        \"firstName\": \"John\",\n                        \"lastName\": \"Dwulet\"\n                    },\n                    \"updatedBy\": null,\n                    \"id\": \"5b16071ee880590288787dcf\",\n                    \"receiver\": {\n                        \"id\": \"5ad58a1178d2130704b3ce04\",\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"sender\": {\n                        \"id\": \"5ad5908836e28a2500ab6bff\",\n                        \"firstName\": \"John\",\n                        \"lastName\": \"Dwulet\"\n                    }\n                }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/chat/list",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/chat.js",
    "groupTitle": "Chat"
  },
  {
    "type": "put",
    "url": "http://<base-url>/chat",
    "title": "Update chat",
    "description": "<p>Update chat message</p> <ul> <li>Authorization token required in header.</li> <li>Attachement field should contains list of filenames.</li> <li>Refer &quot;Chat Object&quot; for necessary parameters. Following example illustrates the valid parameters for chat update. Rest of the parameters described in &quot;Chat Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot; with chat id. Possible response codes are, <br/> PERMISSION_DENIED <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE</li> </ul>",
    "name": "Update",
    "group": "Chat",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n\t\"readStatus\": 1,\n\t\"attachments\":[]\n\t\"message\": \"test message\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/chat.js",
    "groupTitle": "Chat"
  },
  {
    "type": "get",
    "url": "http://<base-url>/dashboard/shop-owner/statistics",
    "title": "Get ShopOwner Dashboard Statistics",
    "description": "<p>Get statistics for shop-owner dashboard of requested shop owner</p> <ul> <li>Authorization token required in header.</li> <li>Response - &quot;Common Response&quot;. Possible response codes are, <br/> SUCCESS <br/> FAIL</li> </ul>",
    "name": "GetShopOwnerDashboardStatistics",
    "group": "Dashboard",
    "examples": [
      {
        "title": "Example Request:",
        "content": "/dashboard/shop-owner/statistics",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": {\n      \"shopCount\": 3,\n      \"userCount\": 2\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/dashboard.js",
    "groupTitle": "Dashboard"
  },
  {
    "type": "get",
    "url": "http://<base-url>/dashboard/shop/:id/statistics",
    "title": "Get Shop Statistics",
    "description": "<p>Get shop statistics for shop-owner dashboard of requested shop owner</p> <ul> <li>Authorization token required in header.</li> <li>Response - &quot;Common Response&quot;. Possible response codes are, <br/> SUCCESS <br/> FAIL</li> </ul>",
    "name": "GetShopStatistics",
    "group": "Dashboard",
    "examples": [
      {
        "title": "Example Request:",
        "content": "/dashboard/shop/5ab9e33d0d7ca81b8cb8ed3/statistics",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": {\n      \"shopCount\": 1,\n      \"userCount\": 2,\n      \"vehicleCount\": 9,\n      \"appointmentRequestCount\": 3,\n      \"chatCount\": 2\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/dashboard.js",
    "groupTitle": "Dashboard"
  },
  {
    "type": "post",
    "url": "http://<base-url>/device-info",
    "title": "Create DeviceInfo",
    "description": "<p>Add new device information</p> <ul> <li>Authorization token required in header.</li> <li>Refer &quot;DeviceInfo Object&quot; for necessary parameters. Following example illustrates the valid parameters for deviceInfo create. Rest of the parameters described in &quot;DeviceInfo Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot;. Possible response codes are, <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE <br/> INVALID_DEVICE_TYPE</li> </ul>",
    "name": "Create",
    "group": "DeviceInfo",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"userId\":\"5a6ac1fd289fe72aac248476\",\n  \"token\":\"JD5HW8N2PA8WQ\",\n  \"deviceType\":\"1\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/device-info.js",
    "groupTitle": "DeviceInfo"
  },
  {
    "type": "auth-header",
    "url": "{}",
    "title": "API Authentication",
    "description": "<p>Need to send following parameters on request header. Authorization is optional unless it is specifically mentioned.</p>",
    "name": "APIAuth",
    "group": "General",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "api-key",
            "description": "<p>API access key.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "api-secret",
            "description": "<p>API access secret.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Authorization",
            "description": "<p>User access token obtained while user authentication.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>application/json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"api-key\": \"SDAERERRERKHKJH23Y79237927\",\n  \"api-secret\": \"ESFSFSHGJHGJYTUTUTU896\",\n  \"Authorization\": Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTNlZjlmZmEyNjQ5YTE3MjBkNmFiZmMiLCJlbWFpbCI6ImFydW5hNDcwQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkFydW5hIiwiaWF0IjoxNTE0MTM0Mjg1fQ.A9K2Q7FpoBW-XJuQt2buGonNvkMGEN8IgE-UQXyn0m0,\n  \"Content-Type\": application/json\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/common.js",
    "groupTitle": "General"
  },
  {
    "type": "common-response",
    "url": "{}",
    "title": "Common Response",
    "description": "<p>Following is the general response returned by the API.</p>",
    "name": "Common_Response",
    "group": "General",
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Status code. Status codes are <br/> SUCCESS</br> FAIL</br> MISSING_MANDATORY_ATTRIBUTE</br> DUPLICATE_RECORD</br> RECORD_NOT_FOUND</br> NOT_FOUND</br> INVALID_EMAIL</br> EXCEED_CHARACTER_LENGTH</br> INVALID_MOBILE</br> INVALID_USERNAME_PASSWORD</br> AUTH_FAILED</br> ROLE_IN_USE</br> PERMISSION_IN_USE</br> PERMISSION_DENIED</br> INVALID_OLD_PASSWORD</br> UNKNOWN_ERROR</br> INACTIVE_USER</br> EMAIL_NOT_VERIFIED</br> INVALID_FAX</br> INVALID_PHONE</br> DEFAULT_ROLE</br></p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": true,
            "field": "message",
            "description": "<p>Any other informative message to be deliverd. Most of the time this is empty.</p>"
          },
          {
            "group": "Success",
            "type": "Object",
            "optional": true,
            "field": "data",
            "description": "<p>Contains additional data.</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": true,
            "field": "attribute",
            "description": "<p>Attribute name associates with the failure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response - Example 1:",
          "content": "\t{\n    \"code\": \"SUCCESS\",\n\t   \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n }",
          "type": "json"
        },
        {
          "title": "Success-Response - Example 2:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"permissions\": {\n            \"total\": 2,\n            \"data\": [\n                {\n                    \"name\": \"Permission.Update\",\n                    \"description\": \"Create a permission\",\n                    \"category\": \"Permission\",\n                    \"updatedAt\": null,\n                    \"createdAt\": \"2017-12-26 11:34:07\",\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"updatedBy\": null,\n                    \"id\": \"5a4233af66b74f082c948566\"\n                },\n                {\n                    \"name\": \"Permission.1e11q\",\n                    \"description\": \"Updated\",\n                    \"category\": \"Permission\",\n                    \"updatedAt\": \"2017-12-26 15:17:00\",\n                    \"createdAt\": \"2017-12-26 11:34:50\",\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"updatedBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"id\": \"5a4233da66b74f082c948568\"\n                }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\": \"DUPLICATE_RECORD\",\n    \"attribute\": \"name\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/common.js",
    "groupTitle": "General"
  },
  {
    "type": "get",
    "url": "http://<base-url>/google-review/invite/{id}",
    "title": "Get Google Review Invites",
    "description": "<p>Get Google Review Invite.</p> <ul> <li>Response - &quot;Common Response&quot; containig the google review invite object</li> </ul>",
    "name": "GetGoogleReviewInvite",
    "group": "GoogleReview",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n          \"googleReviewInvite\": {\n              \"endpointArn\": [\n                  \"arn:aws:sns:us-east-1:075215484795:endpoint/GCM/dev-sf-android/f1edd961-0000-3d9d-837e-82e353f29594\"\n              ],\n              \"deviceType\": [ 1 ],\n              \"status\": 0,\n              \"createdAt\": \"2018-03-08 07:48:39\",\n              \"updatedAt\": null,\n              \"createdById\": \"5a8c0af12c12042d143f359a\",\n              \"updatedById\": null,    \n              \"title\": \"ShopFlow\",\n              \"message\": \"Review img1 on Google\",\n              \"placeId\": \"ChIJ13Jw0wxZ4joR1JDg6woe-Xk\",\n              \"userId\": \"5a8c0af12c12042d143f359a\",\n              \"shopId\": \"5a72bb075fa38e2440255f7d\",\n              \"link\": \"https://goo.gl/tFskJ9\",\n              \"id\": \"5aa0ead709d24609385e4d80\"\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/google-review/invite/5aa0ead709d24609385e4d80",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/google-review.js",
    "groupTitle": "GoogleReview"
  },
  {
    "type": "post",
    "url": "http://<base-url>/google-review/invite",
    "title": "Invite to Review on Google",
    "description": "<p>Invite User to review business on Google <br/></p> <ul> <li>Response - &quot;Common Response&quot;. Possible response codes are, <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE <br/> PERMISSION_DENIED</li> </ul>",
    "name": "Google_Review_Invite",
    "group": "GoogleReview",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "shopId",
            "description": "<p>Shop ObjectId which has to be reviewed</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "userId",
            "description": "<p>CarOwner User ObjectId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "placeId",
            "description": "<p>Google business PlaceId. This is mandotary if placeId is not specified in Shop the profile. In case it is specified in both places placeId in the request will be used</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"userId\": \"5a7435f05496072bb41d5e63\",\n  \"shopId\": \"5a794842876dfb2e8c1d714a\",\n  \"placeId\": \"ChIJ13Jw0wxZ4joR1JDgjjjj-Xk\",\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/google-review.js",
    "groupTitle": "GoogleReview"
  },
  {
    "type": "get",
    "url": "http://<base-url>/google-review/invite/list",
    "title": "List Google Review Invites",
    "description": "<p>Retrieve list of Google Review Invites for the user.</p> <ul> <li>Response - &quot;Common Response&quot; containig the google review invite objects</li> </ul>",
    "name": "ListGoogleReviewInvite",
    "group": "GoogleReview",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "userId",
            "description": "<p>Filter by Invite receiver's userId</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "status",
            "description": "<p>Filter by Invitation status</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "shopId",
            "description": "<p>Filter by Invitation by shopId.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "pageNo",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "limit",
            "description": "<p>Records per page.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "sort",
            "description": "<p>Sorting field. Prepend &quot;-&quot; for decending, otherwise ascending. Possible sort fields are - createdAt</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n          \"googleReviewInvite\": {\n              \"total\": 1,\n              \"data\": [\n                  \"endpointArn\": [\n                      \"arn:aws:sns:us-east-1:075215484795:endpoint/GCM/dev-sf-android/f1edd961-0000-3d9d-837e-82e353f29594\"\n                  ],\n                  \"deviceType\": [ 1 ],\n                  \"status\": 0,\n                  \"createdAt\": \"2018-03-08 07:48:39\",\n                  \"updatedAt\": null,\n                  \"createdById\": \"5a8c0af12c12042d143f359a\",\n                  \"updatedById\": null,\n                  \"title\": \"ShopFlow\",\n                  \"message\": \"Review img1 on Google\",\n                  \"placeId\": \"ChIJ13Jw0wxZ4joR1JDg6woe-Xk\",\n                  \"userId\": \"5a8c0af12c12042d143f359a\",\n                  \"shopId\": \"5a72bb075fa38e2440255f7d\",\n                  \"link\": \"https://goo.gl/tFskJ9\",\n                  \"id\": \"5aa0ead709d24609385e4d80\"\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/google-review/invite/list",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/google-review.js",
    "groupTitle": "GoogleReview"
  },
  {
    "type": "post",
    "url": "http://<base-url>/mock-user",
    "title": "Create Mock User",
    "description": "<p>Add new mock user</p> <ul> <li>Refer &quot;Mock User Object&quot; for necessary parameters. Following example illustrates the valid parameters for mock user create. Rest of the parameters described in &quot;Mock User Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot;</li> </ul>",
    "name": "Create",
    "group": "MockUser",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"firstName\":\"Jhon\",\n  \"email\":\"jhon@gmail.com\",\n  \"lastName\":\"Smith\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/mock-user.js",
    "groupTitle": "MockUser"
  },
  {
    "type": "delete",
    "url": "http://<base-url>/mock-user/:id",
    "title": "Delete Mock User",
    "description": "<p>Delete existing mock user.</p> <ul> <li>Response - &quot;Common Response&quot;</li> </ul>",
    "name": "DeleteMockUser",
    "group": "MockUser",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Mock user id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/mock-user/5a3a4e096f6cd628e4d922a8",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/mock-user.js",
    "groupTitle": "MockUser"
  },
  {
    "type": "get",
    "url": "http://<base-url>/mock-user/:id",
    "title": "Get Mock User",
    "description": "<p>Retrieve existing mock user details.</p> <ul> <li>Response - &quot;Common Response&quot; containig the mock user object</li> </ul>",
    "name": "GetMockUser",
    "group": "MockUser",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>mock user id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": {\n        \"mockUser\": {\n            \"firstName\": \"Jhon\",\n            \"email\": \"jhon@gmail.com\",\n            \"lastName\": \"Smith\"\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/mock-user/5a4233af66b74f082c948566",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/mock-user.js",
    "groupTitle": "MockUser"
  },
  {
    "type": "get",
    "url": "http://<base-url>/mock-user/list",
    "title": "List Mock Users",
    "description": "<p>Retrieve list of mock users.</p> <ul> <li>Response - &quot;Common Response&quot; containig the mock user objects</li> </ul>",
    "name": "ListMockUsers",
    "group": "MockUser",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": {\n        \"mockUsers\": {\n            \"total\": 2,\n            \"data\": [\n                {\n                    \"firstName\": \"Jhon\",\n                    \"email\": \"jhon@gmail.com\",\n                    \"lastName\": \"Smith\"\n                },\n                {\n                    \"firstName\": \"Gavin\",\n                    \"email\": \"gavin@gmail.com\",\n                    \"lastName\": \"Smith\"\n                }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/mock-user/list",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/mock-user.js",
    "groupTitle": "MockUser"
  },
  {
    "type": "put",
    "url": "http://<base-url>/mock-user/<id>",
    "title": "Update Mock User",
    "description": "<p>Update existing mock user details.</p> <ul> <li>Refer &quot;Mock User Object&quot; for necessary parameters. Following example illustrates the valid parameters for mock user update. Rest of the parameters described in &quot;Mock User Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot;</li> </ul>",
    "name": "Update",
    "group": "MockUser",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"firstName\":\"Jhon\",\n  \"email\":\"jhon@gmail.com\",\n  \"lastName\":\"Smith\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/mock-user.js",
    "groupTitle": "MockUser"
  },
  {
    "type": "booking-request-object",
    "url": "{}",
    "title": "BookingRequest Object",
    "description": "<p>booking request object attributes.</p>",
    "name": "BookingRequestObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Object id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "userId",
            "description": "<p>User object id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "shopId",
            "description": "<p>Shop object id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "vehicleId",
            "description": "<p>Vehicle object id</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "bookingDateTime",
            "description": "<p>Preferred booking date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "message",
            "description": "<p>Booking Request message</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "status",
            "description": "<p>0 - Pending, 1 - Accepted, 2 - Rejected, 3- Cancelled</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "isNotified",
            "description": "<p>Whether booking request notified to shop manager. 0 - No, 1 - Yes</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "reply",
            "description": "<p>Shop owner's replay on booking request</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Record created date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "updatedAt",
            "description": "<p>Record updated date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "createdBy",
            "description": "<p>Partial user object of the record creator.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>Partial user object of the record updator.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "shop-object",
    "url": "{}",
    "title": "CarOwnerSubscription Object",
    "description": "<p>CarOwnerSubscription object attributes.</p>",
    "name": "CarOwnerSubscriptionObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Object id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "status",
            "description": "<p>0 - Pending, 1 - Accepted, 2 - Rejected, 3 - Unsubscribed, 4 - Synced</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Partial user object.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "shop",
            "description": "<p>Partial shop object.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Record created date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "updatedAt",
            "description": "<p>Record updated date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "createdBy",
            "description": "<p>Partial user object of the record creator.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>Partial user object of the record updator.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "chat-object",
    "url": "{}",
    "title": "Chat Object",
    "description": "<p>Chat object attributes.</p>",
    "name": "ChatObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Object id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": true,
            "field": "shopId",
            "description": "<p>Shop object id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "sender",
            "description": "<p>User object</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": true,
            "field": "senderId",
            "description": "<p>User id of the message sender</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "receiver",
            "description": "<p>User object</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": true,
            "field": "receiverId",
            "description": "<p>User id of the message receiver. When shop manager sending message, this should be carowner id. When car owner sending a message to shop, then this should be shop owner id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "isNotified",
            "description": "<p>Whether notified to shop manager. 0 - No, 1 - Yes</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "readStatus",
            "description": "<p>Whether message read by the receiver. 0 - No, 1 - Yes</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "message",
            "description": "<p>Chat message</p>"
          },
          {
            "group": "Parameter",
            "type": "attachments[]",
            "optional": true,
            "field": "attachments",
            "description": "<p>List of file names uploaded to S3 bucket</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "createdBy",
            "description": "<p>User object of the message creator</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Record created date &amp; time in UTC.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "shop-object",
    "url": "{}",
    "title": "DeviceInfo Object",
    "description": "<p>DeviceInfo object attributes.</p>",
    "name": "DeviceInfoObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Object id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "150",
            "optional": false,
            "field": "token",
            "description": "<p>Unique device token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "500",
            "optional": false,
            "field": "endpointArn",
            "description": "<p>device endpoint arn</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "deviceType",
            "description": "<p>1 - Android, 2 - iOS.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": true,
            "field": "userId",
            "description": "<p>car owner's userId.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Record created date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "updatedAt",
            "description": "<p>Record updated date &amp; time in UTC.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "mock-user-object",
    "url": "{}",
    "title": "Mock User Object",
    "description": "<p>Mock User object attributes.</p>",
    "name": "MockUserObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>First name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name.</p>"
          },
          {
            "group": "Parameter",
            "type": "email",
            "optional": false,
            "field": "email",
            "description": "<p>address.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "permission-object",
    "url": "{}",
    "title": "Permission Object",
    "description": "<p>Permission object attributes.</p>",
    "name": "PermissionObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Permission name. Ex:user.create, user.update. unique</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "category",
            "description": "<p>Permission category.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the permission.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Record created date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "updatedAt",
            "description": "<p>Record updated date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "createdBy",
            "description": "<p>Partial user object of the record creator.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>Partial user object of the record updator.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "push-notification-info",
    "url": "{}",
    "title": "Push Notification Info Object",
    "description": "<p>Push Notification Info object attributes.</p>",
    "name": "PushNotificationInfoObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Object id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Message status. 1 - pending, 2 - delivered, 3 - failed</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Notification message</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Notification title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Device token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "shopId",
            "description": "<p>Id of the shop</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Record created date &amp; time in UTC.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "push-notification-request-object",
    "url": "{}",
    "title": "Push Notification Request Object",
    "description": "<p>Push notification request object attributes.</p>",
    "name": "PushNotificationRequestObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "id",
            "description": "<p>Object id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": true,
            "field": "shopId",
            "description": "<p>Request making shop id. This is not necessary when super admin making a request.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "shopIds",
            "description": "<p>Array of shop ids. If this is set, it will send push notifications to entire users in that shop. Either shopIds or users param need to be present.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "users",
            "description": "<p>Array of user ids. Either shopIds or users param need to be present.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Notification message</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Notification title. Default title is set to ShopFlow</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Record created date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "updatedAt",
            "description": "<p>Record updated date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "createdBy",
            "description": "<p>Partial user object of the record creator.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>Partial user object of the record updator.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "push-notification-template-object",
    "url": "{}",
    "title": "Push Notification Template Object",
    "description": "<p>Push notification template object attributes.</p>",
    "name": "PushNotificationTemplateObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "id",
            "description": "<p>Object id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "shopId",
            "description": "<p>Request making shop id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "100",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the template.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "150",
            "optional": false,
            "field": "subject",
            "description": "<p>Push notification subject.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Notification message</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "isDefault",
            "description": "<p>Whether default template(super admin added) or not.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Record created date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "updatedAt",
            "description": "<p>Record updated date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "createdBy",
            "description": "<p>Partial user object of the record creator.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>Partial user object of the record updator.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "reward-object",
    "url": "{}",
    "title": "Reward Object",
    "description": "<p>Reward object attributes.</p>",
    "name": "RewardObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "id",
            "description": "<p>Object id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "shopId",
            "description": "<p>Shop ObjectID.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "userId",
            "description": "<p>User ObjectID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "points",
            "description": "<p>Remaining reward points.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Record created date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "updatedAt",
            "description": "<p>Record updated date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "createdBy",
            "description": "<p>Partial user object of the record creator.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "reward-object",
    "url": "{}",
    "title": "Reward Transaction Object",
    "description": "<p>Reward Transaction object attributes.</p>",
    "name": "RewardTransactionObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "id",
            "description": "<p>Object id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "rewardId",
            "description": "<p>Reward ObjectID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "points",
            "description": "<p>Transaction points.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "action",
            "description": "<p>0 - Add, 1 - Redeem points.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remarks",
            "description": "<p>Transaction remark</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Record created date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "updatedAt",
            "description": "<p>Record updated date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "createdBy",
            "description": "<p>Partial user object of the record creator.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "role-object",
    "url": "{}",
    "title": "Role Object",
    "description": "<p>Role object attributes.</p>",
    "name": "RoleObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Role name. unique</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Role description.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "permissions",
            "description": "<p>Array of permission Ids or Objects.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Record created date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "updatedAt",
            "description": "<p>Record updated date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "createdBy",
            "description": "<p>Partial user object of the record creator.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>Partial user object of the record updator.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "shop-object",
    "url": "{}",
    "title": "Shop Invite Object",
    "description": "<p>Shop Invite object attributes.</p>",
    "name": "ShopInviteObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Object id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "100",
            "optional": false,
            "field": "email",
            "description": "<p>User email.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "shopId.",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Record created date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "updatedAt",
            "description": "<p>Record updated date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "createdBy",
            "description": "<p>Partial user object of the record creator.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>Partial user object of the record updator.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "shop-object",
    "url": "{}",
    "title": "Shop Object",
    "description": "<p>Shop object attributes.</p>",
    "name": "ShopObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Object id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "150",
            "optional": false,
            "field": "brandName",
            "description": "<p>Brand name of the shop.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "150",
            "optional": false,
            "field": "businessName",
            "description": "<p>Business name of the shop.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "60",
            "optional": false,
            "field": "registrationNumber",
            "description": "<p>Shop registration number.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "streetName",
            "description": "<p>Street name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "100",
            "optional": false,
            "field": "city",
            "description": "<p>City</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "100",
            "optional": false,
            "field": "state",
            "description": "<p>State</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "15",
            "optional": false,
            "field": "zip",
            "description": "<p>ZIP code.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "30",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Shop phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "30",
            "optional": true,
            "field": "faxNumber",
            "description": "<p>Shop fax number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "100",
            "optional": false,
            "field": "email",
            "description": "<p>Shop email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "100",
            "optional": false,
            "field": "gmail",
            "description": "<p>Shop gmail.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "googlePlusPageUrl",
            "description": "<p>Google+ page URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "facebookPageUrl",
            "description": "<p>Facebook page URL.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "twitterPageUrl",
            "description": "<p>Twitter page URL.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "instagramPageUrl",
            "description": "<p>Instagram page URL.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "logoName",
            "description": "<p>business logo Unique identifier which was returned from S3 upload.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "bannerName",
            "description": "<p>business banner Unique identifier which was returned from S3 upload.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "shopOwner",
            "description": "<p>owner of the shop.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "createdBy",
            "description": "<p>Partial user object of the record creator.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>Partial user object of the record updator.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "subscriptionStatus",
            "description": "<p>User,s subscriptions status to the shop. 0 - Pending, 1 - Accepted, 2 - Rejected, 3 - Unsubscribed, -1 - No subscription</p>"
          },
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": true,
            "field": "businessDays",
            "description": "<p>Business operational days as integer array. 1-Sunday, 7-Saturday</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "geoLocation",
            "description": "<p>Comma seperated geo coordinates of the shop location latitude,longitude. Ex:6.925438417003826,79.88441728588873</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "businessHours",
            "description": "<p>as digital time without colon ';' <br/> Example: <br/> &quot;businessHours&quot;: { <br/> &quot;openTime&quot;: 900, <br/> &quot;closeTime&quot;: 1800 <br/></p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "shopManager",
            "description": "<p>Shop manager details in following format' <br/> Example: <br/> &quot;shopManager&quot;: { <br/> &quot;name&quot;: &quot;John Mathews&quot;, <br/> &quot;email&quot;: &quot;jmathews@sf.com&quot;, <br/> &quot;phone&quot;: 1800 <br/> },</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "user-object",
    "url": "{}",
    "title": "User Object",
    "description": "<p>User object attributes.</p>",
    "name": "UserObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userType",
            "description": "<p>1 - System user, 2 - Normal user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "30",
            "optional": true,
            "field": "firstName",
            "description": "<p>Firstname of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "60",
            "optional": true,
            "field": "lastName",
            "description": "<p>Lastname of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "150",
            "optional": true,
            "field": "email",
            "description": "<p>User email. If user type is 2 then this attribute is mandatory. Unique</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password, SHA1 encrypted password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "150",
            "optional": true,
            "field": "sysEmail",
            "description": "<p>Email for system users. If user type is 1 then this attribute is mandatory. Unique</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "timezone",
            "description": "<p>User timezone. Default Asia/Colombo. Use https://momentjs.com/timezone/ to pick timezone</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "roleId",
            "description": "<p>Role id of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "status",
            "description": "<p>1 - Active, 2 - Inactive.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "30",
            "optional": true,
            "field": "mobile",
            "description": "<p>User mobile number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "gender",
            "description": "<p>1 - Male, 2 - Female. Default 1</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "lastAccess",
            "description": "<p>Last access date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Record created date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "updatedAt",
            "description": "<p>Record updated date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "createdBy",
            "description": "<p>Partial user object of the record creator.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>Partial user object of the record updator.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "accessToken",
            "description": "<p>Json Web Token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "oldPassword",
            "description": "<p>Old password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "newPassword",
            "description": "<p>New password.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "isM1SyncedUser",
            "description": "<p>Whether M1 Synced user. 1 - Yes, 0 - No</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": true,
            "field": "shopId",
            "description": "<p>Shop id user associates. This is only for system users(shop owners, system users)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "homePhone",
            "description": "<p>User's home phone number. This is available only for users synced from M1.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "vehicle-object",
    "url": "{}",
    "title": "Vehicle Object",
    "description": "<p>Vehicle object attributes.</p>",
    "name": "VehicleObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Object id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": true,
            "field": "shopId",
            "description": "<p>Shop id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": true,
            "field": "userId",
            "description": "<p>User object id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "make",
            "description": "<p>Vehicle make</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "licenseNumber",
            "description": "<p>Vehicle license number</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "year",
            "description": "<p>Vehicle manufactured year</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Vehicle name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "model",
            "description": "<p>Vehicle modle name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "vehicleId",
            "description": "<p>Vehicle id as in M1 DB</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "custEmail",
            "description": "<p>Associated customer email address</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "odometer",
            "description": "<p>Vehicle odometer</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "inspDate",
            "description": "<p>Inspect date</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "lastInDate",
            "description": "<p>Last inspect date</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "mfgDate",
            "description": "<p>Vehicle manufactured date</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Record created date &amp; time in UTC.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "updatedAt",
            "description": "<p>Record updated date &amp; time in UTC.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "vehicle-recommedation-object",
    "url": "{}",
    "title": "VehicleRecommedation Object",
    "description": "<p>Vehicle recommedation object attributes.</p>",
    "name": "VehicleRecommedationObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Object id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "action",
            "description": "<p>Action. A-New record, U-Modified record, D-deleted record</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": true,
            "field": "vehicleId",
            "description": "<p>Vehicle object id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": true,
            "field": "userId",
            "description": "<p>User object id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": true,
            "field": "shopId",
            "description": "<p>Shop object id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "m1VehicleId",
            "description": "<p>Vehicle id as in M1 DB</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "recommendationId",
            "description": "<p>Recommendation id as in M1 DB</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "recommendDate",
            "description": "<p>Recommend date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Service description</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "isNotified",
            "description": "<p>Whether push notification sent or not. 0 - No, 1 - Yes</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Record created date &amp; time in UTC.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "vehicle-repair-history-object",
    "url": "{}",
    "title": "VehicleRepairHistory Object",
    "description": "<p>Vehicle repair history object attributes.</p>",
    "name": "VehicleRepairHistoryObject",
    "group": "Objects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Object id.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": true,
            "field": "vehicleId",
            "description": "<p>Vehicle object id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": true,
            "field": "userId",
            "description": "<p>User object id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": true,
            "field": "shopId",
            "description": "<p>Shop object id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "m1VehicleId",
            "description": "<p>Vehicle id as in M1 DB</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "repairOrderId",
            "description": "<p>Repair order</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "lineItemId",
            "description": "<p>Line item</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "invoiceNo",
            "description": "<p>Invoice number</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "dateOfService",
            "description": "<p>Last service date</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "odometer",
            "description": "<p>Odometer reading at the service</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Service description</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Record created date &amp; time in UTC.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "data/apidoc/objects.js",
    "groupTitle": "Objects"
  },
  {
    "type": "post",
    "url": "http://<base-url>/permission",
    "title": "Create Permission",
    "description": "<p>Add new permission</p> <ul> <li>Refer &quot;Permission Object&quot; for necessary parameters. Following example illustrates the valid parameters for permission create. Rest of the parameters described in &quot;Permission Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot; with permission id</li> <li>Authorization token required in header.</li> </ul>",
    "name": "Create",
    "group": "Permission",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"name\":\"Permission.Create\",\n  \"description\":\"Create a permission\",\n  \"category\":\"Permission\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/permission.js",
    "groupTitle": "Permission"
  },
  {
    "type": "delete",
    "url": "http://<base-url>/permission/:id",
    "title": "Delete Permission",
    "description": "<p>Delete existing permission.</p> <ul> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> </ul>",
    "name": "DeletePermission",
    "group": "Permission",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Permission id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/permission/5a3a4e096f6cd628e4d922a8",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/permission.js",
    "groupTitle": "Permission"
  },
  {
    "type": "get",
    "url": "http://<base-url>/permission/:id",
    "title": "Get Permission",
    "description": "<p>Retrieve existing permission details.</p> <ul> <li>Response - &quot;Common Response&quot; containig the permission object</li> <li>Authorization token required in header.</li> </ul>",
    "name": "GetPermission",
    "group": "Permission",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Permission id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": {\n        \"permission\": {\n            \"name\": \"Permission.Update\",\n            \"description\": \"Create a permission\",\n            \"category\": \"Permission\",\n            \"updatedAt\": null,\n            \"createdAt\": \"2017-12-26 11:34:07\",\n            \"createdBy\": {\n                \"firstName\": \"Aruna\",\n                \"lastName\": \"Attanayake\"\n            },\n            \"updatedBy\": null,\n            \"id\": \"5a4233af66b74f082c948566\"\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/permission/5a4233af66b74f082c948566",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/permission.js",
    "groupTitle": "Permission"
  },
  {
    "type": "get",
    "url": "http://<base-url>/permission/list",
    "title": "List permissions",
    "description": "<p>Retrieve list of permissions.</p> <ul> <li>Response - &quot;Common Response&quot; containig the permission objects</li> <li>Authorization token required in header.</li> </ul>",
    "name": "ListPermissions",
    "group": "Permission",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"permissions\": {\n            \"total\": 3,\n            \"data\": [\n                {\n                    \"name\": \"Permission.Update\",\n                    \"description\": \"Create a permission\",\n                    \"category\": \"Permission\",\n                    \"updatedAt\": null,\n                    \"createdAt\": \"2017-12-26 11:34:07\",\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"updatedBy\": null,\n                    \"id\": \"5a4233af66b74f082c948566\"\n                },\n                {\n                    \"name\": \"Permission.1e11q\",\n                    \"description\": \"Updated\",\n                    \"category\": \"Permission\",\n                    \"updatedAt\": \"2017-12-26 15:17:00\",\n                    \"createdAt\": \"2017-12-26 11:34:50\",\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"updatedBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"id\": \"5a4233da66b74f082c948568\"\n                },\n                {\n                    \"name\": \"Permission.Create\",\n                    \"description\": \"Create a permission\",\n                    \"category\": \"Permission\",\n                    \"updatedAt\": null,\n                    \"createdAt\": \"2017-12-28 02:20:58\",\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"updatedBy\": null,\n                    \"id\": \"5a44550a9a07ce2bb052a9bf\"\n                }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/permission/list",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/permission.js",
    "groupTitle": "Permission"
  },
  {
    "type": "put",
    "url": "http://<base-url>/permission/<id>",
    "title": "Update Permission",
    "description": "<p>Update existing permission details.</p> <ul> <li>Refer &quot;Permission Object&quot; for necessary parameters. Following example illustrates the valid parameters for permission update. Rest of the parameters described in &quot;Permission Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> </ul>",
    "name": "Update",
    "group": "Permission",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"name\":\"Permission.Create\",\n  \"description\":\"Create a permission\",\n  \"category\":\"Permission\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/permission.js",
    "groupTitle": "Permission"
  },
  {
    "type": "delete",
    "url": "http://<base-url>/push-notification-info/:id",
    "title": "Delete Push Notification Info",
    "description": "<p>Delete existing PushNotificationInfo.</p> <ul> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> </ul>",
    "name": "DeletePushNotificationInfo",
    "group": "PushNotificationInfo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>PushNotificationInfo id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/push-notification-info/5a8a59c67fea9013b015e6a4",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/push-notification-info.js",
    "groupTitle": "PushNotificationInfo"
  },
  {
    "type": "get",
    "url": "http://<base-url>/push-notification-info/:id",
    "title": "Get Push Notification Info",
    "description": "<p>Retrieve push notification info.</p> <ul> <li>Response - &quot;Common Response&quot; containig the push notification info object</li> <li>Authorization token required in header.</li> <li>System users can get push notification associated with any user.</li> <li>CarOwners can get only push notification intented for him</li> </ul>",
    "name": "GetPushNotificationInfo",
    "group": "PushNotificationInfo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>notification Info ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"pushNotificationInfo\": {\n              \"token\": \"fs_NIbP0ILs:APA91bEODGiP76f4qe47X_5AG01Bp1DbqjhAicOALzmsIhvNvQl70YFiSWqgZK5M0j78ejhx-MGSDmLm-Iskb9iB5a6dMvr-UEDeQ0lqLLmjqg2HnSfNaTf6vk-hRn3JSzbgl24sNr3u\",\n              \"createdAt\": \"2018-03-02 07:30:01\",\n              \"status\": 2, \n              \"shop\": {\n                  \"id\": \"5a72bb075fa38e2440255f7d\",\n                  \"brandName\": \"img1\",\n                  \"logo\": \"https://s3.amazonaws.com/shop-flow-dev/JD45ILO7ACPDQ.jpg\"\n              },\n              \"userId\": \"5a7929db37ab8e0cb4f587b2\",\n              \"title\": \"My title\",\n              \"text\": \"Hello\",\n              \"id\": \"5a98fd79e045fc25e433d906\"\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/push-notification-info/5aa6342b9851a92a3ca21fac",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/push-notification-info.js",
    "groupTitle": "PushNotificationInfo"
  },
  {
    "type": "get",
    "url": "http://<base-url>/push-notification-info/list",
    "title": "List Push Notification Info",
    "description": "<p>Retrieve list of push notifications.</p> <ul> <li>Response - &quot;Common Response&quot; containig the push notification info objects</li> <li>Authorization token required in header.</li> <li>System users can get push notifications associated with any user.</li> <li>CarOwners can get only push notifications recevied by him</li> </ul>",
    "name": "ListPushNotificationInfo",
    "group": "PushNotificationInfo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "userId",
            "description": "<p>User id of the push notification receiver.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "token",
            "description": "<p>Device token. Send this parameter when you need to get notification of specific device.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "shopId",
            "description": "<p>Shop id. Send this parameter when you need to filter notifications by shop.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "pageNo",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "limit",
            "description": "<p>Records per page.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting field. Prepend &quot;-&quot; for decending, otherwise ascending. Possible sort fields are - createdAt</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"pushNotificationInfo\": {\n            \"total\": 2,\n            \"data\": [\n                {\n                    \"token\": \"fs_NIbP0ILs:APA91bEODGiP76f4qe47X_5AG01Bp1DbqjhAicOALzmsIhvNvQl70YFiSWqgZK5M0j78ejhx-MGSDmLm-Iskb9iB5a6dMvr-UEDeQ0lqLLmjqg2HnSfNaTf6vk-hRn3JSzbgl24sNr3u\",\n                    \"createdAt\": \"2018-03-02 07:30:01\",\n                    \"status\": 2,\n                    \"shop\": {\n                          \"id\": \"5a72bb075fa38e2440255f7d\",\n                          \"brandName\": \"img1\",\n                          \"logo\": \"https://s3.amazonaws.com/shop-flow-dev/JD45ILO7ACPDQ.jpg\"\n                    },\n                    \"userId\": \"5a7929db37ab8e0cb4f587b2\",\n                    \"title\": \"My title\",\n                    \"text\": \"Hello\",\n                    \"logo\": \"https://s3.amazonaws.com/shop-flow-dev/JD45ILO7ACPDB.jpg\",\n                    \"id\": \"5a98fd79e045fc25e433d906\"\n                },\n                {\n                    \"token\": \"f6hcTL2mtXU:APA91bGNmXjKE7oDriRVmoRIAlMOGu_NFm_fFf5gLF2DqrZYO6LX2GFbOzYRddVy6W7gWfxjjy69Um2sv0sR7tDLzQf1-2iKg_5bIMR50RZPJumKWLc2qKB6JWyZwqtSmLBzRsiBUi0G\",\n                    \"createdAt\": \"2018-03-02 07:30:01\",\n                    \"status\": 2,\n                    \"shop\": {\n                          \"id\": \"5a72bb075fa38e2440255f7d\",\n                          \"brandName\": \"img1\",\n                          \"logo\": \"https://s3.amazonaws.com/shop-flow-dev/JD45ILO7ACPDQ.jpg\"\n                    },\n                    \"userId\": \"5a7929db37ab8e0cb4f587b2\",\n                    \"title\": \"My title\",\n                    \"text\": \"Hello\",\n                    \"logo\": \"https://s3.amazonaws.com/shop-flow-dev/JD45ILO7ACPDC.jpg\",\n                    \"id\": \"5a98fd79e045fc25e433d905\"\n                }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/push-notification-info/list",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/push-notification-info.js",
    "groupTitle": "PushNotificationInfo"
  },
  {
    "type": "put",
    "url": "http://<base-url>/push-notification-info/:id/mark-as-read",
    "title": "Message Mark as Read",
    "description": "<p>Mark message status as read</p> <ul> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> <li>Possible eror codes: <br/> SUCCESS <br/> PERMISSION_DENIED <br> FAIL <br> MISSING_MANDATORY_ATTRIBUTE <br> RECORD_NOT_FOUND</li> </ul>",
    "name": "MarkAsRead",
    "group": "PushNotificationInfo",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/push-notification-info.js",
    "groupTitle": "PushNotificationInfo"
  },
  {
    "type": "get",
    "url": "http://<base-url>/push-notification-info/msg-count",
    "title": "Retreive Message Counts",
    "description": "<p>Retrieve message counts of specific user.</p> <ul> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> <li>Possible eror codes: <br/> SUCCESS <br/> PERMISSION_DENIED <br> FAIL <br> MISSING_MANDATORY_ATTRIBUTE <br></li> </ul>",
    "name": "MessageCount",
    "group": "PushNotificationInfo",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"msgCounts\": {\n            \"total\": 2,\n            \"unread\": 0,\n            \"read\": 2\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/push-notification-info/msg-count?userId=5a8a59c67fea9013b015e6a4",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/push-notification-info.js",
    "groupTitle": "PushNotificationInfo"
  },
  {
    "type": "post",
    "url": "http://<base-url>/push-notification-request",
    "title": "Create Push Notification Request",
    "description": "<p>Add new push notification request</p> <ul> <li>Authorization token required in header.</li> <li>Mandatory fields - Either users or shopIds need to be present</li> <li>Refer &quot;Push Notification Request Object&quot; for necessary parameters. Following example illustrates the valid parameters for push notification request create. Rest of the parameters described in &quot;Push Notification Request Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot; with push notification request id. Possible response codes are, <br/> PERMISSION_DENIED <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE</li> </ul>",
    "name": "Create",
    "group": "PushNotificationRequest",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n\t\"shopId\":\"5a6ad448c80f921fc47c89ec\",\n\t\"shopIds\": [],\n\t\"users\": [\"5a792a2cd419dd10c4f9c094\", \"5a7929db37ab8e0cb4f587b2\"],\n  \"title\": \"Hello\",\n\t\"text\": \"Hello World\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/push-notification-requests.js",
    "groupTitle": "PushNotificationRequest"
  },
  {
    "type": "delete",
    "url": "http://<base-url>/push-notification-request/:id",
    "title": "Delete Push Notification Request",
    "description": "<p>Delete push notification request. This will deletes all the associated push notifications as well.</p> <ul> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> </ul>",
    "name": "DeletePushNotificationRequest",
    "group": "PushNotificationRequest",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Push notification request record id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/push-notification-request/5b02581b00e15a275cc371ea",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/push-notification-requests.js",
    "groupTitle": "PushNotificationRequest"
  },
  {
    "type": "get",
    "url": "http://<base-url>/push-notification-request/:id",
    "title": "Get Push Notification Request",
    "description": "<p>Get Push Notification Request.</p> <ul> <li>Response - &quot;Common Response&quot; containig the Push Notification Request object. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>RECORD_NOT_FOUND <br/>PERMISSION_DENIED</li> <li>Authorization token required in header.</li> </ul>",
    "name": "GetPushNotificationRequest",
    "group": "PushNotificationRequest",
    "examples": [
      {
        "title": "Example Request:",
        "content": "/push-notification-request/5b02581b00e15a275cc371ea",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"pushNotificationRequest\": {\n            \"updatedAt\": \"2018-05-21 05:24:51\",\n            \"createdAt\": \"2018-05-21 05:24:43\",\n            \"title\": \"Update on your booking\",\n            \"text\": \"Appointment confirmed\",\n            \"status\": 2,\n            \"users\": [\n                \"5ad5908836e28a2500ab6bff\"\n            ],\n            \"shopIds\": [],\n            \"shopId\": \"5ad58a7f78d2130704b3ce05\",\n            \"createdBy\": {\n                \"firstName\": \"Aruna\",\n                \"lastName\": \"Attanayake\"\n            },\n            \"updatedBy\": null,\n            \"id\": \"5b02581b00e15a275cc371ea\"\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/push-notification-requests.js",
    "groupTitle": "PushNotificationRequest"
  },
  {
    "type": "get",
    "url": "http://<base-url>/push-notification-request/list?shopId=<shopId>",
    "title": "List Push Notification Requests",
    "description": "<p>List Push Notification Requests.</p> <ul> <li>Response - &quot;Common Response&quot; containig the PushNotificationRequest objects. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>PERMISSION_DENIED <br/>MISSING_MANDATORY_ATTRIBUTE</li> <li>Authorization token required in header.</li> </ul>",
    "name": "ListPushNotificationRequests",
    "group": "PushNotificationRequest",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "shopId",
            "description": "<p>ShopId for filtering</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "pageNo",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "limit",
            "description": "<p>Records per page.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting field. Prepend &quot;-&quot; for decending, otherwise ascending.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/push-notification-request/list",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"pushNotificationRequests\": {\n            \"total\": 1,\n            \"data\": [\n                {\n                    \"updatedAt\": \"2018-05-21 05:24:51\",\n                    \"createdAt\": \"2018-05-21 05:24:43\",\n                    \"title\": \"Update on your booking\",\n                    \"text\": \"Appointment confirmed\",\n                    \"status\": 2,\n                    \"users\": [\n                        {\n                            \"id\": \"5ad5908836e28a2500ab6bff\",\n                            \"firstName\": \"John\",\n                            \"lastName\": \"Dwulet\"\n                        }\n                    ],\n                    \"shopIds\": [],\n                    \"shopId\": \"5ad58a7f78d2130704b3ce05\",\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"updatedBy\": null,\n                    \"id\": \"5b02581b00e15a275cc371ea\"\n                }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/push-notification-requests.js",
    "groupTitle": "PushNotificationRequest"
  },
  {
    "type": "post",
    "url": "http://<base-url>/push-notification-template",
    "title": "Create Push Notification Template",
    "description": "<p>Add new push notification template</p> <ul> <li>Authorization token required in header.</li> <li>Mandatory fields - shopId, title, subject, text</li> <li>Refer &quot;Push Notification Template Object&quot; for necessary parameters. Following example illustrates the valid parameters for push notification template create. Rest of the parameters described in &quot;Push Notification Template Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot; with push notification template id. Possible response codes are, <br/> PERMISSION_DENIED <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE</li> </ul>",
    "name": "Create",
    "group": "PushNotificationTemplate",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"shopId\": \"5ad58a7f78d2130704b3ce05\",\n  \"title\": \"Engin repir offer\",\n  \"subject\": \"body wash\",\n  \"text\": \"viranga body wash....\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/push-notification-template.js",
    "groupTitle": "PushNotificationTemplate"
  },
  {
    "type": "put",
    "url": "http://<base-url>/push-notification-template/:id",
    "title": "Update Push Notification Template",
    "description": "<p>Update existing notification template</p> <ul> <li>Authorization token required in header.</li> <li>Refer &quot;Push Notification Template Object&quot; for necessary parameters. Following example illustrates the valid parameters for push notification template update. Rest of the parameters described in &quot;Push Notification Template Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot; with push notification template id. Possible response codes are, <br/> PERMISSION_DENIED <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE</li> </ul>",
    "name": "Create",
    "group": "PushNotificationTemplate",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"shopId\": \"5ad58a7f78d2130704b3ce05\",\n  \"title\": \"Engin repir offer\",\n  \"subject\": \"body wash\",\n  \"text\": \"viranga body wash....\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/push-notification-template.js",
    "groupTitle": "PushNotificationTemplate"
  },
  {
    "type": "delete",
    "url": "http://<base-url>/push-notification-template/:id",
    "title": "Delete Push Notification Template",
    "description": "<p>Delete push notification template.</p> <ul> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> </ul>",
    "name": "DeletePushNotificationTemplate",
    "group": "PushNotificationTemplate",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Push notification template record id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/push-notification-template/5b02581b00e15a275cc371ea",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/push-notification-template.js",
    "groupTitle": "PushNotificationTemplate"
  },
  {
    "type": "get",
    "url": "http://<base-url>/push-notification-template/:id",
    "title": "Get Push Notification Template",
    "description": "<p>Get Push Notification Template.</p> <ul> <li>Response - &quot;Common Response&quot; containig the Push Notification Template object. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>RECORD_NOT_FOUND <br/>PERMISSION_DENIED</li> <li>Authorization token required in header.</li> </ul>",
    "name": "GetPushNotificationTempate",
    "group": "PushNotificationTemplate",
    "examples": [
      {
        "title": "Example Request:",
        "content": "/push-notification-template/5b02581b00e15a275cc371ea",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"pushNotificationTemplate\": {\n            \"updatedAt\": \"2018-07-10 08:45:51\",\n            \"createdAt\": \"2018-07-10 08:45:51\",\n            \"title\": \"body wash\",\n            \"subject\": \"body wash\",\n            \"text\": \"body wash....\",\n            \"isDefault\": 0,\n            \"shopId\": \"5ad58a7f78d2130704b3ce05\",\n            \"createdBy\": {\n                \"firstName\": \"Aruna\",\n                \"lastName\": \"Attanayake\"\n            },\n            \"updatedBy\": null,\n            \"id\": \"5b44723f5afa431ecc9dcf70\"\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/push-notification-template.js",
    "groupTitle": "PushNotificationTemplate"
  },
  {
    "type": "get",
    "url": "http://<base-url>/push-notification-template/list?shopId=<shopId>",
    "title": "List Push Notification Templates",
    "description": "<p>List Push Notification Templates.</p> <ul> <li>Response - &quot;Common Response&quot; containig the PushNotificationTemplate objects. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>PERMISSION_DENIED <br/>MISSING_MANDATORY_ATTRIBUTE</li> <li>Authorization token required in header.</li> </ul>",
    "name": "ListPushNotificationTemplates",
    "group": "PushNotificationTemplate",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "shopId",
            "description": "<p>ShopId for filtering</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "pageNo",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "limit",
            "description": "<p>Records per page.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting field. Prepend &quot;-&quot; for decending, otherwise ascending.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/push-notification-template/list",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"pushNotificationTemplates\": {\n            \"total\": 3,\n            \"data\": [\n                {\n                    \"updatedAt\": \"2018-07-11 04:11:43\",\n                    \"createdAt\": \"2018-07-10 09:31:31\",\n                    \"title\": \"bodyddd wash\",\n                    \"subject\": \"bodyddd wash\",\n                    \"text\": \"Yohan body wash....\",\n                    \"isDefault\": 1,\n                    \"shopId\": \"5ad58a7f78d2130704b3ce05\",\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"updatedBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"id\": \"5b447cf393f46d349022bf2d\"\n                },\n                {\n                    \"updatedAt\": \"2018-07-10 09:31:29\",\n                    \"createdAt\": \"2018-07-10 09:31:29\",\n                    \"title\": \"body wash\",\n                    \"subject\": \"body wash\",\n                    \"text\": \"viranga body wash....\",\n                    \"isDefault\": 0,\n                    \"shopId\": \"5ad58a7f78d2130704b3ce05\",\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"updatedBy\": null,\n                    \"id\": \"5b447cf193f46d349022bf2c\"\n                },\n                {\n                    \"updatedAt\": \"2018-07-10 08:45:51\",\n                    \"createdAt\": \"2018-07-10 08:45:51\",\n                    \"title\": \"body wash\",\n                    \"subject\": \"body wash\",\n                    \"text\": \"body wash....\",\n                    \"isDefault\": 0,\n                    \"shopId\": \"5ad58a7f78d2130704b3ce05\",\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"updatedBy\": null,\n                    \"id\": \"5b44723f5afa431ecc9dcf70\"\n                }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/push-notification-template.js",
    "groupTitle": "PushNotificationTemplate"
  },
  {
    "type": "get",
    "url": "http://<base-url>/reward?userId=:id&shopId=:id",
    "title": "Get Reward",
    "description": "<p>Retrieve Reward by userId and shopId.</p> <ul> <li>Authorization token required in header.</li> <li>Response - &quot;Common Response&quot; containig the user object. Possible response codes are, <br/> PERMISSION_DENIED <br/>SUCCESS <br/>FAIL <br/>RECORD_NOT_FOUND</li> </ul>",
    "name": "GetReward",
    "group": "Reward",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "shopId",
            "description": "<p>Shop id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": {\n        \"reward\": {\n            \"updatedAt\": null,\n            \"createdAt\": \"2017-12-20 11:48:25\",\n            \"shopId\": \"5a6f035a318ff528089bb857\",\n            \"points\": 1,\n            \"createdBy\": {\n              \"firstName\": \"Layansan\",\n              \"lastName\": \"Rajendram\"\n            },\n            \"updatedBy\": null,\n            \"id\": \"5b72a0fc44210707906eb3a7\",\n            \"user\": {\n              \"id\": \"5a8c0af12c12042d143f359a\",\n              \"firstName\": \"Layansan\",\n              \"lastName\": \"Rajendram\"\n            }\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/reward?shopId=5a6f035a318ff528089bb857&userId=5a8c0af12c12042d143f359a",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/reward.js",
    "groupTitle": "Reward"
  },
  {
    "type": "get",
    "url": "http://<base-url>/reward/list?shopId=<shopId>",
    "title": "List rewards",
    "description": "<p>Retrieve rewards</p> <ul> <li> <p>Refer &quot;Reward Object&quot;. Following example illustrates the valid parameters for reward list. Rest of the parameters described in &quot;Reward Object&quot; are used for viewing and some other requests.</p> </li> <li> <p>Response - &quot;Common Response&quot; containig the reward objects. Possible response codes are <br/> PERMISSION_DENIED <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE</p> </li> <li> <p>Authorization token required in header.</p> </li> </ul>",
    "name": "ListRewards",
    "group": "Reward",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "shopId",
            "description": "<p>Shop id. (Mandatory for shop owner)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "userId",
            "description": "<p>User id for filtering</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"rewards\": {\n            \"total\": 2,\n            \"data\": [\n                {\n                    \"updatedAt\": \"2018-06-05 06:06:46\",\n                    \"createdAt\": \"2018-06-05 06:06:46\",\n                    \"shopId\": \"5ad58a7f78d2130704b3ce05\",\n                    \"points\": 0,\n                    \"readStatus\": 0,\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"updatedBy\": null,\n                    \"id\": \"5b162876f96bc2069c5b8c18\",\n                    \"user\": {\n                        \"id\": \"5ad58a1178d2130704b3ce04\",\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    }\n                },\n                {\n                    \"updatedAt\": \"2018-06-05 03:44:30\",\n                    \"createdAt\": \"2018-06-05 03:44:30\",\n                    \"shopId\": \"5ad58a7f78d2130704b3ce05\",\n                    \"points\": 5,\n                    \"createdBy\": {\n                        \"firstName\": \"John\",\n                        \"lastName\": \"Dwulet\"\n                    },\n                    \"updatedBy\": null,\n                    \"id\": \"5b16071ee880590288787dcf\",\n                    \"user\": {\n                        \"id\": \"5ad58a1178d2130704b3ce04\",\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    }\n                }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/reward/list?shopId=5a6f035a318ff528089bb857",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/reward.js",
    "groupTitle": "Reward"
  },
  {
    "type": "post",
    "url": "http://<base-url>/reward-transaction",
    "title": "Add/Redeem Reward",
    "description": "<p>Add/Redeem Reward points of a user</p> <ul> <li>Authorization token required in header.</li> <li>Refer &quot;RewardTransaction Object&quot; for necessary parameters. Following example illustrates the valid parameters for creating reward transaction. Rest of the parameters described in &quot;RewardTransaction Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot; with RewardTransaction id. Possible response codes are, <br/> PERMISSION_DENIED <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE <br/> USER_NOT_SUBSCRIBED <br/> INSUFFICIENT_POINTS</li> </ul>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "shopId",
            "description": "<p>Shop ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "points",
            "description": "<p>Transaction reward points</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "action",
            "description": "<p>0 - Add, 1 - Redeem points</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "remarks",
            "description": "<p>Remark for the transaction</p>"
          }
        ]
      }
    },
    "name": "CreateRewardTransaction",
    "group": "RewardTransaction",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n\t\"shopId\": \"5ad58a7f78d2130704b3ce05\",\n\t\"userId\": \"5ad5908836e28a2500ab6bff\",\n\t\"remarks\": \"You deserve this\",\n\t\"points\": 5,\n  \"action\": 0\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   {\n     \"code\": \"SUCCESS\",\n     \"attribute\": \"\",\n     \"data\": {\n     \"rewardTransaction\": {\n         \"updatedAt\": \"2018-08-27 07:16:49\",\n         \"createdAt\": \"2018-08-27 07:16:49\",\n         \"rewardId\": \"5b7bc08b312ac30b3c9cdd7b\",\n         \"shopId\": \"5b7bb7d736492f20bc6f0894\",\n         \"remarks\": \"Reward for your loyality\",\n         \"points\": 1,\n         \"action\": 0,\n         \"createdBy\": {\n             \"firstName\": \"shop-owner\",\n             \"lastName\": \"layansan\"\n         },\n         \"updatedBy\": null,\n         \"id\": \"5b83a561481bc93b10a6d349\",\n         \"user\": {\n             \"id\": \"5b7bb55d0491aecd3cb426ab\",\n             \"firstName\": \"car-owner\",\n             \"lastName\": \"layansan\",\n             \"company\": \"keeneye\"\n             }\n         }\n     },\n \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/reward-transaction.js",
    "groupTitle": "RewardTransaction"
  },
  {
    "type": "get",
    "url": "http://<base-url>/reward-transaction/list?shopId={shopId}&userId={userId}",
    "title": "List Reward Transactions",
    "description": "<p>Retrieve Reward Transaction List.</p> <ul> <li> <p>Refer &quot;RewardTransaction Object&quot; for necessary parameters. Following example illustrates the valid parameters for Reward Transaction list. Rest of the parameters described in &quot;RewardTransaction Object&quot; are used for viewing and some other requests.</p> </li> <li> <p>Response - &quot;Common Response&quot; containig the shop objects. Possible response codes are <br/> PERMISSION_DENIED <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE</p> </li> <li> <p>Authorization token required in header.</p> </li> </ul>",
    "name": "ListRewardTransaction",
    "group": "RewardTransaction",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "shopId",
            "description": "<p>Shop id (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User id (required).</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"rewardTransactions\": {\n            \"total\": 2,\n            \"data\": [\n                {\n                    \"updatedAt\": \"2018-06-05 06:06:46\",\n                    \"createdAt\": \"2018-06-05 06:06:46\",\n                    \"rewardId\": \"5ad58a7f78d2130704b3ce05\",\n                    \"remarks\": \"Points added\",\n                    \"points\": 2,\n                    \"action\": 0,\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"id\": \"5b162876f96bc2069c5b8c18\",\n                    \"user\": {\n                        \"id\": \"5b7bb55d0491aecd3cb426ab\",\n                        \"firstName\": \"layansan\",\n                        \"lastName\": \"rajendram\",\n                        \"company\": \"keeneye\"\n                    }\n                },\n                {\n                    \"updatedAt\": \"2018-06-05 06:06:46\",\n                    \"createdAt\": \"2018-06-05 06:06:46\",\n                    \"rewardId\": \"5ad58a7f78d2130704b3ce05\",\n                    \"remarks\": \"Points redeemed\",\n                    \"points\": 2,\n                    \"action\": 1,\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"id\": \"5b162876f96bc2069c5b8c19\"\n                    \"user\": {\n                        \"id\": \"5b7bb55d0491aecd3cb426ab\",\n                        \"firstName\": \"layansan\",\n                        \"lastName\": \"rajendram\",\n                        \"company\": \"keeneye\"\n                    }\n                },\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/reward-transaction/list?shopId=5a6f035a318ff528089bb857&userId=5a8c0af12c12042d143f359a",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/reward-transaction.js",
    "groupTitle": "RewardTransaction"
  },
  {
    "type": "post",
    "url": "http://<base-url>/role",
    "title": "Create Role",
    "description": "<p>Add new role</p> <ul> <li>Refer &quot;Role Object&quot; for necessary parameters. Following example illustrates the valid parameters for role create. Rest of the parameters described in &quot;Role Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot; with role id</li> <li>Authorization token required in header.</li> </ul>",
    "name": "Create",
    "group": "Role",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"name\":\"staf\",\n  \"description\":\"Staff Role\",\n  \"permissions\":[\"5a4233af66b74f082c948566\", \"5a4233da66b74f082c948568\"]\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/role.js",
    "groupTitle": "Role"
  },
  {
    "type": "delete",
    "url": "http://<base-url>/role/:id",
    "title": "Delete Role",
    "description": "<p>Delete existing role. Roles those are assigned to any user cannot be deleted.</p> <ul> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> </ul>",
    "name": "DeleteRole",
    "group": "Role",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Role id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/role/5a3a4e096f6cd628e4d922a8",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/role.js",
    "groupTitle": "Role"
  },
  {
    "type": "get",
    "url": "http://<base-url>/role/:id",
    "title": "Get Role",
    "description": "<p>Retrieve existing role details.</p> <ul> <li>Response - &quot;Common Response&quot; containig the role object</li> <li>Authorization token required in header.</li> </ul>",
    "name": "GetRole",
    "group": "Role",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Role id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": {\n        \"role\": {\n            \"name\": \"admin\",\n            \"description\": \"Administrator Role\",\n            \"updatedAt\": \"2017-12-29 10:49:56\",\n            \"createdAt\": \"2017-12-29 05:57:20\",\n            \"permissions\": [\n                {\n                    \"id\": \"5a4233af66b74f082c948566\",\n                    \"name\": \"Permission.Update\"\n                },\n                {\n                    \"id\": \"5a4233da66b74f082c948568\",\n                    \"name\": \"Permission.1e11q\"\n                }\n            ],\n            \"createdBy\": {\n                \"firstName\": \"Aruna\",\n                \"lastName\": \"Attanayake\"\n            },\n            \"updatedBy\": {\n                \"firstName\": \"Aruna\",\n                \"lastName\": \"Attanayake\"\n            },\n            \"id\": \"5a45d940aaa7600ae4599ce7\"\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/role/5a4233af66b74f082c948566",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/role.js",
    "groupTitle": "Role"
  },
  {
    "type": "get",
    "url": "http://<base-url>/role/list",
    "title": "List roles",
    "description": "<p>Retrieve list of roles.</p> <ul> <li>Response - &quot;Common Response&quot; containig the role objects</li> <li>Authorization token required in header.</li> </ul>",
    "name": "ListRoles",
    "group": "Role",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"roles\": {\n            \"total\": 2,\n            \"data\": [\n                {\n                    \"name\": \"admin\",\n                    \"description\": \"Administrator Role\",\n                    \"updatedAt\": \"2017-12-29 10:50:56\",\n                    \"createdAt\": \"2017-12-29 05:57:20\",\n                    \"permissions\": [\n                        {\n                            \"id\": \"5a4233af66b74f082c948566\",\n                            \"name\": \"Permission.Update\"\n                        }\n                    ],\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"updatedBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"id\": \"5a45d940aaa7600ae4599ce7\"\n                },\n                {\n                    \"name\": \"staf\",\n                    \"description\": \"Staff Role\",\n                    \"updatedAt\": null,\n                    \"createdAt\": \"2017-12-29 10:41:20\",\n                    \"permissions\": [\n                        {\n                            \"id\": \"5a4233af66b74f082c948566\",\n                            \"name\": \"Permission.Update\"\n                        },\n                        {\n                            \"id\": \"5a4233da66b74f082c948568\",\n                            \"name\": \"Permission.1e11q\"\n                        }\n                    ],\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"updatedBy\": null,\n                    \"id\": \"5a461bd004721910e49332dc\"\n                }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/role/list",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/role.js",
    "groupTitle": "Role"
  },
  {
    "type": "put",
    "url": "http://<base-url>/role/<id>",
    "title": "Update Role",
    "description": "<p>Update existing role details.</p> <ul> <li>Refer &quot;Role Object&quot; for necessary parameters. Following example illustrates the valid parameters for role update. Rest of the parameters described in &quot;Role Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> </ul>",
    "name": "Update",
    "group": "Role",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"name\":\"staf\",\n  \"description\":\"Staff Role\",\n  \"permissions\":[\"5a4233af66b74f082c948566\", \"5a4233da66b74f082c948568\"]\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/role.js",
    "groupTitle": "Role"
  },
  {
    "type": "post",
    "url": "http://<base-url>/shop",
    "title": "Create Shop",
    "description": "<p>Add new shop</p> <ul> <li>Authorization token required in header.</li> <li>logoName, bannerName has to be fileName returned from S3 upload</li> <li>Refer &quot;Shop Object&quot; for necessary parameters. Following example illustrates the valid parameters for shop create. Rest of the parameters described in &quot;Shop Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot; with shop id. Possible response codes are, <br/> PERMISSION_DENIED <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE <br/> INVALID_EMAIL <br/> INVALID_FAX <br/> INVALID_PHONE <br/> INVALID_DATA_TYPE</li> </ul>",
    "name": "Create",
    "group": "Shop",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"brandName\":\"Magcity\",\n  \"businessName\":\"Magcity\",\n  \"registrationNumber\":\"123\",\n  \"streetName\": \"James Peris Mawatha\",\n  \"city\": \"Colombo\",\n  \"state\": \"Western\",\n  \"zip\": \"8080\",\n  \"phoneNumber\": \"+94773959689\",\n  \"alternatePhoneNumber\": \"+94773959690\",\n  \"faxNumber\": \"+94773959689\",\n  \"email\": \"magcity@gmail.com\",\n  \"alternateEmail\": \"magcityb@gmail.com\",\n  \"gmail\": \"magcity@gmail.com\",\n  \"googlePlusUrl\": \"http://google.com\",\n  \"facebookPageUrl\": \"http://google.com\",\n  \"twitterPageUrl\": \"http://google.com\",\n  \"instagramPageUrl\": \"http://google.com\",\n  \"logoName\": \"JD5HW8N2PA8WQ.jpg\",\n  \"bannerName\": \"JD5HW8N2PA8WR.jpg\",\n  \"shopOwner\": \"5a6ac1fd289fe72aac248476\",\n  \"businessDays\": [2,3,4,5,6],\n  \"businessHours\": {\n      \"openTime\": 0900,\n      \"closeTime\": 1800\n  },\n  \"shopManager\": {\n      \"name\": \"John Mathews\",\n      \"phone\": \"+94777777777\",\n      \"email\": \"jmathews@sf.com\"\n  },\n  \"description\": \"some text description\",\n  \"geoLocation\": \"6.96,79.88441728588873\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "delete",
    "url": "http://<base-url>/shop/:id",
    "title": "Delete Shop",
    "description": "<p>Delete existing shop.</p> <ul> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> </ul>",
    "name": "DeleteShop",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Shop id.</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "force",
            "description": "<p>set to 1 or 'true' to force delete the shop and its dependencies</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/shop/5a3a4e096f6cd628e4d922a8",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "get",
    "url": "http://<base-url>/shop/:id",
    "title": "Get Shop",
    "description": "<p>Retrieve existing shop details.</p> <ul> <li>Response - &quot;Common Response&quot; containig the shop object</li> <li>Authorization token required in header.</li> </ul> <p>Possible response codes are, <br/> PERMISSION_DENIED <br/> SUCCESS <br/> RECORD_NOT_FOUND</p>",
    "name": "GetShop",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Shop id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": {\n        \"shop\": {\n            \"brandName\": \"Magcity\",\n            \"businessName\": \"Magcity\",\n            \"registrationNumber\": \"123\",\n            \"streetName\": \"James Peris Mawatha\",\n            \"city\": \"Colombo\",\n            \"state\": \"Western\",\n            \"zip\": 8080,\n            \"phoneNumber\": \"+94773959689\",\n            \"alternatePhoneNumber\": \"+94773959690\",\n            \"faxNumber\": \"+94773959689\",\n            \"email\": \"magcity@gmail.com\",\n            \"alternateEmail\": \"magcityb@gmail.com\",\n            \"gmail\": \"magcity@gmail.com\",\n            \"googlePlusUrl\": \"http://google.com\",\n            \"facebookPageUrl\": \"http://google.com\",\n            \"twitterPageUrl\": \"http://google.com\",\n            \"instagramPageUrl\": \"http://google.com\",\n            \"logoName\": \"logo.jpg\",\n            \"bannerImage\": \"banner.jpg\",\n            \"updatedAt\": null,\n            \"createdAt\": \"2018-01-22 09:46:13\",\n            \"shopOwner\": 5a6ac1fd289fe72aac248476,\n            \"logo\": \"shop-flow-dev.s3.amazonaws.com/JD46TY0ETOYMB.jpg\",\n            \"banner\": \"shop-flow-dev.s3.amazonaws.com/JD46TZAJY20K6.jpg\",\n            \"createdBy\": {\n                \"firstName\": \"Super\",\n                \"lastName\": \"Administrator\"\n            },\n            \"shopManager\": {\n                \"name\": \"John Mathews\",\n                \"phone\": \"+94777777777\",\n                \"email\": \"jmathews@sf.com\"\n            },\n            \"businessHours\": {\n                \"openTime\": \"0900\",\n                \"closeTime\": \"1700\"\n            },\n            \"businessDays\": [\n                 2,\n                 3,\n                 4,\n                 5,\n                 6\n            ],\n            \"description\": \"Some text here\",\n            \"updatedBy\": null,\n            \"id\": \"5a65b2e55d105a0e208935a0\",\n            \"subscriptionStatus\": -1,\n            \"geoLocation\": \"6.96,79.88441728588873\",\n            \"rewardStatus\": 1\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/shop/5a65b2e55d105a0e208935a0",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "get",
    "url": "http://<base-url>/shop/:id/car-owners",
    "title": "Get Shop's CarOwners",
    "description": "<p>Retrieve subscribed carowners</p> <ul> <li>Authorization token required in header.</li> <li>Response - &quot;Common Response&quot; containig the list of User informations. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>RECORD_NOT_FOUND <br/>PERMISSION_DENIED</li> </ul>",
    "name": "GetShopUsers",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Shop id.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "status",
            "description": "<p>Subscription status as query param. <br/>PENDING = 0, <br/>APPROVED = 1, <br/>REJECTED = 2, <br/>UNSUBSCRIBED = 3</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"shops\": {\n            \"total\": 1,\n            \"data\": [\n                {\n                    \"firstName\": \"Nalaka\",\n                    \"userType\": 2,\n                    \"email\": \"nalaka@gmail.com\",\n                    \"accessToken\": null,\n                    \"updatedAt\": null,\n                    \"createdAt\": \"2017-12-24 00:51:11\",\n                    \"lastAccess\": null,\n                    \"gender\": 1,\n                    \"mobile\": \"773959693\",\n                    \"status\": 1,\n                    \"role\": {\n                          \"id\": \"5a65a205858467622d026eb8\",\n                          \"name\": \"CarOwner\"\n                    },\n                    \"timezone\": \"Asia/Colombo\",\n                    \"lastName\": \"Hirimuthugoda\",\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"updatedBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"id\": \"5a3ef9ffa2649a1720d6abfc\",\n                    \"sysEmail\": null\n                }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/user/5a3a4e096f6cd628e4d922a8/shops?status=1",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "http://<base-url>/shop-invite",
    "title": "Invite User using Email address",
    "description": "<p>Invite user to a shop User will get an email with invitation to join the shop</p> <ul> <li> <p>Authorization token required in header.</p> </li> <li> <p>Response - &quot;Common Response&quot;. Possible response codes are, <br/> PERMISSION_DENIED <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE <br/> RECORD_NOT_FOUND <br/> ALREADY_SUBSCRIBED</p> </li> </ul>",
    "name": "Invite_User",
    "group": "ShopInvite",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"shopId\": \"5a794842876dfb2e8c1d714a\"\n  \"email\": \"user@yourmail.com\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/shop-invite.js",
    "groupTitle": "ShopInvite"
  },
  {
    "type": "post",
    "url": "http://<base-url>/shop-invite/:code/subscribe",
    "title": "Subscribe to Shop",
    "description": "<p>Subscribe registered user to a shop using invite code</p> <ul> <li> <p>Authorization token required in header.</p> </li> <li> <p>Response - &quot;Common Response&quot;. Possible response codes are, <br/> INVALID_INVITE_CODE <br/> SUCCESS <br/> PERMISSION_DENIED <br/> FAIL <br/> RECORD_NOT_FOUND <br/> ALREADY_SUBSCRIBED</p> </li> </ul>",
    "name": "Subscribe_to_Shop",
    "group": "ShopInvite",
    "examples": [
      {
        "title": "Example Request:",
        "content": "shop-invite/5a7bda08b631441be0ae5b34/subscribe",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/shop-invite.js",
    "groupTitle": "ShopInvite"
  },
  {
    "type": "post",
    "url": "http://<base-url>/shop-invite/:code/verify",
    "title": "Verify Invitation",
    "description": "<p>Verify shop invite code</p> <ul> <li> <p>Authorization token not required.</p> </li> <li> <p>Response - &quot;Common Response&quot; with invitation detail. Possible response codes are, <br/> INVALID_INVITE_CODE <br/> SUCCESS</p> </li> </ul>",
    "name": "Verify_Invitation",
    "group": "ShopInvite",
    "examples": [
      {
        "title": "Example Request:",
        "content": "shop-invite/5a7bda08b631441be0ae5b34/verify",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": {\n        \"invitation\": {\n            \"email\": \"layansan@keeneye.solutions\",\n            \"shop\": \"5a794842876dfb2e8c1d714a\",\n            \"registered\": true,\n            \"subscribed\": true\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/shop-invite.js",
    "groupTitle": "ShopInvite"
  },
  {
    "type": "get",
    "url": "http://<base-url>/shop/list",
    "title": "List shops",
    "description": "<p>Retrieve list of shops.</p> <ul> <li>Response - &quot;Common Response&quot; containig the shop objects</li> <li>Authorization token required in header.</li> </ul> <p>Possible response codes are <br/> PERMISSION_DENIED <br/> SUCCESS <br/> FAIL</p>",
    "name": "ListShops",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "brandName",
            "description": "<p>filter shops using brandName</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "businessName",
            "description": "<p>filter shops using businessName</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "registrationNumber",
            "description": "<p>filter shops using registrationNumber</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>filter shops using email</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": true,
            "field": "shopOwner",
            "description": "<p>filter shops using shopOwner</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": true,
            "field": "managedBy",
            "description": "<p>filter shops managed by area manager</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"shops\": {\n            \"total\": 3,\n            \"data\": [\n                {\n                    \"brandName\": \"Magcity\",\n                    \"businessName\": \"Magcity\",\n                    \"registrationNumber\": \"123\",\n                    \"streetName\": \"James Peris Mawatha\",\n                    \"city\": \"Colombo\",\n                    \"state\": \"Western\",\n                    \"zip\": 8080,\n                    \"phoneNumber\": \"+94773959689\",\n                    \"alternatePhoneNumber\": \"+94773959690\",\n                    \"faxNumber\": \"+94773959689\",\n                    \"email\": \"magcity@gmail.com\",\n                    \"alternateEmail\": \"magcityb@gmail.com\",\n                    \"gmail\": \"magcity@gmail.com\",\n                    \"googlePlusUrl\": \"http://google.com\",\n                    \"facebookPageUrl\": \"http://google.com\",\n                    \"twitterPageUrl\": \"http://google.com\",\n                    \"instagramPageUrl\": \"http://google.com\",\n                    \"logoName\": \"logo.jpg\",\n                    \"bannerImage\": \"banner.jpg\",\n                    \"updatedAt\": null,\n                    \"createdAt\": \"2018-01-22 09:46:13\",\n                    \"shopOwner\": 5a6ac1fd289fe72aac248476,\n                    \"logo\": \"shop-flow-dev.s3.amazonaws.com/JD46TY0ETOYMB.jpg\",\n                    \"banner\": \"shop-flow-dev.s3.amazonaws.com/JD46TZAJY20K6.jpg\",\n                    \"createdBy\": {\n                        \"firstName\": \"Super\",\n                        \"lastName\": \"Administrator\"\n                    }\n                    \"shopManager\": {\n                        \"name\": \"John Mathews\",\n                        \"phone\": \"+94777777777\",\n                        \"email\": \"jmathews@sf.com\"\n                    },\n                    \"businessHours\": {\n                        \"openTime\": \"0900\",\n                        \"closeTime\": \"1700\"\n                    },\n                    \"businessDays\": [\n                        2,\n                        3,\n                        4,\n                        5,\n                        6\n                    ],\n                    \"description\": \"Some text here\",\n                    \"updatedBy\": null,\n                    \"id\": \"5a65b2e55d105a0e208935a0\",\n                    \"subscriptionStatus\": -1,\n                    \"geoLocation\": \"6.96,79.88441728588873\",\n                    \"rewardStatus\" 1\n                }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/shop/list",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "put",
    "url": "http://<base-url>/shop/<id>",
    "title": "Update Shop",
    "description": "<p>Update existing shop details.</p> <ul> <li> <p>Refer &quot;Shop Object&quot; for necessary parameters. Following example illustrates the valid parameters for shop update. Rest of the parameters described in &quot;Shop Object&quot; are used for viewing and some other requests.</p> </li> <li> <p>Response - &quot;Common Response&quot;. Possible response codes are, <br/> PERMISSION_DENIED <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE <br/> INVALID_EMAIL <br/> INVALID_FAX <br/> INVALID_PHONE <br/> INVALID_USER_ID <br/> INVALID_DATA_TYPE</p> </li> <li> <p>Authorization token required in header.</p> </li> <li> <p>logoName, bannerName has to be fileName returned from S3 upload</p> </li> </ul>",
    "name": "Update",
    "group": "Shop",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"brandName\":\"Magcity\",\n  \"businessName\":\"Magcity\",\n  \"registrationNumber\":\"123\",\n  \"streetName\": \"James Peris Mawatha\",\n  \"city\": \"Colombo\",\n  \"state\": \"Western\",\n  \"zip\": \"8080\",\n  \"phoneNumber\": \"+94773959689\",\n  \"alternatePhoneNumber\": \"+94773959690\",\n  \"faxNumber\": \"+94773959689\",\n  \"email\": \"magcity@gmail.com\",\n  \"alternateEmail\": \"magcityb@gmail.com\",\n  \"gmail\": \"magcity@gmail.com\",\n  \"googlePlusUrl\": \"http://google.com\",\n  \"facebookPageUrl\": \"http://google.com\",\n  \"twitterPageUrl\": \"http://google.com\",\n  \"instagramPageUrl\": \"http://google.com\",\n  \"logoName\": \"JD5HW8N2PA8WQ.jpg\",\n  \"bannerName\": \"JD5HW8N2PA8WR.jpg\",\n  \"shopOwner\": \"5a6ac1fd289fe72aac248476\"\n  \"businessDays\": [2,3,4,5,6],\n  \"businessHours\": {\n      \"openTime\": 0900,\n      \"closeTime\": 1800\n  },\n  \"shopManager\": {\n      \"name\": \"John Mathews\",\n      \"phone\": \"+94777777777\",\n      \"email\": \"jmathews@sf.com\"\n  },\n  \"description\": \"some text description\",\n  \"geoLocation\": \"6.96,79.88441728588873\",\n  \"rewardStatus\": 1\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "http://<base-url>/user/authenticate",
    "title": "Authenticate User",
    "description": "<p>Authenticate user.</p> <ul> <li>Upon successfull authentication it will return accessToken.</li> <li>Response - &quot;Common Response&quot; along with user object. Possible error codes are, <br/>SUCCESS <br/>FAIL <br/>INVALID_USERNAME_PASSWORD <br/>INACTIVE_USER <br/>EMAIL_NOT_VERIFIED</li> </ul>",
    "name": "AuthenticateUser",
    "group": "User",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"userType\": 1,\n  \"email\":\"super@gmail.com\",\n  \"password\":\"tes.123\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": {\n        \"user\": {\n            \"firstName\": \"Super\",\n            \"userType\": 1,\n            \"sysEmail\": \"super@gmail.com\",\n            \"isEmailVerified\": 0,\n            \"accessToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTVlMTJmODUzNjBiNDIwMTE1NThkNWEiLCJzeXNFbWFpbCI6InN1cGVyQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IlN1cGVyIiwiaWF0IjoxNTE2Mjg4MzAwfQ.AkqjMjRFhXOUB5rwKcsYd0xOGH8G4XN6R7nQu6BGciA\",\n            \"updatedAt\": null,\n            \"createdAt\": \"2018-01-18 15:11:40\",\n            \"lastAccess\": null,\n            \"gender\": 1,\n            \"mobile\": \"773959699\",\n            \"homePhone\": \"112925647\",\n            \"status\": 1,\n            \"timezone\": \"Asia/Colombo\",\n            \"lastName\": \"Administrator\",\n            \"createdBy\": null,\n            \"updatedBy\": null,\n            \"id\": \"5a5e12f85360b42011558d5a\",\n            \"roleId\": \"5a56feb31605fa1ab8677e15\",\n            \"role\": {\n                \"id\": \"5a56feb31605fa1ab8677e15\",\n                \"name\": \"Superadmin\",\n                \"permissions\": [\n                    {\n                        \"id\": \"5a56fe9a1605fa1ab8677e14\",\n                        \"name\": \"Permission.Create\"\n                    }\n                ]\n            },\n            \"email\": null\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "http://<base-url>/user/autcomplete/:name?userType",
    "title": "Autocomplete Users",
    "description": "<p>Search for user by name (firstName/lastName) returns 5 most matching results</p> <ul> <li>Authorization token required in header.</li> <li>Response - &quot;Common Response&quot; containig the partial user information. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>PERMISSION_DENIED <br/>SUBCEED_CHARACTER_LENGTH</li> </ul>",
    "name": "AutocompleteUsers",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>User name should be 3 or more characters.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "createdBy",
            "description": "<p>Filter using createdBy userId.</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": true,
            "field": "userType",
            "description": "<p>User type for filtering</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"users\": [\n          {\n              \"fullName\": \"AABCC XXY\",\n              \"email\": \"mail@user.com\",\n              \"id\": \"5a7435f05496072bb41d5100\"\n          },\n          {\n              \"fullName\": \"AABED XXY\",\n              \"email\": \"mail@user.com\",\n              \"id\": \"5a7435f05496072bb41d5100\"\n          }\n      ]\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/user/autcomplete/abc",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "http://<base-url>/user/change-password",
    "title": "Change Password",
    "description": "<p>Change password.</p> <ul> <li>Response - &quot;Common Response&quot;. Possible error codes are, <br/>SUCCESS <br/>FAIL <br/>MISSING_MANDATORY_ATTRIBUTE <br/>INVALID_OLD_PASSWORD</li> </ul>",
    "name": "ChangePassword",
    "group": "User",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"oldPassword\":\"tes.123\",\n  \"newPassword\":\"test.123\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "http://<base-url>/user",
    "title": "Create System User",
    "description": "<p>Use this end point to create new system user. <br/> This requires user.create-user permission</p> <ul> <li>Refer &quot;User Object Details&quot; for necessary parameters. Following example illustrates the valid parameters for user create. Rest of the parameters described in &quot;User Object Details&quot; are used for viewing and some other requests.</li> <li>Once record created it will send an verification email to the given email address.</li> <li>Response - &quot;Common Response&quot; with user id. Possible status codes are <br/>SUCCESS <br/>FAIL <br/>MISSING_MANDATORY_ATTRIBUTE <br/>DUPLICATE_RECORD <br/>EXCEED_CHARACTER_LENGTH <br/>INVALID_MOBILE <br/>INVALID_EMAIL</li> </ul>",
    "name": "CreateSystemUser",
    "group": "User",
    "examples": [
      {
        "title": "Example Request: System user",
        "content": "{\n  \"firstName\":\"Yohan\",\n  \"lastName\":\"Nalaka\",\n  \"sysEmail\":\"yohan@gmail.com\",\n  \"password\":\"tes.123\",\n  \"roleId\":\"5a5e12f85360b42011558d5a\",\n  \"mobile\":\"773959699\",\n  \"gender\":1,\n  \"timezone\":\"Asia/Colombo\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/user.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "http://<base-url>/user/:id",
    "title": "Delete User",
    "description": "<p>Delete existing user.</p> <ul> <li>Authorization token required in header.</li> <li>Response - &quot;Common Response&quot;. Possible response codes are, <br/>SUCCESS <br/>FAIL</li> </ul>",
    "name": "DeleteUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>User id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/user/5a3a4e096f6cd628e4d922a8",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "http://<base-url>/user/forgot-password",
    "title": "Forgot Password",
    "description": "<p>Endpoint to request for password reset.</p> <ul> <li>Link to reset the password would be sent to user's registered email address</li> <li>Response - &quot;Common Response&quot;</li> </ul>",
    "name": "ForgotPassword",
    "group": "User",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"email\": \"aruna470@gmail.com\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "http://<base-url>/generate-sync-tool-user-keys",
    "title": "Generate Sync Tool User Keys",
    "description": "<p>Generate API access keys for sync tool</p> <ul> <li>Authorization token required in header.</li> <li>Response - &quot;Common Response&quot;. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>PERMISSION_DENIED <br/>MISSING_MANDATORY_ATTRIBUTE</li> </ul>",
    "name": "GenerateSyncToolUserKeys",
    "group": "User",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n   \"shopId\": \"5ab332eecf49dc058c98cc7c\"\n}",
        "type": "json"
      },
      {
        "title": "Example Request:",
        "content": "/user/generate-sync-tool-user-keys?shopId=5a6ad448c80f921fc47c89ec",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"apiKey\": \"1o8w7fwjenzajew@sf.com\",\n        \"apiSecret\": \"1o8w7fwjenzajes\"\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "http://<base-url>/user/:id",
    "title": "Get User",
    "description": "<p>Retrieve existing user details.</p> <ul> <li>Authorization token required in header.</li> <li>Response - &quot;Common Response&quot; containig the user object. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>RECORD_NOT_FOUND</li> </ul>",
    "name": "GetUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>User id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": {\n        \"user\": {\n            \"firstName\": \"Viranga\",\n            \"userType\": 1,\n            \"sysEmail\": \"nalaka@gmail.com\",\n            \"isEmailVerified\": 0,\n            \"accessToken\": null,\n            \"updatedAt\": null,\n            \"createdAt\": \"2017-12-20 11:48:25\",\n            \"lastAccess\": null,\n            \"gender\": 1,\n            \"mobile\": \"773959693\",\n            \"status\": 1,\n            \"roleId\": \"5a56feb31605fa1ab8677e15\",\n            \"timezone\": \"Asia/Colombo\",\n            \"lastName\": \"Hirimuthugoda\",\n            \"createdBy\": null,\n            \"updatedBy\": null,\n            \"id\": \"5a3a4e096f6cd628e4d922a8\",\n            \"email\": null,\n            \"shopId\": \"5a6ad448c80f921fc47c89ec\",\n            \"isM1SyncedUser\": 0,\n            \"homePhone\": \"112925647\"\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/user/5a3a4e096f6cd628e4d922a8",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "http://<base-url>/user/:id/shops",
    "title": "Get User's Shops",
    "description": "<p>Retrieve user subscribed shops</p> <ul> <li>Authorization token required in header.</li> <li>Response - &quot;Common Response&quot; containig the list of Shop informations. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>RECORD_NOT_FOUND <br/>PERMISSION_DENIED</li> </ul>",
    "name": "GetUserShops",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>User id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": true,
            "field": "subscriptionStatus",
            "description": "<p>Subscription status as query param. <br/> Ex: ?subscriptionStatus=0,1 <br/>PENDING = 0, <br/>APPROVED = 1, <br/>REJECTED = 2, <br/>UNSUBSCRIBED = 3</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"shops\": {\n            \"total\": 1,\n            \"data\": [\n                {\n                    \"brandName\": \"Magcity\",\n                    \"businessName\": \"Magcity\",\n                    \"registrationNumber\": \"123\",\n                    \"streetName\": \"James Peris Mawatha\",\n                    \"city\": \"Colombo\",\n                    \"state\": \"Western\",\n                    \"zip\": 8080,\n                    \"phoneNumber\": \"+94773959689\",\n                    \"homePhone\": \"112925647\",\n                    \"faxNumber\": \"+94773959689\",\n                    \"email\": \"magcity@gmail.com\",\n                    \"gmail\": \"magcity@gmail.com\",\n                    \"googlePlusUrl\": \"http://google.com\",\n                    \"facebookPageUrl\": \"http://google.com\",\n                    \"twitterPageUrl\": \"http://google.com\",\n                    \"instagramPageUrl\": \"http://google.com\",\n                    \"logoName\": \"logo.jpg\",\n                    \"bannerImage\": \"banner.jpg\",\n                    \"logo\": \"shop-flow-dev.s3.amazonaws.com/JD46TY0ETOYMB.jpg\",\n                    \"banner\": \"shop-flow-dev.s3.amazonaws.com/JD46TZAJY20K6.jpg\",\n                    \"id\": \"5a65b2e55d105a0e208935a0\",\n                    \"subscriptionStatus\": 1\n                }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/user/5a3a4e096f6cd628e4d922a8/shops?status=1",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "http://<base-url>/user/list",
    "title": "List users",
    "description": "<p>Retrieve list of users by various filters.</p> <ul> <li>Authorization token required in header.</li> <li>Response - &quot;Common Response&quot; containig the user objects. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>RECORD_NOT_FOUND</li> </ul>",
    "name": "ListUsers",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "firstName",
            "description": "<p>First name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "email",
            "description": "<p>Normal user email.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "createdBy",
            "description": "<p>Filter using createdBy userId.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sysEmail",
            "description": "<p>System user email.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "status",
            "description": "<p>User status.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "pageNo",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "limit",
            "description": "<p>Records per page.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting field. Prepend &quot;-&quot; for decending, otherwise ascending. Possible sort fields are - sysEmail, email, firstName, lastName, createdAt, updatedAt</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"users\": {\n            \"total\": 3,\n            \"data\": [\n                {\n                    \"firstName\": \"Nalaka\",\n                    \"userType\": 2,\n                    \"email\": \"nalaka@gmail.com\",\n                    \"accessToken\": null,\n                    \"updatedAt\": null,\n                    \"createdAt\": \"2017-12-24 00:51:11\",\n                    \"lastAccess\": null,\n                    \"gender\": 1,\n                    \"mobile\": \"773959693\",\n                    \"status\": 1,\n                    \"roleName\": \"admin\",\n                    \"timezone\": \"Asia/Colombo\",\n                    \"lastName\": \"Hirimuthugoda\",\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"updatedBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"id\": \"5a3ef9ffa2649a1720d6abfc\",\n                    \"sysEmail\": null,\n                    \"shopId\": \"5a6ad448c80f921fc47c89ec\",\n                    \"isM1SyncedUser\": 0,\n                    \"homePhone\": \"112925647\"\n                },\n                {\n                    \"firstName\": \"Viranga\",\n                    \"userType\": 1,\n                    \"sysEmail\": \"aruna470@gmail.com\",\n                    \"accessToken\": null,\n                    \"updatedAt\": null,\n                    \"createdAt\": \"2017-12-20 11:48:25\",\n                    \"lastAccess\": null,\n                    \"gender\": 1,\n                    \"mobile\": \"773959693\",\n                    \"status\": 1,\n                    \"roleName\": \"admin\",\n                    \"timezone\": \"Asia/Colombo\",\n                    \"lastName\": \"Kekulawala\",\n                    \"createdBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"updatedBy\": {\n                        \"firstName\": \"Aruna\",\n                        \"lastName\": \"Attanayake\"\n                    },\n                    \"id\": \"5a3a4e096f6cd628e4d922a8\",\n                    \"email\": null,\n                    \"shopId\": \"5a6ad448c80f921fc47c89ec\",\n                    \"isM1SyncedUser\": 0,\n                    \"homePhone\": \"112925647\"\n                }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/user/list?pageNo=1&limit=3&sort=-createdAt",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "http://<base-url>/user/resend-verification-code",
    "title": "Resend Verification Code",
    "description": "<p>Endpoint to request for verification code to be resend</p> <ul> <li>Email verification code would be sent to user's registered email address</li> <li>Response - &quot;Common Response&quot;. Possible response codes are, <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE <br/> RECORD_NOT_FOUND</li> </ul>",
    "name": "ResendVerificationCode",
    "group": "User",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"email\": \"aruna470@gmail.com\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "http://<base-url>/user/reset-password",
    "title": "Reset Password",
    "description": "<p>Endpoint to change account password using reset token.</p> <ul> <li>Password reset confirmation email would be sent user's registered email address.</li> <li>Response - &quot;Common Response&quot;. Possible response codes are, <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE <br/> RECORD_NOT_FOUND</li> </ul>",
    "name": "ResetPassword",
    "group": "User",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"password\": \"tes.123\",\n  \"email\": \"aruna470@gmail.com\",\n  \"token\": 123456\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "http://<base-url>/user/sync-m1-users",
    "title": "Sync M1 Users",
    "description": "<p>Sync M1 Users. Sync Tool uses this end point</p> <ul> <li>Authorization token required in header.</li> <li>Response - &quot;Common Response&quot;. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>PERMISSION_DENIED <br/>SOME_RECORDS_SYNCED</li> </ul>",
    "name": "SyncM1Users",
    "group": "User",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n\t\"users\": [\n\t\t{\n\t\t\t\"firstName\":\"Nimal\",\n\t\t\t\"lastName\":\"Guruge\",\n\t\t\t\"email\":\"nimal@gmail.com\"\n\t\t}\n\t]\n}",
        "type": "json"
      },
      {
        "title": "Example Request:",
        "content": "/user/sync-m1-users",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"users\": [\n            \"5ab332eecf49dc058c98cc7c\"\n        ]\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "http://<base-url>/user/<id>",
    "title": "Update User",
    "description": "<p>Update existing user details.</p> <ul> <li> <p>Refer &quot;User Object Details&quot; for necessary parameters. Following example illustrates the valid parameters for user update. Rest of the parameters described in &quot;User Object Details&quot; are used for viewing and some other requests.</p> </li> <li> <p>email, sysEmail and password cannot be updated via this endpoint..</p> </li> <li> <p>Response - &quot;Common Response&quot;. Possible response codes are <br/>SUCCESS <br/>FAIL <br/>MISSING_MANDATORY_ATTRIBUTE <br/>DUPLICATE_RECORD <br/>EXCEED_CHARACTER_LENGTH <br/>INVALID_MOBILE</p> </li> <li> <p>Authorization token required in header.</p> </li> </ul>",
    "name": "Update",
    "group": "User",
    "examples": [
      {
        "title": "Example Request: Normal user",
        "content": "{\n  \"firstName\":\"Yohan\",\n  \"lastName\":\"Nalaka\",\n  \"userType\": 2,\n  \"mobile\":\"773959699\",\n  \"gender\":1,\n  \"timezone\":\"Asia/Colombo\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "http://<base-url>/user/signup",
    "title": "User Signup",
    "description": "<p>Sign up new user to the system. Use this end point for car owner registration only</p> <ul> <li>Refer &quot;User Object Details&quot; for necessary parameters. Following example illustrates the valid parameters for user create. Rest of the parameters described in &quot;User Object Details&quot; are used for viewing and some other requests.</li> <li>Once record created it will send an verification email to the given email address.</li> <li>Response - &quot;Common Response&quot; with user id. Possible status codes are <br/>SUCCESS <br/>FAIL <br/>MISSING_MANDATORY_ATTRIBUTE <br/>DUPLICATE_RECORD <br/>EXCEED_CHARACTER_LENGTH <br/>INVALID_MOBILE</li> </ul>",
    "name": "UserSignup",
    "group": "User",
    "examples": [
      {
        "title": "Example Request: Normal user",
        "content": "{\n  \"firstName\":\"Yohan\",\n  \"lastName\":\"Nalaka\",\n  \"email\":\"yohan@gmail.com\",\n  \"password\":\"tes.123\",\n  \"mobile\":\"773959699\",\n  \"gender\":1,\n  \"timezone\":\"Asia/Colombo\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "http://<base-url>/user/verify-email",
    "title": "Verify User Email",
    "description": "<p>Verify email.</p> <ul> <li>Response - &quot;Common Response&quot;.  Possible response codes are, <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE <br/> INVALID_VERIFICATION_CODE <br/> RECORD_NOT_FOUND</li> </ul>",
    "name": "VerifyEmail",
    "group": "User",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"email\":\"you@yourmail.com\"\n  \"code\":\"123456\" // Code received via verify email.\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "http://<base-url>/user/verify-reset",
    "title": "Verify Password Reset Token",
    "description": "<p>Verify password reset token exists and not expired.</p> <ul> <li>Response - &quot;Common Response&quot;. Possible response codes are, <br/> SUCCESS <br/> FAIL <br/> MISSING_MANDATORY_ATTRIBUTE <br/> RECORD_NOT_FOUND</li> </ul>",
    "name": "VerifyReset",
    "group": "User",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"email\": \"aruna470@gmail.com\",\n  \"token\": 123456\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "http://<base-url>/util/s3-get-file/:fileName",
    "title": "Get File from S3",
    "description": "<p>Provides Presigned URL for given file name</p> <ul> <li>Response - &quot;Common Response&quot; along with file unique name and presigned URL. Possible error codes are, <br/>SUCCESS <br/>FAIL <br/>MISSING_MANDATORY_ATTRIBUTE</li> </ul>",
    "name": "GetFromS3",
    "group": "Util",
    "examples": [
      {
        "title": "Success-Response",
        "content": "{\n    \"code\": \"SUCCESS\",\n    \"data\": {\n        \"fileName\": \"JCZS97735BIHW.txt\",\n        \"location\": \"https://shop-flow-dev.s3.amazonaws.com/JCZS97735BIHW.txt?AWSAccessKeyId=AKIAIW7AKD5WV7AWZJRQ&Expires=1517207882&Signature=YCekd47ImnVSXSM9%2BzF0VRKglEM%3D\"\n    }\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/util.js",
    "groupTitle": "Util"
  },
  {
    "type": "get",
    "url": "http://<base-url>/util/get-last-sync-info",
    "title": "Get last sync info",
    "description": "<p>Provides for sync tool to retreive last sync details before start syncing process</p> <ul> <li>Response - &quot;Common Response&quot; along with file unique name and presigned URL. Possible error codes are, <br/>SUCCESS <br/>FAIL</li> </ul>",
    "name": "GetLastSyncInfo",
    "group": "Util",
    "examples": [
      {
        "title": "Success-Response",
        "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"syncInfo\": {\n            \"maxRecommendationId\": 205,\n            \"maxRepairOrderId\": 1651\n        }\n    },\n    \"message\": \"\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/util.js",
    "groupTitle": "Util"
  },
  {
    "type": "post",
    "url": "http://<base-url>/util/s3-upload",
    "title": "Upload File to S3",
    "description": "<p>Enables Authorized user to upload file to S3 bucket</p> <ul> <li> <p>Form-data key for the file should be &quot;fileData&quot;</p> </li> <li> <p>Query param &quot;public&quot; (Optional) if set to &quot;true&quot; object ACL will be public-read, private otherwise</p> </li> <li> <p>Response - &quot;Common Response&quot; along with file unique name and presigned URL. Possible error codes are, <br/>SUCCESS <br/>FAIL <br/>MISSING_MANDATORY_ATTRIBUTE</p> </li> </ul>",
    "name": "UploadToS3",
    "group": "Util",
    "examples": [
      {
        "title": "Example Request: form-data",
        "content": "  \n\"fileData\": <file>,",
        "type": "json"
      },
      {
        "title": "Success-Response",
        "content": "{\n    \"code\": \"SUCCESS\",\n    \"data\": {\n        \"fileName\": \"JCZS97735BIHW.txt\",\n        \"location\": \"https://shop-flow-dev.s3.amazonaws.com/JCZS97735BIHW.txt?AWSAccessKeyId=AKIAIW7AKD5WV7AWZJRQ&Expires=1517207882&Signature=YCekd47ImnVSXSM9%2BzF0VRKglEM%3D\"\n    }\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/util.js",
    "groupTitle": "Util"
  },
  {
    "type": "post",
    "url": "http://<base-url>/vehicle/sync-vehicles",
    "title": "Sync vehicles",
    "description": "<p>This method is given for Sync tool to sync M1 vehicles. It will insert new records and update existing records</p> <ul> <li>Refer &quot;Vehicle Object&quot; for necessary parameters. Following example illustrates the valid parameters for vehicle create/update. Rest of the parameters described in &quot;Vehicle Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> </ul>",
    "name": "Create",
    "group": "Vehicle",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"vehicles\": [\n    {\n      \"make\":\"Toyota1\",\n      \"licenseNumber\":\"CAH-6227\",\n      \"year\":\"2015\",\n      \"name\":\"Toyota Axio 2015\",\n      \"model\":\"Axio\",\n      \"vehicleId\":125,\n      \"custEmail\":\"Dan.Warner@mitchell1.com\",\n      \"mfgDate\": \"1980-01-01 00:00:00\",\n      \"lastInDate\": \"2015-06-15 13:54:40\",\n      \"inspDate\": \"2015-05-31 00:00:00\",\n      \"odometer\": 9958524,\n    }\n  ]\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/vehicle.js",
    "groupTitle": "Vehicle"
  },
  {
    "type": "delete",
    "url": "http://<base-url>/vehicle/:id",
    "title": "Delete Vehicle",
    "description": "<p>Delete existing vehicle.</p> <ul> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> </ul>",
    "name": "DeleteVehicle",
    "group": "Vehicle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Vehicle id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/vehicle/5a3a4e096f6cd628e4d922a8",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/vehicle.js",
    "groupTitle": "Vehicle"
  },
  {
    "type": "post",
    "url": "http://<base-url>/vehicle/:id",
    "title": "Get Vehicle",
    "description": "<p>Get Vehicle record. Any user can request their own vehicle record without additional permission.</p> <ul> <li>Response - &quot;Common Response&quot; containig the Vehicle object. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>RECORD_NOT_FOUND <br/>PERMISSION_DENIED</li> <li>Authorization token required in header.</li> </ul>",
    "name": "GetVehicle",
    "group": "Vehicle",
    "examples": [
      {
        "title": "Example Request:",
        "content": "/vehicle/5ac331990f67c617da6046ee",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": {\n        \"vehicle\": {\n            \"shopId\": \"5a6ad448c80f921fc47c89ec\",\n            \"updatedAt\": \"2018-04-04 10:34:24\",\n            \"createdAt\": \"2018-04-04 10:34:24\",\n            \"mfgDate\": \"1980-01-01 00:00:00\",\n            \"lastInDate\": \"2015-06-15 13:54:40\",\n            \"inspDate\": \"2015-05-31 00:00:00\",\n            \"odometer\": 9958524,\n            \"vehicleId\": 582,\n            \"model\": \"XC70 \",\n            \"name\": \"2004 Volvo XC70\",\n            \"year\": 2004,\n            \"licenseNumber\": \"GTP1531\",\n            \"make\": \"Volvo\",\n            \"id\": \"5ac4aa30cf3dad10a8c44d17\",\n            \"user\": {\n                \"id\": \"5ac48f7f9f504b39ac9e5c2c\",\n                \"firstName\": \"Daniel\",\n                \"lastName\": \"Warner\"\n            }\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/vehicle.js",
    "groupTitle": "Vehicle"
  },
  {
    "type": "post",
    "url": "http://<base-url>/vehicle/list",
    "title": "List Vehicles",
    "description": "<p>List Vehicle records. Any user can request their own vehicle records without additional permission.</p> <ul> <li>Response - &quot;Common Response&quot; containig the Vehicle objects. Possible response codes are, <br/>SUCCESS <br/>FAIL</li> <li>Authorization token required in header. <br/><b>Sorting also possible using:</b> firstName, lastName, createdAt and other fields</li> </ul>",
    "name": "ListVehicles",
    "group": "Vehicle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "userId",
            "description": "<p>UserId for filtering</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "shopId",
            "description": "<p>ShopId for filtering</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "make",
            "description": "<p>Vehicle make for filtering</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "model",
            "description": "<p>Vehicle model for filtering</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "pageNo",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "limit",
            "description": "<p>Records per page.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting field. Prepend &quot;-&quot; for decending, otherwise ascending.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/vehicle/list",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"vehicles\": {\n            \"total\": 9,\n            \"data\": [\n                {\n                    \"shopId\": \"5a6ad448c80f921fc47c89ec\",\n                    \"updatedAt\": \"2018-04-04 10:34:24\",\n                    \"createdAt\": \"2018-04-04 10:34:24\",\n                    \"mfgDate\": \"1980-01-01 00:00:00\",\n                    \"lastInDate\": \"2015-06-15 13:54:40\",\n                    \"inspDate\": \"2015-05-31 00:00:00\",\n                    \"odometer\": 9958524,\n                    \"vehicleId\": 582,\n                    \"model\": \"XC70 \",\n                    \"name\": \"2004 Volvo XC70\",\n                    \"year\": 2004,\n                    \"licenseNumber\": \"GTP1531\",\n                    \"make\": \"Volvo\",\n                    \"id\": \"5ac4aa30cf3dad10a8c44d17\",\n                    \"user\": {\n                        \"id\": \"5ac48f7f9f504b39ac9e5c2c\",\n                        \"firstName\": \"Daniel\",\n                        \"lastName\": \"Warner\"\n                    }\n                },\n                {\n                    \"shopId\": \"5a6ad448c80f921fc47c89ec\",\n                    \"updatedAt\": \"2018-04-04 10:34:24\",\n                    \"createdAt\": \"2018-04-04 10:34:24\",\n                    \"mfgDate\": \"2015-10-14 00:00:00\",\n                    \"lastInDate\": null,\n                    \"inspDate\": \"2015-10-14 00:00:00\",\n                    \"odometer\": 0,\n                    \"vehicleId\": 637,\n                    \"model\": \"Sprinter 2500\",\n                    \"name\": \"2006 Dodge Sprinter\",\n                    \"year\": 2006,\n                    \"licenseNumber\": \"YZC0161\",\n                    \"make\": \"Dodge\",\n                    \"id\": \"5ac4aa30cf3dad10a8c44d16\",\n                    \"user\": {\n                        \"id\": \"5ac48f7f9f504b39ac9e5c2c\",\n                        \"firstName\": \"Daniel\",\n                        \"lastName\": \"Warner\"\n                    }\n                },\n                {\n                    \"shopId\": \"5a6ad448c80f921fc47c89ec\",\n                    \"updatedAt\": \"2018-04-04 10:34:24\",\n                    \"createdAt\": \"2018-04-04 10:34:24\",\n                    \"mfgDate\": \"2016-03-08 00:00:00\",\n                    \"lastInDate\": null,\n                    \"inspDate\": \"2016-03-08 00:00:00\",\n                    \"odometer\": 0,\n                    \"vehicleId\": 643,\n                    \"model\": \"\",\n                    \"name\": \"0  \",\n                    \"year\": null,\n                    \"licenseNumber\": \"YSJ9622\",\n                    \"make\": \"\",\n                    \"id\": \"5ac4aa30cf3dad10a8c44d15\",\n                    \"user\": {\n                        \"id\": \"5ac48f7f9f504b39ac9e5c2a\",\n                        \"firstName\": \"Dan\",\n                        \"lastName\": \"Tules\"\n                    }\n                }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/vehicle.js",
    "groupTitle": "Vehicle"
  },
  {
    "type": "post",
    "url": "http://<base-url>/vehicle-recommendation/sync-recommendations",
    "title": "Sync vehicle recommendations",
    "description": "<p>This method is given for Sync tool to sync M1 vehicle recommendations. It will insert new records and update existing records</p> <ul> <li>Refer &quot;Vehicle Recommendation Object&quot; for necessary parameters. Following example illustrates the valid parameters for vehicle recommendation create/update. Rest of the parameters described in &quot;Vehicle Recommendation Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> </ul>",
    "name": "Create",
    "group": "VehicleRecommendation",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"vehicleRecommendations\": [\n    {\n      \"action\": A,\n      \"m1VehicleId\": 642,\n      \"recommendationId\": 1812,\n      \"recommendDate\": \"2000-06-25\",\n      \"description\": \"NEED TO R&R HEAD, INSPECT AND RESEAL\"\n    },\n    {\n      \"action\": U,\n      \"m1VehicleId\": 642,\n      \"recommendationId\": 1813,\n      \"recommendDate\": \"2000-06-25\",\n      \"description\": \"Print recommendation\"\n    }\n  ]\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/vehicle-recommendation.js",
    "groupTitle": "VehicleRecommendation"
  },
  {
    "type": "delete",
    "url": "http://<base-url>/vehicle-recommendation/:id",
    "title": "Delete Vehicle Recommendation",
    "description": "<p>Delete existing vehicle Recommendation record.</p> <ul> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> </ul>",
    "name": "DeleteVehicleRecommendation",
    "group": "VehicleRecommendation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Vehicle recommendation record id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/vehicle-recommendation/5a3a4e096f6cd628e4d922a8",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/vehicle-recommendation.js",
    "groupTitle": "VehicleRecommendation"
  },
  {
    "type": "get",
    "url": "http://<base-url>/vehicle-recommendation/:id",
    "title": "Get Vehicle Recommendation",
    "description": "<p>Get Vehicle  Repair Recommendation Record. Any user can request their own vehicle repair  recommendation record without additional permission.</p> <ul> <li>Response - &quot;Common Response&quot; containig the Vehicle object. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>RECORD_NOT_FOUND <br/>PERMISSION_DENIED</li> <li>Authorization token required in header.</li> </ul>",
    "name": "GetVehicleRecommendation",
    "group": "VehicleRecommendation",
    "examples": [
      {
        "title": "Example Request:",
        "content": "vehicle-recommendation/5ad6d6a8b527e96dbb6d04e3",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": {\n      \"vehicleRecommendation\": {\n          \"shopId\": \"5a6f035a318ff528089bb857\",\n          \"vehicleId\": \"5ac32fca0f67c617da60457e\",\n          \"createdAt\": \"2018-04-18 05:24:56\",\n          \"updatedAt\": \"2018-04-18 05:24:56\",\n          \"isNotified\": 0,\n          \"recommendDate\": \"2000-06-25T00:00:00.000Z\",\n          \"description\": \"R4 Print recommendation\",\n          \"m1VehicleId\": 126,\n          \"recommendationId\": 1815,\n          \"id\": \"5ad6d6a8b527e96dbb6d04e3\",\n          \"user\": {\n              \"id\": \"5a8c0af12c12042d143f359a\",\n              \"firstName\": \"Dan\",\n              \"lastName\": \"ShopFlow\"\n          }\n      }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/vehicle-recommendation.js",
    "groupTitle": "VehicleRecommendation"
  },
  {
    "type": "get",
    "url": "http://<base-url>/vehicle-recommendation/list",
    "title": "List Vehicles Recommendations",
    "description": "<p>List Vehicle recommendation records. Any user can request their own vehicle repair recommendation records without additional permission.</p> <ul> <li>Response - &quot;Common Response&quot; containig the VehicleRecommendation objects. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>PERMISSION_DENIED</li> <li>Authorization token required in header.</li> </ul>",
    "name": "ListVehicleRecommendations",
    "group": "VehicleRecommendation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "userId",
            "description": "<p>UserId for filtering</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "shopId",
            "description": "<p>ShopId for filtering</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "vehicleId",
            "description": "<p>VehicleId for filtering</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "start",
            "description": "<p>recommendation date start value in format <b>YYYY-MM-DD</b></p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "end",
            "description": "<p>recommendation date end value in format <b>YYYY-MM-DD</b></p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "pageNo",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "limit",
            "description": "<p>Records per page.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting field. Prepend &quot;-&quot; for decending, otherwise ascending.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/vehicle-recommendation/list",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"vehicleRecommendations\": {\n            \"total\": 2,\n            \"data\": [\n              {\n                  \"shopId\": \"5a6f035a318ff528089bb857\",\n                  \"vehicleId\": \"5ac32fca0f67c617da60457e\",\n                  \"createdAt\": \"2018-04-18 05:24:56\",\n                  \"updatedAt\": \"2018-04-18 05:24:56\",\n                  \"isNotified\": 0,\n                  \"recommendDate\": \"2000-06-25T00:00:00.000Z\",\n                  \"description\": \"R4 Print recommendation\",\n                  \"m1VehicleId\": 126,\n                  \"recommendationId\": 1815,\n                  \"id\": \"5ad6d6a8b527e96dbb6d04e3\",\n                  \"user\": {\n                      \"id\": \"5a8c0af12c12042d143f359a\",\n                      \"firstName\": \"Dan\",\n                      \"lastName\": \"ShopFlow\"\n                  }\n             },\n              {\n                  \"shopId\": \"5a6f035a318ff528089bb857\",\n                  \"vehicleId\": \"5ac32fca0f67c617da60457e\",\n                  \"createdAt\": \"2018-04-18 05:24:56\",\n                  \"updatedAt\": \"2018-04-18 05:24:56\",\n                  \"isNotified\": 0,\n                  \"recommendDate\": \"2000-06-25T00:00:00.000Z\",\n                  \"description\": \"R3 Print recommendation\",\n                  \"m1VehicleId\": 126,\n                  \"recommendationId\": 1817,\n                  \"id\": \"5ad6d6a8b527e96dbb6d04e4\",\n                  \"user\": {\n                      \"id\": \"5a8c0af12c12042d143f359a\",\n                      \"firstName\": \"Dan\",\n                      \"lastName\": \"ShopFlow\"\n                  }\n              }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/vehicle-recommendation.js",
    "groupTitle": "VehicleRecommendation"
  },
  {
    "type": "put",
    "url": "http://<base-url>/vehicle-recommendation/sync-deleted",
    "title": "Sync deleted vehicle recommendations",
    "description": "<p>Compare synced recommendations ids sent from sync tool and delete deleted ones from SF DB.</p> <ul> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> </ul>",
    "name": "SyncDeletedRecommendation",
    "group": "VehicleRecommendation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "recommendationIds",
            "description": "<p>List of recommendation ids.</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "shopId",
            "description": "<p>Date(today).</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"recommendationIds\": [214, 216, 213, 225, 209, 212, 215],\n  \"date\":\"2018-06-20\"\n}",
        "type": "json"
      },
      {
        "title": "Example Request:",
        "content": "/vehicle-recommendation/5a3a4e096f6cd628e4d922a8",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/vehicle-recommendation.js",
    "groupTitle": "VehicleRecommendation"
  },
  {
    "type": "post",
    "url": "http://<base-url>/vehicle-repair-history/sync-histories",
    "title": "Sync vehicle repair histories",
    "description": "<p>This method is given for Sync tool to sync M1 vehicle repair histories. It will insert new records and update existing records</p> <ul> <li>Refer &quot;Vehicle Repair History Object&quot; for necessary parameters. Following example illustrates the valid parameters for vehicle repair history create/update. Rest of the parameters described in &quot;Vehicle Repair History Object&quot; are used for viewing and some other requests.</li> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> </ul>",
    "name": "Create",
    "group": "VehicleRepairHistory",
    "examples": [
      {
        "title": "Example Request:",
        "content": "{\n  \"vehicleRepairHistory\": [\n    {\n      \"m1VehicleId\": 642,\n      \"repairOrderId\": 1812,\n      \"lineItemId\": 1611,\n      \"invoiceNo\": 329,\n      \"dateOfService\": \"2000-04-25\",\n      \"odometer\": 123654,\n      \"description\": \"ENGINE - ANALYZE [B]\"\n    },\n    {\n      \"m1VehicleId\": 642,\n      \"repairOrderId\": 1812,\n      \"lineItemId\": 1612,\n      \"invoiceNo\": 329,\n      \"dateOfService\": \"2000-04-25\",\n      \"odometer\": 123654,\n      \"description\": \"R&R SPARK PLUGS\"\n    }\n  ]\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/vehicle-repair-history.js",
    "groupTitle": "VehicleRepairHistory"
  },
  {
    "type": "delete",
    "url": "http://<base-url>/vehicle-repair-history/:id",
    "title": "Delete Vehicle Reapir History",
    "description": "<p>Delete existing vehicle repair history record.</p> <ul> <li>Response - &quot;Common Response&quot;</li> <li>Authorization token required in header.</li> </ul>",
    "name": "DeleteVehicleRepairHistory",
    "group": "VehicleRepairHistory",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Vehicle repair history record id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": \"\",\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/vehicle-repair-history/5a3a4e096f6cd628e4d922a8",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "data/apidoc/vehicle-repair-history.js",
    "groupTitle": "VehicleRepairHistory"
  },
  {
    "type": "get",
    "url": "http://<base-url>/vehicle-repair-history/:id",
    "title": "Get Vehicle Repair History",
    "description": "<p>Get Vehicle  Repair History Record. Any user can request their own vehicle repair history record without additional permission.</p> <ul> <li>Response - &quot;Common Response&quot; containig the VehicleRepairHistory object. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>RECORD_NOT_FOUND <br/>PERMISSION_DENIED</li> <li>Authorization token required in header.</li> </ul>",
    "name": "GetVehicleRepairHistory",
    "group": "VehicleRepairHistory",
    "examples": [
      {
        "title": "Example Request:",
        "content": "vehicle-repair-history/5ad6d6a8b527e96dbb6d04e3",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": \"\",\n    \"data\": {\n      \"vehicleRepairHistory\": {\n          \"shopId\": \"5a6f035a318ff528089bb857\",\n          \"vehicleId\": \"5ac32fca0f67c617da60457e\",\n          \"createdAt\": \"2018-04-18 05:24:56\",\n          \"updatedAt\": \"2018-04-18 05:24:56\",\n          \"description\": \"ENGINE - ANALYZE [B]\",\n          \"odometer\": 123654,\n          \"dateOfService\": \"2000-04-25T00:00:00.000Z\",\n          \"invoiceNo\": 329,\n          \"lineItemId\": 1611,\n          \"repairOrderId\": 1813,\n          \"m1VehicleId\": 125,\n          \"id\": \"5ad6d6a8b527e96dbb6d04e3\",\n          \"user\": {\n              \"id\": \"5a8c0af12c12042d143f359a\",\n              \"firstName\": \"Dan\",\n              \"lastName\": \"ShopFlow\"\n          }\n      }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/vehicle-repair-history.js",
    "groupTitle": "VehicleRepairHistory"
  },
  {
    "type": "get",
    "url": "http://<base-url>/vehicle-repair-history/list",
    "title": "List Vehicles Histories",
    "description": "<p>List Vehicle repair history records. Any user can request their own vehicle repair history records without additional permission.</p> <ul> <li>Response - &quot;Common Response&quot; containig the VehicleRepairHistory objects. Possible response codes are, <br/>SUCCESS <br/>FAIL <br/>PERMISSION_DENIED</li> <li>Authorization token required in header.</li> </ul>",
    "name": "ListVehicleRepairHistories",
    "group": "VehicleRepairHistory",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "userId",
            "description": "<p>UserId for filtering</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "shopId",
            "description": "<p>ShopId for filtering</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "vehicleId",
            "description": "<p>VehicleId for filtering</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "pageNo",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "limit",
            "description": "<p>Records per page.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sort",
            "description": "<p>Sorting field. Prepend &quot;-&quot; for decending, otherwise ascending.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example Request:",
        "content": "/vehicle-repair-history/list",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": \"SUCCESS\",\n    \"attribute\": null,\n    \"data\": {\n        \"vehicleRepairHistory\": {\n            \"total\": 2,\n            \"data\": [\n              {\n                  \"shopId\": \"5a6f035a318ff528089bb857\",\n                  \"vehicleId\": \"5ac32fca0f67c617da60457e\",\n                  \"createdAt\": \"2018-04-18 05:24:56\",\n                  \"updatedAt\": \"2018-04-18 05:24:56\",\n                  \"description\": \"ENGINE - ANALYZE [B]\",\n                  \"odometer\": 123654,\n                  \"dateOfService\": \"2000-04-25T00:00:00.000Z\",\n                  \"invoiceNo\": 329,\n                  \"lineItemId\": 1611,\n                  \"repairOrderId\": 1813,\n                  \"m1VehicleId\": 125,\n                  \"id\": \"5ad6d6a8b527e96dbb6d04e3\",\n                  \"user\": {\n                      \"id\": \"5a8c0af12c12042d143f359a\",\n                      \"firstName\": \"Dan\",\n                      \"lastName\": \"ShopFlow\"\n                  }\n             },\n              {\n                  \"shopId\": \"5a6f035a318ff528089bb857\",\n                  \"vehicleId\": \"5ac32fca0f67c617da60457e\",\n                  \"createdAt\": \"2018-04-18 05:24:56\",\n                  \"updatedAt\": \"2018-04-18 05:24:56\",\n                  \"description\": \"ENGINE - ANALYZE [A]\",\n                  \"odometer\": 123654,\n                  \"dateOfService\": \"2000-04-25T00:00:00.000Z\",\n                  \"invoiceNo\": 329,\n                  \"lineItemId\": 1611,\n                  \"repairOrderId\": 1813,\n                  \"m1VehicleId\": 125,\n                  \"id\": \"5ad6d6a8b527e96dbb6d04e4\",\n                  \"user\": {\n                      \"id\": \"5a8c0af12c12042d143f359a\",\n                      \"firstName\": \"Dan\",\n                      \"lastName\": \"ShopFlow\"\n                  }\n              }\n            ]\n        }\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "data/apidoc/vehicle-repair-history.js",
    "groupTitle": "VehicleRepairHistory"
  }
] });

var supertest = require("supertest");
var should = require("should");
var config = require("config");

var server = supertest.agent(config.get('test.baseUrl'));

var header = {
	'api-key': config.get('api.key'),
	'api-secret': config.get('api.secret'),
	'Content-type': 'application/json',
	'Authorization': config.get('test.authorization')
}

var pushNotificationRequestId = '';
var shopId = '';

describe("PushNotificationRequest", function() {

	// Retrieve shop
	it ("Retreive shop for seed", function(done) {

		server
			.get("shop/list")
			.set(header)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				shopId = res.body.data.shops.data[0].id;
				done();
		    });
	});


	// Create push notification request
	it ("Should create a push notification request", function(done) {

		var data = {
			"shopIds": [],
			"users": ["5a792a2cd419dd10c4f9c094", "5a7929db37ab8e0cb4f587b2"],
			"text": "Hello",
			"shopId": shopId
		}

		server
			.post("push-notification-request")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				pushNotificationRequestId = res.body.data.pushNotificationRequest.id;
				done();
		    });
	});

	// List push notification requests
	it ("Should list push notification requests", function(done) {
		server
			.get("push-notification-request/list?shopId=" + shopId)
			.set(header)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				res.body.data.pushNotificationRequests.total.should.be.above(0);
				res.body.data.pushNotificationRequests.data.should.not.be.empty;
				done();
			});
	});

	// View single push notification request
	it ("Should view single push notification request", function(done) {
		server
			.get("push-notification-request/" + pushNotificationRequestId)
			.set(header)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				res.body.data.pushNotificationRequest.should.not.be.empty;
				done();
			});
	});

	// Delete push notification request
	it ("Should delete push notification request", function(done) {
		server
			.delete("push-notification-request/" + pushNotificationRequestId)
			.set(header)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				done();
		    });
	});
});
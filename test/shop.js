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

var shopId = '';

describe("Shop", function() {

	// Create shop
	it ("Should create a shop", function(done) {

		var data = {
			"brandName":"Magcity",
			"businessName":"Magcity",
			"registrationNumber":"123",
			"streetName": "James Peris Mawatha",
			"city": "Colombo",
			"state": "Western",
			"zip": "8080",
			"phoneNumber": "+94773959689",
			"faxNumber": "+94773959689",
			"email": "magcity@gmail.com",
			"gmail": "magcity@gmail.com",
			"googlePlusUrl": "http://google.com",
			"facebookPageUrl": "http://google.com",
			"twitterPageUrl": "http://google.com",
			"instagramPageUrl": "http://google.com",
			"logoName": "logo.jpg",
			"bannerName": "banner.jpg"
		};

		server
			.post("shop")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				shopId = res.body.data.shop.id;
				done();
		    });
	});

	// List shops
	it ("Should list all available shops", function(done) {

		server
			.get("shop/list")
			.set(header)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				res.body.data.shops.total.should.be.above(0);
				res.body.data.shops.data.should.not.be.empty;
				done();
		    });
	});

	// View shop
	it ("Should get single shop details", function(done) {

		server
			.get("shop/" + shopId)
			.set(header)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				res.body.data.shop.should.not.be.empty;
				done();
		    });
	});

	// Invite user to shop
	it("Should invite user to shop", function (done) {

		var data = {
			"email": "aruna47@gmail.com"
		};

		server
			.post("shop/" + shopId + "/invite")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				done();
		    });
	});

	// Update existing shop
	it ("Shop should be updated", function(done) {

		var data = {
			"brandName":"Magcity123",
			"businessName":"Magcity",
			"registrationNumber":"123",
			"streetName": "James Peris Mawatha",
			"city": "Colombo",
			"state": "Western",
			"zip": "8080",
			"phoneNumber": "+94773959689",
			"faxNumber": "+94773959689",
			"email": "magcity@gmail.com",
			"gmail": "magcity@gmail.com",
			"googlePlusUrl": "http://google.com",
			"facebookPageUrl": "http://google.com",
			"twitterPageUrl": "http://google.com",
			"instagramPageUrl": "http://google.com",
			"logoName": "logo.jpg",
			"bannerName": "banner.jpg"
		};

		server
			.put("shop/" + shopId)
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				done();
		    });
	});

	// Delete shop
	it ("Shop should be deleted", function(done) {

		server
			.delete("shop/" + shopId)
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
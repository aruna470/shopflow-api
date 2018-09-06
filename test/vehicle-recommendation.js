var supertest = require("supertest");
var should = require("should");
var config = require("config");

var server = supertest.agent(config.get('test.baseUrl'));

var header = {
	'api-key': config.get('api.key'),
	'api-secret': config.get('api.secret'),
	'Content-type': 'application/json',
	'Authorization': config.get('test.authorizationSyncTool')
}

var UserAuthHeader = {
	'api-key': config.get('api.key'),
	'api-secret': config.get('api.secret'),
	'Content-type': 'application/json',
	'Authorization': config.get('test.authorization')
}

var vehiclesRecommendationIds = [];

describe("VehicleRecommendation", function () {

	// Sync recommendations
	it("Should be able to add vehicle recommendation records", function (done) {
		var data = {
			"vehicleRecommendations": [
				{
					"m1VehicleId": 642,
					"recommendationId": 1812,
					"recommendDate": "2000-06-25",
					"description": "NEED TO R&R HEAD, INSPECT AND RESEAL"
				},
				{
					"m1VehicleId": 642,
					"recommendationId": 1813,
					"recommendDate": "2000-06-25",
					"description": "Print recommendation"
				}
			]
		}

		server
			.post("vehicle-recommendation/sync-recommendations")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				vehiclesRecommendationIds = res.body.data.vehiclesRecommendations;
				done();
			});
	});

	// Get vehicle recommendation
	it("Should be able to retrieve vehicle recommendation record", function (done) {

		server
			.get("vehicle-recommendation/" + vehiclesRecommendationIds[0])
			.set(UserAuthHeader)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				done();
			});
	});

	// List vehicle recommendations
	it("Should be able to retrieve list of vehicle recommendation records", function (done) {

		server
			.get("vehicle-recommendation/list")
			.set(UserAuthHeader)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				done();
			});
	});

	// Delete recommendations
	it("Should be able to delete recommendations", function (done) {

		for (var i = 0; i < vehiclesRecommendationIds.length; i++) {
			server
				.delete("vehicle-recommendation/" + vehiclesRecommendationIds[i])
				.set(header)
				.expect("Content-type", /json/)
				.expect(200)
				.end(function (err, res) {
					res.status.should.equal(200);
					res.body.code.should.equal('SUCCESS');
				});

			if (i + 1 == vehiclesRecommendationIds.length) {
				done();
			}
		}
	});
});
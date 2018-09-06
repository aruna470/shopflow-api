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

var vehicleRepairHistoryIds = [];

describe("VehicleRepairHistory", function() {

	// Create vehicles
	it ("Should be able to add vehicle repair history records", function(done) {
		var data = {
			"vehicleRepairHistories": [
				{
					"vehicleId": "5ad59090dc93cf4119fbf310",
					"m1VehicleId": 642,
					"repairOrderId": 1812,
					"lineItemId": 1611,
					"invoiceNo": 329,
					"dateOfService": "2000-04-25",
					"custEmail": "Dan.Warner@mitchell1.com",
					"odometer": 123654,
					"description": "ENGINE - ANALYZE [B]"
				},
				{
					"vehicleId": "5ad59090dc93cf4119fbf310",
					"m1VehicleId": 642,
					"repairOrderId": 1812,
					"lineItemId": 1612,
					"invoiceNo": 329,
					"dateOfService": "2000-04-25",
					"custEmail": "Dan.Warner@mitchell1.com",
					"odometer": 123654,
					"description": "R&R SPARK PLUGS"
				}
			  ]
			}

		server
			.post("vehicle-repair-history/sync-histories")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				vehicleRepairHistoryIds = res.body.data.vehiclesRepairHistories;
				done();
		    });
	});

	// Get vehicle repair history record
	it("Should be able to retrieve vehicle repair history record", function (done) {

		server
			.get("vehicle-repair-history/" + vehicleRepairHistoryIds[0])
			.set(UserAuthHeader)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				done();
			});
	});

	// List vehicle repair history records
	it("Should be able to retrieve list of vehicle repair history records", function (done) {

		server
			.get("vehicle-repair-history/list")
			.set(UserAuthHeader)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				done();
			});
	});

	// Delete vehicle repair histories
	it ("Should be able to delete vehicle repair history", function(done) {

		for (var i=0; i<vehicleRepairHistoryIds.length; i++) {
			server
				.delete("vehicle-repair-history/" + vehicleRepairHistoryIds[i])
				.set(header)
				.expect("Content-type", /json/)
				.expect(200)
				.end(function(err, res) {
					res.status.should.equal(200);
					res.body.code.should.equal('SUCCESS');
				});

				if (i+1 == vehicleRepairHistoryIds.length) {
					done();
				}
		}
	});
});
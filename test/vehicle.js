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

var vehicleIds = [];

describe("Vehicle", function() {

	// Create vehicles
	it ("Should be able to add vehicle list", function(done) {
		var data = {
			"vehicles": [
					{
						"mitCusId":3,
						"mitEmail":"john@highsdeed.com",
						"mitLicense":"SD-MCSE",
						"mitMilesPerDay":32,
						"mitOdometer1":2500,
						"mitOdometer2":0,
						"mitVehicleId":3
					},
					{
						"mitCusId":204,
						"mitEmail":"westgoshenauto@verizon.net",
						"mitLicense":"SMF37M",
						"mitMilesPerDay":0,
						"mitOdometer1":61172,
						"mitOdometer2":61172,
						"mitVehicleId":325
					}
				]
			}

		server
			.post("vehicle/bulk-create")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				vehicleIds = res.body.data.vehicles;
				done();
		    });
	});

	// Delete vehicles
	it ("Should be able to delete vehicle", function(done) {

		for (var i=0; i<vehicleIds.length; i++) {
			server
				.delete("vehicle/" + vehicleIds[i])
				.set(header)
				.expect("Content-type", /json/)
				.expect(200)
				.end(function(err, res) {
					res.status.should.equal(200);
					res.body.code.should.equal('SUCCESS');
			    });

			    if (i+1 == vehicleIds.length) {
			    	done();
			    }
		}
	});
});
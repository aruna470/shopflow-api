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

var permissionId = '';

describe("Permission", function() {

	// Create permission
	it ("Should create a permission", function(done) {

		var data = {
			"name": "TestPermission.Create",
			"description": "Create a test permission",
			"category": "Permission"
		};

		server
			.post("permission")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				permissionId = res.body.data.permission.id;
				done();
		    });
	});

	// Check permission uniqueness
	it ("Permission name should be unique", function(done) {

		var data = {
			"name": "TestPermission.Create",
			"description": "Create a test permission",
			"category": "Permission"
		};

		server
			.post("permission")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(400);
				res.body.code.should.equal('DUPLICATE_RECORD');
				done();
		    });
	});

	// List permissions
	it ("Should list all available permissions", function(done) {

		server
			.get("permission/list")
			.set(header)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				res.body.data.permissions.total.should.be.above(0);
				res.body.data.permissions.data.should.not.be.empty;
				done();
		    });
	});

	// View permission
	it ("Should get single permission details", function(done) {

		server
			.get("permission/" + permissionId)
			.set(header)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				res.body.data.permission.should.not.be.empty;
				done();
		    });
	});

	// Update existing permission
	it ("Permission should be updated", function(done) {

		var data = {
			"name": "TestPermission.Create",
			"description": "Create a test permission",
			"category": "Permission"
		};

		server
			.put("permission/" + permissionId)
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

	// Delete permission
	it ("Permission should be deleted", function(done) {

		server
			.delete("permission/" + permissionId)
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
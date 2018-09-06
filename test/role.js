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
var roleId = '';

describe("Role", function() {

	// Seed test data before perform testing
	// Seed - Creat permission
	it ("Seed test data - permission", function(done) {

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
				permissionId = res.body.data.permission.id;
				done();
		    });
	});

	// Create role
	it ("Should create a role", function(done) {

		var data = {
			"name": "TestRole",
			"description": "Test Role",
			"permissions": [permissionId]
		}

		server
			.post("role")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				roleId = res.body.data.role.id;
				done();
		    });
	});

	// Unique role name
	it ("Role name sould be unique", function(done) {

		var data = {
			"name": "TestRole",
			"description": "Test Role",
			"permissions": [permissionId]
		}

		server
			.post("role")
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

	// List roles
	it ("Should list all available roles", function(done) {

		server
			.get("role/list")
			.set(header)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				res.body.data.roles.total.should.be.above(0);
				res.body.data.roles.data.should.not.be.empty;
				done();
		    });
	});

	// View role
	it ("Should get single role details", function(done) {

		server
			.get("role/" + roleId)
			.set(header)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				res.body.data.role.should.not.be.empty;
				done();
		    });
	});

	// Update existing role
	it ("Role should be updated", function(done) {

		var data = {
			"name": "TestRole",
			"description": "Test Role 123",
			"permissions": [permissionId]
		}

		server
			.put("role/" + roleId)
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

	// Delete role
	it ("Role should be deleted", function(done) {

		server
			.delete("role/" + roleId)
			.set(header)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				done();
		    });
	});


	// Flush test data
	// Flush permission
	it ("Flush test data - permission", function(done) {

		server
			.delete("permission/" + permissionId)
			.set(header)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				done();
		    });
	});

});
var supertest = require("supertest");
var should = require("should");
var config = require("config");

var server = supertest.agent(config.get('test.baseUrl'));
var responseMessages = require('../lib/response-messages');

var header = {
	'api-key': config.get('api.key'),
	'api-secret': config.get('api.secret'),
	'Content-type': 'application/json',
	'Authorization': config.get('test.authorization')
}

var permissionId = '';
var roleId = '';
var userId = '';
var userId2 = '';
var accessToken = '';

describe("User", function() {

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

	// Seed - Creat permission
	it ("Seed test data - role", function(done) {

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
				roleId = res.body.data.role.id;
				done();
		    });
	});

	// Create normal user
	it ("Should create a normal user", function(done) {

		this.timeout(10000);

		var data = {
			"firstName": "Test",
			"lastName": "Test",
			"email": "test@keeneye.solutions",
			"password": "test.123",
			"mobile": "773959699",
			"gender": 1
		};

		server
			.post("user")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				userId = res.body.data.user.id;
				done();
		    });
	});

	// Create system user
	it ("Should create a system user", function(done) {

		this.timeout(10000);

		var data = {
			"firstName": "Test",
			"lastName": "Test",
			"sysEmail": "testsystem@keeneye.solutions",
			"password": "test.123",
			"roleId": roleId,
			"mobile": "773959699",
			"gender": 1
		};

		server
			.post("user/create")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				userId2 = res.body.data.user.id;
				done();
		    });
	});

	// Should be able to resend email verification token
	it("Should resend verification code", function (done) {

		this.timeout(10000);

		var data = {
			"email": "test@keeneye.solutions"
		};

		server
			.post("user/resend-verification-code")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal(responseMessages.SUCCESS);
				done();
			});
	});

	// Expect 404 for invalid email
	it("Send verification code - 404 if email not found", function (done) {

		this.timeout(10000);

		var data = {
			"email": "doesntexists@keeneye.solutions"
		};

		server
			.post("user/resend-verification-code")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(404)
			.end(function (err, res) {
				res.status.should.equal(404);
				res.body.code.should.equal(responseMessages.RECORD_NOT_FOUND);
				done();
			});
	});

	// Expect 400 if email parameter is missing
	it("Send verification code - 400 if email is not provided ", function (done) {

		this.timeout(10000);

		var data = {
		};

		server
			.post("user/resend-verification-code")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(400)
			.end(function (err, res) {
				res.status.should.equal(400);
				res.body.code.should.equal(responseMessages.MISSING_MANDATORY_ATTRIBUTE);
				done();
			});
	});

	// Should be able to request to reset the password
	it("Should be able send reset token", function (done) {

		this.timeout(10000);

		var data = {
			"sysEmail": "testsystem@keeneye.solutions"
		};

		server
			.post("user/forgot-password")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function (err, res) {
				res.status.should.equal(200);
				done();
			});
	});

	// Expect 404 for invalid token
	it("Should verify invalid token", function (done) {

		this.timeout(10000);

		var data = {
			"email": "testsystem@keeneye.solutions",
			"token": "1234"
		};

		server
			.post("user/verify-reset")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(400)
			.end(function (err, res) {
				res.status.should.equal(404);
				res.body.code.should.equal(responseMessages.RECORD_NOT_FOUND);
				done();
			});
	});

	// Check email unique
	it ("Email should be unique", function(done) {

		this.timeout(10000);

		var data = {
			"firstName": "Test",
			"lastName": "Test",
			"userType": 2,
			"email": "test@keeneye.solutions",
			"password": "test.123",
			"roleId": roleId,
			"status": 1,
			"mobile": "773959699",
			"gender": 1
		};

		server
			.post("user")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(400)
			.end(function(err, res) {
				res.status.should.equal(400);
				res.body.code.should.equal('DUPLICATE_RECORD');
				done();
		    });
	});


	// Check system user email unique
	it ("System user email should be unique", function(done) {

		this.timeout(10000);

		var data = {
			"firstName": "Test",
			"lastName": "Test",
			"userType": 1,
			"sysEmail": "testsystem@keeneye.solutions",
			"password": "test.123",
			"roleId": roleId,
			"status": 1,
			"mobile": "773959699",
			"gender": 1
		};

		server
			.post("user/create")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(400)
			.end(function(err, res) {
				res.status.should.equal(400);
				res.body.code.should.equal('DUPLICATE_RECORD');
				done();
		    });
	});

	// List users
	it ("Should list users", function(done) {

		server
			.get("user/list")
			.set(header)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				res.body.data.users.total.should.be.above(0);
				res.body.data.users.data.should.not.be.empty;
				done();
		    });
	});

	// View user
	it ("Should get single user details", function(done) {

		server
			.get("user/" + userId)
			.set(header)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				res.body.data.user.should.not.be.empty;
				done();
		    });
	});

	// Update existing user
	it ("User should be updated", function(done) {

		var data = {
			"firstName": "Test123",
			"lastName": "Test333"
		};

		server
			.put("user/" + userId)
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

	// Authenticate user
	it ("User should be authenticated", function(done) {

		var data = {
			"userType": 1,
			"sysEmail": "testsystem@keeneye.solutions",
			"password": "test.123"
		};

		server
			.post("user/authenticate")
			.set(header)
			.send(data)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				res.body.data.user.should.not.be.empty;
				res.body.data.user.accessToken.should.not.be.empty;
				accessToken = res.body.data.user.accessToken;
				done();
		    });
	});

	// Change password
	it ("User should be able to change password", function(done) {

		var data = {
			"oldPassword": "test.123",
			"newPassword": "test.1234"
		};

		// Cloning object
		var thisHeader = JSON.parse(JSON.stringify(header));
		thisHeader.Authorization = 'Bearer ' + accessToken;

		server
			.post("user/change-password")
			.set(thisHeader)
			.send(data)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				done();
		    });
	});

	// Delete user
	it ("User should be deleted", function(done) {

		server
			.delete("user/" + userId)
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

	// Flush normal user
	it ("Flush test data - user", function(done) {

		server
			.delete("user/" + userId)
			.set(header)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				done();
		    });
	});

	// Flush system user
	it ("Flush test data - system user", function(done) {

		server
			.delete("user/" + userId2)
			.set(header)
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.code.should.equal('SUCCESS');
				done();
		    });
	});

	// Flush role
	it ("Flush test data - role", function(done) {

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

	// Flush permission
	it ("Flush test data - permission", function(done) {

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
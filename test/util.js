var supertest = require("supertest");
var should = require("should");
var config = require("config");

var server = supertest.agent(config.get('test.baseUrl'));
var request = supertest(config.get('test.baseUrl'));
var responseMessages = require('../lib/response-messages');

var header = {
	'api-key': config.get('api.key'),
	'api-secret': config.get('api.secret'),
	'Authorization': config.get('test.authorization')
}

var generatedFileName;

describe("Util", function () {

	// Test S3 file upload
	it("Should upload file to s3 bucket", function (done) {

		var filename = 'test-s3-upload.txt'
			, boundary = Math.random()

		request
			.post('util/s3-upload')
			.set(header)
			.attach('fileData', 'test/resources/' + filename)
			.end(function (err, res) {
				res.body.code.should.equal(responseMessages.SUCCESS);
				res.body.data.fileName.should.not.be.empty;
				generatedFileName = res.body.data.fileName;
				res.body.data.location.should.not.be.empty;
				res.status.should.equal(200);
				done();
			});

	});

	// Test api to get presigned url for file from s3
	it("Should return signed url of the file", function (done) {

		request
			.get('util/s3-get-file/' + generatedFileName)
			.set(header)
			.end(function (err, res) {
				res.body.code.should.equal(responseMessages.SUCCESS);
				res.body.data.fileName.should.not.be.empty;
				generatedFileName = res.body.data.fileName;
				res.body.data.location.should.not.be.empty;
				res.status.should.equal(200);
				done();
			});
	});

	// Test api retreiving last sync details
	it("Should return last sync details", function (done) {

		header.Authorization = config.get('test.authorizationSyncTool');

		server
			.get("util/get-last-sync-info")
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
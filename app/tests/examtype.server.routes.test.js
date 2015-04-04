'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Examtype = mongoose.model('Examtype'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, examtype;

/**
 * Examtype routes tests
 */
describe('Examtype CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Examtype
		user.save(function() {
			examtype = {
				name: 'Examtype Name'
			};

			done();
		});
	});

	it('should be able to save Examtype instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Examtype
				agent.post('/examtypes')
					.send(examtype)
					.expect(200)
					.end(function(examtypeSaveErr, examtypeSaveRes) {
						// Handle Examtype save error
						if (examtypeSaveErr) done(examtypeSaveErr);

						// Get a list of Examtypes
						agent.get('/examtypes')
							.end(function(examtypesGetErr, examtypesGetRes) {
								// Handle Examtype save error
								if (examtypesGetErr) done(examtypesGetErr);

								// Get Examtypes list
								var examtypes = examtypesGetRes.body;

								// Set assertions
								(examtypes[0].user._id).should.equal(userId);
								(examtypes[0].name).should.match('Examtype Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Examtype instance if not logged in', function(done) {
		agent.post('/examtypes')
			.send(examtype)
			.expect(401)
			.end(function(examtypeSaveErr, examtypeSaveRes) {
				// Call the assertion callback
				done(examtypeSaveErr);
			});
	});

	it('should not be able to save Examtype instance if no name is provided', function(done) {
		// Invalidate name field
		examtype.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Examtype
				agent.post('/examtypes')
					.send(examtype)
					.expect(400)
					.end(function(examtypeSaveErr, examtypeSaveRes) {
						// Set message assertion
						(examtypeSaveRes.body.message).should.match('Please fill Examtype name');
						
						// Handle Examtype save error
						done(examtypeSaveErr);
					});
			});
	});

	it('should be able to update Examtype instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Examtype
				agent.post('/examtypes')
					.send(examtype)
					.expect(200)
					.end(function(examtypeSaveErr, examtypeSaveRes) {
						// Handle Examtype save error
						if (examtypeSaveErr) done(examtypeSaveErr);

						// Update Examtype name
						examtype.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Examtype
						agent.put('/examtypes/' + examtypeSaveRes.body._id)
							.send(examtype)
							.expect(200)
							.end(function(examtypeUpdateErr, examtypeUpdateRes) {
								// Handle Examtype update error
								if (examtypeUpdateErr) done(examtypeUpdateErr);

								// Set assertions
								(examtypeUpdateRes.body._id).should.equal(examtypeSaveRes.body._id);
								(examtypeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Examtypes if not signed in', function(done) {
		// Create new Examtype model instance
		var examtypeObj = new Examtype(examtype);

		// Save the Examtype
		examtypeObj.save(function() {
			// Request Examtypes
			request(app).get('/examtypes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Examtype if not signed in', function(done) {
		// Create new Examtype model instance
		var examtypeObj = new Examtype(examtype);

		// Save the Examtype
		examtypeObj.save(function() {
			request(app).get('/examtypes/' + examtypeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', examtype.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Examtype instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Examtype
				agent.post('/examtypes')
					.send(examtype)
					.expect(200)
					.end(function(examtypeSaveErr, examtypeSaveRes) {
						// Handle Examtype save error
						if (examtypeSaveErr) done(examtypeSaveErr);

						// Delete existing Examtype
						agent.delete('/examtypes/' + examtypeSaveRes.body._id)
							.send(examtype)
							.expect(200)
							.end(function(examtypeDeleteErr, examtypeDeleteRes) {
								// Handle Examtype error error
								if (examtypeDeleteErr) done(examtypeDeleteErr);

								// Set assertions
								(examtypeDeleteRes.body._id).should.equal(examtypeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Examtype instance if not signed in', function(done) {
		// Set Examtype user 
		examtype.user = user;

		// Create new Examtype model instance
		var examtypeObj = new Examtype(examtype);

		// Save the Examtype
		examtypeObj.save(function() {
			// Try deleting Examtype
			request(app).delete('/examtypes/' + examtypeObj._id)
			.expect(401)
			.end(function(examtypeDeleteErr, examtypeDeleteRes) {
				// Set message assertion
				(examtypeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Examtype error error
				done(examtypeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Examtype.remove().exec();
		done();
	});
});
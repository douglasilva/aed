'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Impexcel = mongoose.model('Impexcel'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, impexcel;

/**
 * Impexcel routes tests
 */
describe('Impexcel CRUD tests', function() {
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

		// Save a user to the test db and create new Impexcel
		user.save(function() {
			impexcel = {
				name: 'Impexcel Name'
			};

			done();
		});
	});

	it('should be able to save Impexcel instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Impexcel
				agent.post('/impexcels')
					.send(impexcel)
					.expect(200)
					.end(function(impexcelSaveErr, impexcelSaveRes) {
						// Handle Impexcel save error
						if (impexcelSaveErr) done(impexcelSaveErr);

						// Get a list of Impexcels
						agent.get('/impexcels')
							.end(function(impexcelsGetErr, impexcelsGetRes) {
								// Handle Impexcel save error
								if (impexcelsGetErr) done(impexcelsGetErr);

								// Get Impexcels list
								var impexcels = impexcelsGetRes.body;

								// Set assertions
								(impexcels[0].user._id).should.equal(userId);
								(impexcels[0].name).should.match('Impexcel Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Impexcel instance if not logged in', function(done) {
		agent.post('/impexcels')
			.send(impexcel)
			.expect(401)
			.end(function(impexcelSaveErr, impexcelSaveRes) {
				// Call the assertion callback
				done(impexcelSaveErr);
			});
	});

	it('should not be able to save Impexcel instance if no name is provided', function(done) {
		// Invalidate name field
		impexcel.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Impexcel
				agent.post('/impexcels')
					.send(impexcel)
					.expect(400)
					.end(function(impexcelSaveErr, impexcelSaveRes) {
						// Set message assertion
						(impexcelSaveRes.body.message).should.match('Please fill Impexcel name');
						
						// Handle Impexcel save error
						done(impexcelSaveErr);
					});
			});
	});

	it('should be able to update Impexcel instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Impexcel
				agent.post('/impexcels')
					.send(impexcel)
					.expect(200)
					.end(function(impexcelSaveErr, impexcelSaveRes) {
						// Handle Impexcel save error
						if (impexcelSaveErr) done(impexcelSaveErr);

						// Update Impexcel name
						impexcel.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Impexcel
						agent.put('/impexcels/' + impexcelSaveRes.body._id)
							.send(impexcel)
							.expect(200)
							.end(function(impexcelUpdateErr, impexcelUpdateRes) {
								// Handle Impexcel update error
								if (impexcelUpdateErr) done(impexcelUpdateErr);

								// Set assertions
								(impexcelUpdateRes.body._id).should.equal(impexcelSaveRes.body._id);
								(impexcelUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Impexcels if not signed in', function(done) {
		// Create new Impexcel model instance
		var impexcelObj = new Impexcel(impexcel);

		// Save the Impexcel
		impexcelObj.save(function() {
			// Request Impexcels
			request(app).get('/impexcels')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Impexcel if not signed in', function(done) {
		// Create new Impexcel model instance
		var impexcelObj = new Impexcel(impexcel);

		// Save the Impexcel
		impexcelObj.save(function() {
			request(app).get('/impexcels/' + impexcelObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', impexcel.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Impexcel instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Impexcel
				agent.post('/impexcels')
					.send(impexcel)
					.expect(200)
					.end(function(impexcelSaveErr, impexcelSaveRes) {
						// Handle Impexcel save error
						if (impexcelSaveErr) done(impexcelSaveErr);

						// Delete existing Impexcel
						agent.delete('/impexcels/' + impexcelSaveRes.body._id)
							.send(impexcel)
							.expect(200)
							.end(function(impexcelDeleteErr, impexcelDeleteRes) {
								// Handle Impexcel error error
								if (impexcelDeleteErr) done(impexcelDeleteErr);

								// Set assertions
								(impexcelDeleteRes.body._id).should.equal(impexcelSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Impexcel instance if not signed in', function(done) {
		// Set Impexcel user 
		impexcel.user = user;

		// Create new Impexcel model instance
		var impexcelObj = new Impexcel(impexcel);

		// Save the Impexcel
		impexcelObj.save(function() {
			// Try deleting Impexcel
			request(app).delete('/impexcels/' + impexcelObj._id)
			.expect(401)
			.end(function(impexcelDeleteErr, impexcelDeleteRes) {
				// Set message assertion
				(impexcelDeleteRes.body.message).should.match('User is not logged in');

				// Handle Impexcel error error
				done(impexcelDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Impexcel.remove().exec();
		done();
	});
});
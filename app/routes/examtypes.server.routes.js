'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var examtypes = require('../../app/controllers/examtypes.server.controller');

	// Examtypes Routes
	app.route('/examtypes')
		.get(examtypes.list)
		.post(users.requiresLogin, examtypes.create);

	app.route('/examtypes/:examtypeId')
		.get(examtypes.read)
		.put(users.requiresLogin, examtypes.hasAuthorization, examtypes.update)
		.delete(users.requiresLogin, examtypes.hasAuthorization, examtypes.delete);

	// Finish by binding the Examtype middleware
	app.param('examtypeId', examtypes.examtypeByID);
};

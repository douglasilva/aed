'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var impexcels = require('../../app/controllers/impexcels.server.controller');

	// Impexcels Routes
	app.route('/impexcels')
		.post(users.requiresLogin, impexcels.importexcel);
};

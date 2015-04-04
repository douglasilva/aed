'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Examtype = mongoose.model('Examtype'),
	_ = require('lodash');

/**
 * Create a Examtype
 */
exports.create = function(req, res) {
	var examtype = new Examtype(req.body);
	examtype.user = req.user;

	examtype.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(examtype);
		}
	});
};

/**
 * Show the current Examtype
 */
exports.read = function(req, res) {
	res.jsonp(req.examtype);
};

/**
 * Update a Examtype
 */
exports.update = function(req, res) {
	var examtype = req.examtype ;

	examtype = _.extend(examtype , req.body);

	examtype.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(examtype);
		}
	});
};

/**
 * Delete an Examtype
 */
exports.delete = function(req, res) {
	var examtype = req.examtype ;

	examtype.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(examtype);
		}
	});
};

/**
 * List of Examtypes
 */
exports.list = function(req, res) { 
	Examtype.find().sort('-created').populate('user', 'displayName').exec(function(err, examtypes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(examtypes);
		}
	});
};

/**
 * Examtype middleware
 */
exports.examtypeByID = function(req, res, next, id) { 
	Examtype.findById(id).populate('user', 'displayName').exec(function(err, examtype) {
		if (err) return next(err);
		if (! examtype) return next(new Error('Failed to load Examtype ' + id));
		req.examtype = examtype ;
		next();
	});
};

/**
 * Examtype authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.examtype.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

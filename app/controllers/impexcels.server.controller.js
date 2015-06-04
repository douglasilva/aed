'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Exam = mongoose.model('Exam'),
	Examtype = mongoose.model('Examtype'),
	path = require('path'),
	XLSX = require('xlsx'),
	async = require('async'),
	_ = require('lodash');

/**
 * Create a Impexcel
 */
exports.importexcel = function(req, res) {

	var workbook = XLSX.readFile(req.files.arquivo.path);

	for(var y in workbook.SheetNames)
	{
		var worksheet = workbook.Sheets[y];
		for (var z in worksheet)
		{
			if(z[0] !== '!') {
				console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
			}
		};
	};

	var exam = new Exam();
	exam.name = 'Douglas de Alvarenga Silva';
	exam.date = new Date();
	exam.age = 31;
	exam.doctorName = 'Alice';
	exam.reason = 'teste';
	exam.healthPlan = 'CASU';
	//exam.examType = 552d996cfc9431780ffc87dc;
	exam.report = 'funcionou';
	exam.status = 'A';

	var id = '552d996cfc9431780ffc87dc';
	Examtype.findOne({_id:id}, '_id', function (error, examType)
	{
		if (examType)
			exam.examType = examType._id;

		exam.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.redirect('/');
			}
		});
	});
};

/**
 * Impexcel authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.impexcel.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

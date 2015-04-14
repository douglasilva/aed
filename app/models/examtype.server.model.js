'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Examtype Schema
 */
var ExamtypeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Por favor informe o nome do tipo de exame',
		trim: true
	},
	report: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Examtype', ExamtypeSchema);

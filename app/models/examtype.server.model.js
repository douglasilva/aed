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
		required: 'Please fill Examtype name',
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
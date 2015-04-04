'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Exam Schema
 */
var ExamSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Por favor informe o nome do paciente',
		trim: true
	},
	age: {
		type: Number,
		required: 'Por favor informe a idade do paciente'
	},
	doctorName: {
		type: String,
		default: '',
		required: 'Por favor informe o nome do médico solicitante',
		trim: true
	},
	reason: {
		type: String,
		default: '',
		required: 'Por favor informe o motivo do exame',
		trim: true
	},
	healthPlan: {
		type: String,
		default: '',
		required: 'Por favor informe o plano de saúde',
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

mongoose.model('Exam', ExamSchema);

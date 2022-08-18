const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	title: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 255,
	},
	description: {
		type: String,
		minlength: 3,
		maxlength: 255,
	},
	category: {
		type: String,
		required: false,
		minlength: 3,
		maxlength: 255,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

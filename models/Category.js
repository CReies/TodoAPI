const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	name: {
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
	createdAt: {
		type: Date,
		default: Date.now,
	},
	tasks: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Task',
		},
	],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

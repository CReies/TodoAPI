const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
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

categorySchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

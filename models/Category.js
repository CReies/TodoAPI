const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
	{
		_id: { type: String, default: new mongoose.Types.ObjectId().toString() },
		title: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 50,
		},
		description: {
			type: String,
			minlength: 3,
			maxlength: 255,
		},
		color: {
			type: String,
			length: 6,
			default: '6e6e6e',
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		tasks: [
			{
				type: String,
				ref: 'Task',
			},
		],
	},
	{ _id: false }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

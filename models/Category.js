const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
	{
		_id: { type: String, default: new mongoose.Types.ObjectId().toString() },
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
				type: String,
				ref: 'Task',
			},
		],
	},
	{ _id: false }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

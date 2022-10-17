import { Schema, model } from 'mongoose';
import { v4 } from 'uuid';
import type { ICategory } from '../util/types';

const categorySchema = new Schema<ICategory>(
	{
		_id: {
			type: String,
			default: v4(),
		},
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
			length: 7,
			default: '#6e6e6e',
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

const Category = model('Category', categorySchema);

export default Category;

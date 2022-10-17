import { Schema, model } from 'mongoose';
import { v4 } from 'uuid';
import type { ITask } from '../util/types';

const taskSchema = new Schema<ITask>(
	{
		_id: {
			type: String,
			default: v4(),
			auto: true,
		},
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
			required: true,
			default: '0',
		},
		completed: {
			type: Boolean,
			default: false,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ _id: false }
);

const Task = model('Task', taskSchema);

export default Task;

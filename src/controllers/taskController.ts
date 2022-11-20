import type { RequestHandler } from 'express';
import createError from 'http-errors';
import Category from '../models/Category';
import Task from '../models/Task';

export const getAll: RequestHandler = async (_req, res, nxt) => {
	try {
		// TODO .skip(page * limit).limit(limit)
		// TODO find({ user: req.user._id })
		const tasks = await Task.find({}).populate('category').sort({ createdAt: 1 }).lean();

		return res.json(tasks);
	} catch (err) {
		let msg = 'Unknown Error';

		if (typeof err === 'string') msg = err;
		else if (err instanceof Error) msg = err.message;

		nxt(createError(500, msg));
		return undefined;
	}
};

export const getOne: RequestHandler = async (req, res, nxt) => {
	try {
		const task = await Task.findById(req.params.id).populate('category').lean();

		if (task == null) {
			nxt(createError(404, "Task doesn't exist"));
			return undefined;
		}

		return res.json(task);
	} catch (err) {
		let msg = 'Unknown Error';

		if (typeof err === 'string') msg = err;
		else if (err instanceof Error) msg = err.message;

		nxt(createError(500, msg));
		return undefined;
	}
};

export const create: RequestHandler = async (req, res, nxt) => {
	try {
		const task = new Task(req.body);
		const categoryId = req.body.category ?? '0';
		const category = await Category.findById(categoryId);

		if (category == null) {
			nxt(createError(400, "Category doesn't exist"));
			return undefined;
		}

		category.tasks.push(task._id as string);

		await task.save();
		await category.save();

		return res.status(201).json({
			status: 'Task Saved',
		});
	} catch (err) {
		let msg = 'Unknown Error';

		if (typeof err === 'string') msg = err;
		else if (err instanceof Error) msg = err.message;

		nxt(createError(500, msg));
		return undefined;
	}
};

export const update: RequestHandler = async (req, res, nxt) => {
	try {
		const { id } = req.params;
		const task = await Task.findByIdAndUpdate(id, req.body).lean();

		if (task == null) {
			nxt(createError(404, "Task doesn't exist"));
			return undefined;
		}

		return res.json(task);
	} catch (err) {
		let msg = 'Unknown Error';

		if (typeof err === 'string') msg = err;
		else if (err instanceof Error) msg = err.message;

		nxt(createError(500, msg));
		return undefined;
	}
};

export const deleteOne: RequestHandler = async (req, res, nxt) => {
	try {
		const { id } = req.params;
		const task = await Task.findById(id);

		if (task == null) {
			nxt(createError(404, "Task doesn't exist"));
			return undefined;
		}

		await task.delete();

		return res.json({
			status: 'Task Deleted',
		});
	} catch (err) {
		let msg = 'Unknown Error';

		if (typeof err === 'string') msg = err;
		else if (err instanceof Error) msg = err.message;

		nxt(createError(500, msg));
		return undefined;
	}
};

export const complete: RequestHandler = async (req, res, nxt) => {
	try {
		const { id } = req.params;
		const task = await Task.findById(id);
		if (task == null) {
			nxt(createError(404, "Task doesn't exist"));
			return undefined;
		}

		await task.updateOne({ completed: true });

		return res.json('Task Modified');
	} catch (err) {
		let msg = 'Unknown Error';

		if (typeof err === 'string') msg = err;
		else if (err instanceof Error) msg = err.message;

		nxt(createError(500, msg));
		return undefined;
	}
};

export const uncomplete: RequestHandler = async (req, res, nxt) => {
	try {
		const { id } = req.params;
		const task = await Task.findById(id);
		if (task == null) {
			nxt(createError(404, "Task doesn't exist"));
			return undefined;
		}

		await task.updateOne({ completed: false });

		return res.json('Task Modified');
	} catch (err) {
		let msg = 'Unknown Error';

		if (typeof err === 'string') msg = err;
		else if (err instanceof Error) msg = err.message;

		nxt(createError(500, msg));
		return undefined;
	}
};

export const search: RequestHandler = async (req, res, nxt) => {
	try {
		const { search } = req.params;
		const tasks = await Task.find({ $text: { $search: search } })
			.populate('category')
			.lean();
		return res.json(tasks);
	} catch (err) {
		let msg = 'Unknown Error';

		if (typeof err === 'string') msg = err;
		else if (err instanceof Error) msg = err.message;

		nxt(createError(500, msg));
		return undefined;
	}
};

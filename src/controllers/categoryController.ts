import type { RequestHandler } from 'express';
import createError from 'http-errors';
import Category from '../models/Category';
import Task from '../models/Task';

export const getAll: RequestHandler = async (_req, res, nxt) => {
	try {
		const categories = await Category.find({}).populate('tasks').lean();
		return res.json(categories);
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
		const category = await Category.findById(req.params.id).populate('tasks').lean();
		return res.json(category);
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
		const category = new Category(req.body);
		await category.save();
		return res.json({
			status: 'Category Saved',
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
		const category = await Category.findByIdAndUpdate(id, req.body).lean();
		return res.json(category);
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
		const deleteTasks = req.query?.deleteTasks === 'true';
		const category = await Category.findById(id);
		const tasks = await Task.find({ category: id });

		if (category == null) return;

		for (const task of tasks) {
			if (deleteTasks) void task.delete();
			else void task.updateOne({ category: "0" })
		}

		category.deleteOne();

		return res.json({
			status: 'Category Deleted',
		});
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
		const categories = await Category.find({
			$text: { $search: search },
		})
			.populate('tasks')
			.lean();
		return res.json(categories);
	} catch (err) {
		let msg = 'Unknown Error';

		if (typeof err === 'string') msg = err;
		else if (err instanceof Error) msg = err.message;

		nxt(createError(500, msg));
		return undefined;
	}
};

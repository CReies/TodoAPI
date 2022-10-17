import createError from 'http-errors';
import Category from '../models/Category';
import Task from '../models/Task';
import type { NextFunction, Request, Response } from 'express';

export const getAll = async (
	_req: Request,
	res: Response,
	nxt: NextFunction
): Promise<Response | undefined> => {
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

export const getOne = async (
	req: Request,
	res: Response,
	nxt: NextFunction
): Promise<Response | undefined> => {
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

export const create = async (
	req: Request,
	res: Response,
	nxt: NextFunction
): Promise<Response | undefined> => {
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

export const update = async (
	req: Request,
	res: Response,
	nxt: NextFunction
): Promise<Response | undefined> => {
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

export const deleteOne = async (
	req: Request,
	res: Response,
	nxt: NextFunction
): Promise<Response | undefined> => {
	try {
		const { id } = req.params;
		const category = await Category.findById(id);
		const tasks = await Task.find({ category: id });

		if (category == null) return;

		for (const task of tasks) {
			void task.updateOne({ category: '0' });
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

export const search = async (
	req: Request,
	res: Response,
	nxt: NextFunction
): Promise<Response | undefined> => {
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

const createError = require('http-errors');
const Category = require('../models/Category');
const Task = require('../models/Task');

module.exports = {
	getAll: async (req, res, nxt) => {
		try {
			const { page, limit } = req.query;
			// TODO find({ user: req.user._id })
			const tasks = await Task.find({})
				.populate('category')
				.skip(page * limit)
				.limit(limit)
				.sort({ createdAt: 1 })
				.lean();

			if (tasks.length === 0) return res.json('Create a task!');

			return res.json(tasks);
		} catch (err) {
			return nxt(createError(500, err.message));
		}
	},

	getOne: async (req, res, nxt) => {
		try {
			const task = await Task.findById(req.params.id)
				.populate('category')
				.lean();

			if (!task) return nxt(createError(404, "Task doesn't exist"));

			return res.json(task);
		} catch (err) {
			return nxt(createError(500, err.message));
		}
	},

	create: async (req, res, nxt) => {
		try {
			const task = new Task(req.body);
			const categoryId = req.body.category || '0';
			const category = await Category.findById(categoryId);

			if (!category) return nxt(createError(400, "Category doesn't exist"));

			category.tasks = category.tasks.concat(task._id);

			await task.save();
			await category.save();

			return res.status(201).json({
				status: 'Task Saved',
			});
		} catch (err) {
			return nxt(createError(500, err.message));
		}
	},

	update: async (req, res, nxt) => {
		try {
			const { id } = req.params;
			const task = await Task.findByIdAndUpdate(id, req.body).lean();

			if (!task) return nxt(createError(404, "Task doesn't exist"));

			return res.json(task);
		} catch (err) {
			return nxt(createError(500, err.message));
		}
	},

	deleteOne: async (req, res, nxt) => {
		try {
			const { id } = req.params;
			const task = await Task.findById(id);

			if (!task) return nxt(createError(404, "Task doesn't exist"));

			await task.delete();

			return res.json({
				status: 'Task Deleted',
			});
		} catch (err) {
			return nxt(createError(500, err.message));
		}
	},

	complete: async (req, res, nxt) => {
		try {
			const { id } = req.params;
			const task = await Task.findById(id);
			if (!task) return nxt(createError(404, "Task doesn't exist"));

			await task.update({ completed: true });

			return res.json('Task Modified');
		} catch (err) {
			return nxt(createError(500, err.message));
		}
	},

	uncomplete: async (req, res, nxt) => {
		try {
			const { id } = req.params;
			const task = await Task.findById(id);
			if (!task) return nxt(createError(404, "Task doesn't exist"));

			await task.update({ completed: false });

			return res.json('Task Modified');
		} catch (err) {
			return nxt(createError(500, err.message));
		}
	},

	search: async (req, res, nxt) => {
		try {
			const { search } = req.params;
			const tasks = await Task.find({ $text: { $search: search } })
				.populate('category')
				.lean();
			return res.json(tasks);
		} catch (err) {
			return nxt(createError(500, err.message));
		}
	},
};

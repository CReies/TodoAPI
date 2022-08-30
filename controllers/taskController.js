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
				.sort({ createdAt: -1 });

			return res.json(tasks);
		} catch (err) {
			nxt(createError(500, err.message));
		}
	},

	getOne: async (req, res, nxt) => {
		try {
			const task = await Task.findById(req.params.id).populate('category');
			return res.json(task);
		} catch (err) {
			nxt(createError(500, err.message));
		}
	},

	create: async (req, res, nxt) => {
		try {
			const task = new Task(req.body);
			const categoryId = req.body.category;
			const category = await Category.findById(categoryId);

			if (!category) nxt(createError(400, "Category doesn't exist"));

			category.tasks = category.tasks.concat(task._id);

			await task.save();
			await category.save();

			return res.json({
				status: 'Task Saved',
			});
		} catch (err) {
			nxt(createError(500, err.message));
		}
	},

	update: async (req, res, nxt) => {
		try {
			const { id } = req.params;
			const task = await Task.findByIdAndUpdate(id, req.body);
			return res.json(task);
		} catch (err) {
			nxt(createError(500, err.message));
		}
	},

	deleteOne: async (req, res, nxt) => {
		try {
			const { id } = req.params;
			await Task.findByIdAndDelete(id);
			return res.json({
				status: 'Task Deleted',
			});
		} catch (err) {
			nxt(createError(500, err.message));
		}
	},

	complete: async (req, res, nxt) => {
		try {
			const { id } = req.params;
			const task = await Task.findByIdAndUpdate(id, { completed: true });
			return res.json(task);
		} catch (err) {
			nxt(createError(500, err.message));
		}
	},

	uncomplete: async (req, res, nxt) => {
		try {
			const { id } = req.params;
			const task = await Task.findByIdAndUpdate(id, { completed: false });
			return res.json(task);
		} catch (err) {
			nxt(createError(500, err.message));
		}
	},

	search: async (req, res, nxt) => {
		try {
			const { search } = req.params;
			const tasks = await Task.find({ $text: { $search: search } }).populate(
				'category'
			);
			return res.json(tasks);
		} catch (err) {
			nxt(createError(500, err.message));
		}
	},
};

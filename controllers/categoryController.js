const createError = require('http-errors');
const Category = require('../models/Category');
const Task = require('../models/Task');

module.exports = {
	getAll: async (_req, res, nxt) => {
		try {
			const categories = await Category.find({}).populate('tasks').lean();
			return res.json(categories);
		} catch (err) {
			nxt(createError(500, err.message));
		}
	},

	getOne: async (req, res, nxt) => {
		try {
			const category = await Category.findById(req.params.id)
				.populate('tasks')
				.lean();
			return res.json(category);
		} catch (err) {
			nxt(createError(500, err.message));
		}
	},

	create: async (req, res, nxt) => {
		try {
			const category = new Category(req.body);
			await category.save();
			return res.json({
				status: 'Category Saved',
			});
		} catch (err) {
			nxt(createError(500, err.message));
		}
	},

	update: async (req, res, nxt) => {
		try {
			const { id } = req.params;
			const category = await Category.findByIdAndUpdate(id, req.body).lean();
			return res.json(category);
		} catch (err) {
			nxt(createError(500, err.message));
		}
	},

	deleteOne: async (req, res, nxt) => {
		try {
			const { id } = req.params;
			const category = await Category.findById(id)
			const tasks = await Task.find({category: id})

			for (let task of tasks){
				task.updateOne({category:"0"})
			}

			category.deleteOne();

			return res.json({
				status: 'Category Deleted',
			});
		} catch (err) {
			nxt(createError(500, err.message));
		}
	},

	search: async (req, res) => {
		try {
			const { search } = req.params;
			const categories = await Category.find({
				$text: { $search: search },
			})
				.populate('tasks')
				.lean();
			return res.json(categories);
		} catch (err) {
			nxt(createError(500, err.message));
		}
	},
};

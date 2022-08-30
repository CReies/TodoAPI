const createError = require('http-errors');
const Category = require('../models/Category');

module.exports = {
	getAll: async (_req, res, nxt) => {
		try {
			const categories = await Category.find({}).populate('tasks');
			return res.json(categories);
		} catch (err) {
			nxt(createError(500, err.message));
		}
	},

	getOne: async (req, res, nxt) => {
		try {
			const category = await Category.findById(req.params.id).populate('s');
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
			const category = await Category.findByIdAndUpdate(id, req.body);
			return res.json(category);
		} catch (err) {
			nxt(createError(500, err.message));
		}
	},

	deleteOne: async (req, res, nxt) => {
		try {
			const { id } = req.params;
			await Category.findByIdAndDelete(id);
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
			}).populate('tasks');
			return res.json(categories);
		} catch (err) {
			nxt(createError(500, err.message));
		}
	},
};

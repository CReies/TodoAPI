const Category = require('../models/Category');

module.exports = {
	getAll: async (_req, res) => {
		const categories = await Category.find({}).populate('tasks');
		return res.json(categories);
	},

	getOne: async (req, res) => {
		const category = await Category.findById(req.params.id).populate('tasks');
		return res.json(category);
	},

	create: async (req, res) => {
		const category = new Category(req.body);
		await category.save();
		return res.json({
			status: 'Category Saved',
		});
	},

	update: async (req, res) => {
		const { id } = req.params;
		const category = await Category.findByIdAndUpdate(id, req.body);
		return res.json(category);
	},

	deleteOne: async (req, res) => {
		const { id } = req.params;
		await Category.findByIdAndDelete(id);
		return res.json({
			status: 'Category Deleted',
		});
	},

	search: async (req, res) => {
		const { search } = req.params;
		const categories = await Category.find({
			$text: { $search: search },
		}).populate('tasks');
		return res.json(categories);
	},
};

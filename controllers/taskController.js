const Category = require('../models/Category');
const Task = require('../models/Task');

module.exports = {
	getAll: async (req, res) => {
		const { page, limit } = req.query;
		// TODO find({ user: req.user._id })
		const tasks = await Task.find({})
			.populate('category')
			.skip(page * limit)
			.limit(limit)
			.sort({ createdAt: -1 });
		return res.json(tasks);
	},

	getOne: async (req, res) => {
		const task = await Task.findById(req.params.id).populate('category');
		return res.json(task);
	},

	create: async (req, res) => {
		const task = new Task(req.body);
		const categoryId = req.body.category;
		const category = await Category.findById(categoryId);

		await task.save();

		category.tasks = category.tasks.concat(task._id);

		await category.save();

		return res.json({
			status: 'Task Saved',
		});
	},

	update: async (req, res) => {
		const { id } = req.params;
		const task = await Task.findByIdAndUpdate(id, req.body);
		return res.json(task);
	},

	deleteOne: async (req, res) => {
		const { id } = req.params;
		await Task.findByIdAndDelete(id);
		return res.json({
			status: 'Task Deleted',
		});
	},

	complete: async (req, res) => {
		const { id } = req.params;
		const task = await Task.findByIdAndUpdate(id, { completed: true });
		return res.json(task);
	},

	uncomplete: async (req, res) => {
		const { id } = req.params;
		const task = await Task.findByIdAndUpdate(id, { completed: false });
		return res.json(task);
	},

	search: async (req, res) => {
		const { search } = req.params;
		const tasks = await Task.find({ $text: { $search: search } }).populate(
			'category'
		);
		return res.json(tasks);
	},
};

const Task = require('../models/Task');

module.exports = {
	getAll: async (_req, res) => {
		const tasks = await Task.find();
		return res.json(tasks);
	},

	getOne: async (req, res) => {
		const task = await Task.findById(req.params.id);
		return res.json(task);
	},

	create: async (req, res) => {
		const task = new Task(req.body);
		await task.save();
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
		const tasks = await Task.find({ $text: { $search: search } });
		return res.json(tasks);
	},
};

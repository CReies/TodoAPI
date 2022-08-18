const mongoose = require('mongoose');
const debug = require('debug')('todoapi:db');

// DB connect
const uri = process.env.URI_MONGO;

debug.enabled = true;

module.exports = async () => {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		debug('Connected to MongoDB');
	} catch (error) {
		debug(error);
	}
};

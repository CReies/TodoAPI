const mongoose = require('mongoose');

// DB connect
const uri = process.env.URI_MONGO;

module.exports = async () => {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Database connected');
	} catch (error) {
		console.log(error);
	}
};

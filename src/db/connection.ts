import mongoose from 'mongoose';
import createDebugMessages from 'debug';

// DB connect

const debug = createDebugMessages('todoapi:db');
debug.enabled = true;

export default async (): Promise<void> => {
	const uri = process.env.URI_MONGO;
	if (uri == null) return;
	try {
		await mongoose.connect(uri);
		debug('Connected to MongoDB');
	} catch (error) {
		debug(String(error));
	}
};

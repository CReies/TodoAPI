import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import createError from 'http-errors';
import User from '../models/User';

export const register: RequestHandler = async (req, res, nxt) => {
	try {
		const { username, password, passwordConfirm } = req.body;

		if (!username || !password || !passwordConfirm) return nxt(createError('Not all required inputs are present.'));

		body(username).custom(async username => {
			const user = await User.find({ username });
			if (user) return Promise.reject('Username already exists');
			return;
		});

		body(passwordConfirm).custom(passwordConfirm => {
			if (passwordConfirm != password) return Promise.reject();
			return;
		});

		body(password).isLength({ min: 8, max: 128 });

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			nxt(createError(errors.array()));
		}

		return bcrypt.hash(password, 10, async (err, hash) => {
			if (err) return nxt(createError(err));

			const user = await User.create({ username, password: hash });
			return res.json(user);
		});
	} catch (err) {
		let msg = 'Unknown Error';

		if (typeof err === 'string') msg = err;
		else if (err instanceof Error) msg = err.message;

		nxt(createError(400, msg));
		return undefined;
	}
};

export const login: RequestHandler = async (req, res, nxt) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) return nxt(createError('Not all required inputs are present'));
	} catch (err) {}
};

export default { register };

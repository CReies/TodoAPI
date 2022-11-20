import createError from 'http-errors';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const tokenMiddleware: RequestHandler = (req, _res, nxt) => {
	try {
		let token = req.headers?.authorization;

		if (!token) return nxt(createError(401, 'No Bearer'));

		token = token.split(' ')[1];
		const { JWT_ENCRYPT: jwtSecret } = process.env;

		if (!jwtSecret) throw new Error('');

		const decodedToken = jwt.verify(token, jwtSecret);

		if (decodedToken instanceof String) return nxt(createError(401, ''));

		return nxt();
	} catch (err) {
		let msg = 'Unknown Error';

		if (typeof err === 'string') msg = err;
		else if (err instanceof Error) msg = err.message;

		nxt(createError(401, msg));
		return undefined;
	}
};

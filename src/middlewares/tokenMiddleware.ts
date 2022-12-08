import { RequestHandler } from 'express';
import createError from 'http-errors';
import { userFromJwt } from '../util/functions';

const tokenMiddleware: RequestHandler = (req, _res, nxt) => {
	try {
		let token = req.headers?.authorization;

		if (!token) return nxt(createError(401, 'No Bearer'));

		token = token.split(' ')[1];
		const { JWT_ENCRYPT: jwtSecret } = process.env;

		if (!jwtSecret) throw new Error('');

		const decodedToken = userFromJwt(token);

		if (decodedToken == null) return nxt(createError(401, 'No Token'));

		req.user = decodedToken;
		return nxt();
	} catch (err) {
		let msg = 'Unknown Error';

		if (typeof err === 'string') msg = err;
		else if (err instanceof Error) msg = err.message;

		nxt(createError(401, msg));
		return undefined;
	}
};

export default tokenMiddleware;

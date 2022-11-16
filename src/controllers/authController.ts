import createError from 'http-errors';
import { RequestHandler } from "express"

export const register: RequestHandler = async (req, _res, nxt) => {
	try {
		const { username, password } = req.body

		if (!username || !password) throw new Error("username and password are required")
		return undefined
	} catch (err) {
		let msg = 'Unknown Error';

		if (typeof err === 'string') msg = err;
		else if (err instanceof Error) msg = err.message;

		nxt(createError(400, msg));
		return undefined;
	}
}


export default { register }

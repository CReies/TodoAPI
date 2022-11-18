import type { NextFunction, Request, Response } from 'express';
import type { HttpError } from 'http-errors';

const errorMiddleware = (err: HttpError, _req: Request, res: Response, _nxt: NextFunction): void => {
	res
		.status(err.status ?? 500)
		.json({ error: { status: err.status ?? 500, message: err.message } })
		.end();
};

export default errorMiddleware;

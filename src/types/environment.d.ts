import { IUser } from './types';

export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string | number;
			MONGO_URI: string;
			JWT_ENCRYPT: string;
		}
	}
}
declare global {
	namespace Express {
		interface Request {
			user: IUser;
		}
	}
}

declare module 'jsonwebtoken' {
	export interface UserFromJwtPayload extends IUser {}
}

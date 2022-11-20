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
	module Express {
		interface Request {
			user: IUser;
		}
	}
}
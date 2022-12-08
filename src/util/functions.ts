import jwt from 'jsonwebtoken';
import { IUser } from '../types/types';

export const userFromJwt = (jwToken: string): IUser | undefined => {
	try {
		const user = <jwt.UserFromJwtPayload>jwt.verify(jwToken, process.env.JWT_ENCRYPT || 'NO_SECRET');

		return user;
	} catch (e) {
		console.error(e);
		return undefined;
	}
};

import { v4 } from 'uuid';
import { Schema, model } from 'mongoose';
import { IUser } from '../types/types';

const userSchema = new Schema<IUser>({
	_id: { type: String, default: v4(), auto: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	tasks: [{ type: String, ref: 'Task' }],
});

const User = model('User', userSchema);

export default User;

export interface ITask {
	_id: string;
	title: string;
	description?: string;
	category: ICategory['_id'];
	user: IUser['_id'];
	completed: boolean;
	createdAt: Date;
}

export interface ICategory {
	_id: string;
	title: string;
	description?: string;
	color: string;
	createdAt: Date;
	tasks: Array<ITask['_id']>;
}

export interface IUser {
	_id: string;
	username: string;
	password: string;
}

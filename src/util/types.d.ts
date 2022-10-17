export interface ITask {
	_id: string;
	title: string;
	description?: string;
	category: ICategory['id'];
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

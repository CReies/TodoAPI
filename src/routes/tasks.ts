import express from 'express';
import {
	getAll,
	getOne,
	create,
	update,
	deleteOne,
	complete,
	uncomplete,
	search,
} from '../controllers/taskController';
const router = express.Router();

router.get('/', getAll);

router.get('/:id', getOne);

router.get('/search/:search', search);

router.post('/', create);

router.put('/:id', update);

router.put('/complete/:id', complete);

router.put('/uncomplete/:id', uncomplete);

router.delete('/:id', deleteOne);

export default router;

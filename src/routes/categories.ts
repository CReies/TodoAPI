import express from 'express';
import {
	getAll,
	getOne,
	create,
	update,
	deleteOne,
	search,
} from '../controllers/categoryController';
const router = express.Router();

router.get('/', getAll);

router.get('/:id', getOne);

router.get('/search/:search', search);

router.post('/', create);

router.put('/:id', update);

router.delete('/:id', deleteOne);

export default router;

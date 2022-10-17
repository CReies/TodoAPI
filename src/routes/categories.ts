import express from 'express';
import * as categoryController from '../controllers/categoryController';
import type { RequestHandler } from 'express';

const router = express.Router();

router.get('/', categoryController.getAll as RequestHandler);

router.get('/:id', categoryController.getOne as RequestHandler);

router.get('/search/:search', categoryController.search as RequestHandler);

router.post('/', categoryController.create as RequestHandler);

router.put('/:id', categoryController.update as RequestHandler);

router.delete('/:id', categoryController.deleteOne as RequestHandler);

export default router;

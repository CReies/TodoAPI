import express from 'express';
import * as taskController from '../controllers/taskController';
import type { RequestHandler } from 'express';

const router = express.Router();

router.get('/', taskController.getAll as RequestHandler);

router.get('/:id', taskController.getOne as RequestHandler);

router.get('/search/:search', taskController.search as RequestHandler);

router.post('/', taskController.create as RequestHandler);

router.put('/:id', taskController.update as RequestHandler);

router.put('/complete/:id', taskController.complete as RequestHandler);

router.put('/uncomplete/:id', taskController.uncomplete as RequestHandler);

router.delete('/:id', taskController.deleteOne as RequestHandler);

export default router;

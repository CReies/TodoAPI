const express = require('express');
const router = express.Router();
const {
	getAll,
	getOne,
	create,
	update,
	deleteOne,
	complete,
	uncomplete,
	search,
} = require('../controllers/taskController');

router.get('/', getAll);

router.get('/:id', getOne);

router.get('/search/:search', search);

router.post('/', create);

router.put('/:id', update);

router.put('/complete/:id', complete);

router.put('/uncomplete/:id', uncomplete);

router.delete('/:id', deleteOne);

module.exports = router;

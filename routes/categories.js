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

router.delete('/:id', deleteOne);

module.exports = router;

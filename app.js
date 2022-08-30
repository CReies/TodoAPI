const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');

require('dotenv').config();

const app = express();

// Middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connect
require('./db/connection')();

// Routes
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/categories', require('./routes/categories'));

// Catch 404 and forward to error handler
app.use((_req, _res, next) => {
	next(createError(404));
});

module.exports = app;

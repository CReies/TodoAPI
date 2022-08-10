const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config();

const app = express();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// DB connect
require('./db/connection')();

// Routes

// Catch 404 and forward to error handler
app.use(function (_req, _res, next) {
	next(createError(404));
});

module.exports = app;

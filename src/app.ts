import createError from 'http-errors';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import connection from './db/connection';
import * as routers from './routes/index';
import errorMiddleware from './middlewares/errorMiddleware';

dotenv.config();

const app = express();

// Middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static('../app/build'));

// DB connect
void connection();

// Routes
app.use('/api/tasks', routers.tasksRouter);
app.use('/api/categories', routers.categoriesRouter);

// Catch 404 and forward to error handler
app.use((_req, _res, next) => {
	next(createError(404));
});

// Error Handler
app.use(errorMiddleware);

export default app;

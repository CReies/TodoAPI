import tokenMiddleware from './middlewares/tokenMiddleware';
import cors from 'cors';
import 'dotenv-safe/config';
import express from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import connection from './db/connection';
import errorMiddleware from './middlewares/errorMiddleware';
import * as routers from './routes/index';

const app = express();

// Middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static('../app/build'));

// DB connect
void connection();

// Routes
app.use('/api/v1/tasks', tokenMiddleware, routers.tasksRouter);
app.use('/api/v1/categories', tokenMiddleware, routers.categoriesRouter);
app.use('/api/v1/auth', routers.authRouter);

// Catch 404 and forward to error handler
app.use((_req, _res, next) => {
	next(createError(404));
});

// Error Handler
app.use(errorMiddleware);

export default app;

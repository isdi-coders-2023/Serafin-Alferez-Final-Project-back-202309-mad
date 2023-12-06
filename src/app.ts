import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createDebug from 'debug';
// T import { errorMiddleware } from './middleware/error.middleware.js';
// import { carsRouter } from './router/cars.router.js';
import { usersRouter } from './router/user.router.js';


const debug = createDebug('FP:app');

export const app = express();
debug('Starting');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));

// Tapp.use('/cars', carsRouter);
app.use('/users', usersRouter);

// Tapp.use(errorMiddleware);

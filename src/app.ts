import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createDebug from 'debug';
// import { errorMiddleware } from './middleware/error.middleware.js';
import { carsRouter } from './router/cars.router.js';
import { usersRouter } from './router/user.router.js';


const debug = createDebug('FP:app');

export const app = express();
debug('Starting');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));

// app.use('/', (_req, res, _next) => {
//   res.send('Server FP is ready')
// });

app.use('/cars', carsRouter);
app.use('/users', usersRouter);

// app.use(errorMiddleware);

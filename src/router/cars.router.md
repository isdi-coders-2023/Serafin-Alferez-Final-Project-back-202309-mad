import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
// Iimport { FileInterceptor } from '../middleware/file.interceptor.js';
import { CarsMongoRepo } from '../repos/cars/cars.mongo.repo.js';
import { CarsController } from '../controller/cars.controller.js';

const debug = createDebug('FP:cars:router');

export const carsRouter = createRouter();
debug('Starting');

// I const fileInterceptor = new FileInterceptor();
const repo = new CarsMongoRepo();
const controller = new CarsController(repo);
const interceptor = new AuthInterceptor()

carsRouter
.get('/', controller.getAll.bind(controller));
carsRouter
.get('/:id', controller.getById.bind(controller));
carsRouter
.post(
  '/',
  interceptor.authorization.bind(interceptor),
  fileInterceptor.singleFileStore('picture').bind(fileInterceptor),
  controller.create.bind(controller)
);
carsRouter
.patch(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.authenticationCars.bind(interceptor),
  fileInterceptor.singleFileStore('picture').bind(fileInterceptor),
  controller.update.bind(controller)
);

carsRouter
.delete(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.authenticationCars.bind(interceptor),
  controller.delete.bind(controller)
)

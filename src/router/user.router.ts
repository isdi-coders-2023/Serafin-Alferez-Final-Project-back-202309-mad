import { UsersController } from "../controller/users.controller.js";

import { UsersMongoRepo } from "../repos/users/user.mongo.repo.js";
import createDebug from 'debug';
import { Router as createRouter } from 'express';


const debug = createDebug('FP:users:router');

export const usersRouter = createRouter();
debug('Starting');


const repo = new UsersMongoRepo();
const controller = new UsersController(repo);


usersRouter.get('/', controller.getAll.bind(controller));

usersRouter.post(
  '/register',
  controller.create.bind(controller)
);
usersRouter.post('/login', controller.login.bind(controller));


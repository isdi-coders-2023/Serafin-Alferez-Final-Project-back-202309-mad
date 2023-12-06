import { UsersController } from "../controller/users.controller.js";
// T import { AuthInterceptor } from "../middleware/auth.interceptor.js";
import { UsersMongoRepo } from "../repos/users/user.mongo.repo.js";
import createDebug from 'debug';
import { Router as createRouter } from 'express';


const debug = createDebug('FP:users:router');

export const usersRouter = createRouter();
debug('Starting');

// Tconst fileInterceptor = new FileInterceptor();
const repo = new UsersMongoRepo();
const controller = new UsersController(repo);
// Tconst interceptor = new AuthInterceptor();

usersRouter.get('/', controller.getAll.bind(controller));
usersRouter.post(
  '/register',
  controller.create.bind(controller)
);
usersRouter.post('/login', controller.login.bind(controller));
// T usersRouter.patch('/login', 
//   interceptor.authorization.bind(interceptor), 
//   controller.login.bind(controller)
// );   // Hacemos login with token

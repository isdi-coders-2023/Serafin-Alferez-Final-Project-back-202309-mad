import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repos/users/user.mongo.repo.js';
import { Auth } from '../services/auth.js';
import { Controller } from './controller.js';
import { User } from '../entities/user.js';

const debug = createDebug('FP:users:controller');

export class UsersController extends Controller<User> {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: UsersMongoRepo) {
    super(repo);
    debug('Instantiated');
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = req.body.userId
        ? await this.repo.getById(req.body.userId)
        : await this.repo.login(req.body);
      const data = {
        user: result,
        token: Auth.signJWT({
          id: result.id,
          email: result.email
        })
      }
      debug('login controller', data)
      res.status(202);
      res.statusMessage = 'Accepted';
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

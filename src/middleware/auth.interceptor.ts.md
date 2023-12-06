import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error.js';
import { Auth } from '../services/auth.js';
// T import { CarsMongoRepo } from '../repos/cars/cars.mongo.repo.js';


const debug = createDebug('FP:auth:interceptor');

export class AuthInterceptor {
  constructor() {
    debug('Instantiated');
  }

  authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenHeader = req.get('Authorization');
      if (!tokenHeader?.startsWith('Bearer'))
        throw new HttpError(401, 'Unauthorized');
      const token = tokenHeader.split(' ')[1];
      const tokenPayload = Auth.verifyAndGetPayload(token);
      req.body.userId = tokenPayload.id;
      debug('req.body.id', req.body.userId);
      next();
    } catch (error) {
      next(error);
    }
}

// T async authenticationCars(req: Request, res: Response, next: NextFunction){
//   try {
//     const userID = req.body.userId;
//     const carsID = req.params.id;
//     const repoCars = new CarsMongoRepo();
//     const car = await repoCars.getById(carsID);
//     if (car.author.id !== userID)
//     throw new HttpError(401, 'Unauthorized', 'User not valid');
//   next();
//   } catch (error) {
//     next (error);
//     }
//   }
}

import { AuthInterceptor } from './auth.interceptor.js';
import { HttpError } from '../types/http.error.js';
import { Auth } from '../services/auth';
import { NextFunction, Request, Response } from 'express';
import { CarsMongoRepo } from '../repos/cars/cars.mongo.repo.js';



jest.mock('../services/auth.js');
jest.mock('../repos/cars/cars.mongo.repo.js');

describe('Given AuthInterceptor class', () => {
  let authInterceptor: AuthInterceptor;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    authInterceptor = new AuthInterceptor();
    req = {} as Request;
    res = {} as Response;
    next = jest.fn() as NextFunction;
  });

  describe('When we use authorization method', () => {
    beforeEach(() => {
      req = {
        get: jest.fn(() => 'Bearer validToken'),
        body: {},
      } as unknown as Request;
    });

    test('Then should set userId and tokenRole on the request body when Authorization header is valid', async () => {
      const mockPayload = { id: 'userId' };
      (Auth.verifyAndGetPayload as jest.Mock).mockReturnValue(mockPayload);

      authInterceptor.authorization(req, res, next);

      expect(Auth.verifyAndGetPayload).toHaveBeenCalledWith('validToken');
      expect(mockPayload).toStrictEqual({ id: 'userId' });
      expect(next).toHaveBeenCalled();
    });

    test('Then should call next with an HttpError when Authorization header is missing or invalid', async () => {
      req.get = jest.fn().mockReturnValue(null);
      authInterceptor.authorization(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(HttpError));
    });
  });

  describe('When we use authenticationCars method', () => {
    beforeEach(() => {
      req.body = { userId: 'userId' };
      req.params = { id: 'carId' };
    });

    test('Then should call next when the user is the author of the car', async () => {
      const mockCar = { author: { id: 'userId' } };
      const mockCarsMongoRepoInstance = { getById: jest.fn().mockResolvedValue(mockCar) };

      jest.spyOn(CarsMongoRepo.prototype, 'getById').mockImplementation(mockCarsMongoRepoInstance.getById);

      await authInterceptor.authenticationCars(req, res, next);

      expect(mockCarsMongoRepoInstance.getById).toHaveBeenCalledWith('carId');
      expect(next).toHaveBeenCalled();
    });

    test('Then should call next with an HttpError when the user is not the author of the car', async () => {
      const mockCar = { author: { id: 'otherUserId' } };
      const mockCarsMongoRepoInstance = { getById: jest.fn().mockResolvedValue(mockCar) };

      jest.spyOn(CarsMongoRepo.prototype, 'getById').mockImplementation(mockCarsMongoRepoInstance.getById);

      await authInterceptor.authenticationCars(req, res, next);

      expect(mockCarsMongoRepoInstance.getById).toHaveBeenCalledWith('carId');
      expect(next).toHaveBeenCalledWith(expect.any(HttpError));
    });

    test('Then should call next with an HttpError when there is an error fetching the car', async () => {
      const mockCarsMongoRepoInstance = { getById: jest.fn().mockRejectedValue(new HttpError(500, 'Database error')) };

      jest.spyOn(CarsMongoRepo.prototype, 'getById').mockImplementation(mockCarsMongoRepoInstance.getById);

      await authInterceptor.authenticationCars(req, res, next);

      expect(mockCarsMongoRepoInstance.getById).toHaveBeenCalledWith('carId');
      expect(next).toHaveBeenCalledWith(expect.any(HttpError));
    });
  });
});

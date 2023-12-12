import { AuthInterceptor } from './auth.interceptor.js';
import { HttpError } from '../types/http.error.js';
import { Auth } from '../services/auth';
import { NextFunction, Request, Response } from 'express';
import { CarsMongoRepo } from '../repos/cars/cars.mongo.repo.js';



jest.mock('../services/auth.js');

describe('Given AuthInterceptor class', () => {
  let authInterceptor: AuthInterceptor;

  beforeEach(() => {
    authInterceptor = new AuthInterceptor();
  });

  describe('When we use authorization method', () => {
    test('Then should set userId and tokenRole on the request body when Authorization header is valid', async () => {
      const req = {
        get: jest.fn(() => 'Bearer validToken'),
        body: {},
      } as unknown as Request;
      const res = {} as Response;
      const next = jest.fn() as NextFunction;

      const mockPayload = { id: 'userId' };
      (Auth.verifyAndGetPayload as jest.Mock).mockReturnValue(mockPayload);

      authInterceptor.authorization(req, res, next);

      expect(Auth.verifyAndGetPayload).toHaveBeenCalledWith('validToken');
      expect(mockPayload).toStrictEqual({ id: 'userId' });
      expect(next).toHaveBeenCalled();
    });
    test('Then should call next with an HttpError when Authorization header is missing or invalid', async () => {
      const req = {
        get: jest.fn().mockReturnValue(null),
        body: {},
      } as unknown as Request;
      const res = {} as Response;
      const next = jest.fn() as NextFunction;
      authInterceptor.authorization(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(HttpError));
    });
  });

  
  jest.mock('../repos/cars/cars.mongo.repo.js');

  describe('Dada la clase AuthInterceptor', () => {
    let authInterceptor: AuthInterceptor;
  
    beforeEach(() => {
      authInterceptor = new AuthInterceptor();
    });
  
    describe('Cuando usamos el método authenticationCars', () => {
      test('Entonces debería llamar a next cuando el usuario es el autor del automóvil', async () => {
        const req = {
          body: { userId: 'userId' },
          params: { id: 'carId' },
        } as unknown as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
  
        const mockCar = {
          author: { id: 'userId' },
        };
  
        const instanciaMockCarsMongoRepo = {
          getById: jest.fn().mockResolvedValue(mockCar),
        };
  
        jest.spyOn(CarsMongoRepo.prototype, 'getById').mockImplementation(instanciaMockCarsMongoRepo.getById);
  
        await authInterceptor.authenticationCars(req, res, next);
  
        expect(instanciaMockCarsMongoRepo.getById).toHaveBeenCalledWith('carId');
        expect(next).toHaveBeenCalled();
      });
  
      test('Entonces debería llamar a next con un HttpError cuando el usuario no es el autor del automóvil', async () => {
        const req = {
          body: { userId: 'userId' },
          params: { id: 'carId' },
        } as unknown as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
  
        const mockCar = {
          author: { id: 'otherUserId' },
        };
  
        const instanciaMockCarsMongoRepo = {
          getById: jest.fn().mockResolvedValue(mockCar),
        };
  
        jest.spyOn(CarsMongoRepo.prototype, 'getById').mockImplementation(instanciaMockCarsMongoRepo.getById);
  
        await authInterceptor.authenticationCars(req, res, next);
  
        expect(instanciaMockCarsMongoRepo.getById).toHaveBeenCalledWith('carId');
        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
      });
  
      test('Entonces debería llamar a next con un HttpError cuando hay un error al obtener el automóvil', async () => {
        const req = {
          body: { userId: 'userId' },
          params: { id: 'carId' },
        } as unknown as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
  
        const instanciaMockCarsMongoRepo = {
          getById: jest.fn().mockRejectedValue(new HttpError(500, 'Database error')),
        };
  
        jest.spyOn(CarsMongoRepo.prototype, 'getById').mockImplementation(instanciaMockCarsMongoRepo.getById);
  
        await authInterceptor.authenticationCars(req, res, next);
  
        expect(instanciaMockCarsMongoRepo.getById).toHaveBeenCalledWith('carId');
        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
      });
    });
  });
});

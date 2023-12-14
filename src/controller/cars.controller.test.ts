import { NextFunction, Request, Response } from 'express';
import { CarsController } from './cars.controller';
import { CarsMongoRepo } from '../repos/cars/cars.mongo.repo';
import { Car } from '../entities/car';

describe('Given CarsController Class...', () => {
  beforeEach(() => {
    const mockRepo = {
      create: jest.fn().mockResolvedValue({}),
      getById: jest.fn().mockResolvedValue({}),
      getAll: jest.fn().mockResolvedValue({}),
      delete: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
    } as unknown as CarsMongoRepo;
    controller = new CarsController(mockRepo);
  });
  
  let controller: CarsController;
  let mockRequest: Request;

  let mockResponse: Response;
  let mockNext: NextFunction;

  beforeAll(() => {
    mockRequest = {
      body: {},
      params: {},
    } as unknown as Request;

    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    } as unknown as Response;
    mockNext = jest.fn();
  });



  describe('When we create a new car', () => {
    test('Then the create method should create a new car with the proper info and the right image...', async () => {
      const mockRequest = {
        file: {
          path: 'valid/path/to/image.jpg',
        },
        body: {},
      } as unknown as Request;

      const mockNext = jest.fn();
      const mockRepo = {
        create: jest.fn(),
      } as unknown as CarsMongoRepo
    ;

      const controller = new CarsController(mockRepo);
      const mockImageData = { url: 'https://example.com/image.jpg' };
      const mockCloudinaryService = {
        uploadImage: jest.fn().mockResolvedValue(mockImageData),
      };

      controller.cloudinaryService = mockCloudinaryService;
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockCloudinaryService.uploadImage).toHaveBeenCalledWith(
        mockRequest.file?.path
      );
      expect(mockRequest.body.picture).toBe(mockImageData);
    });

    test('Then delete should...', async () => {
      await controller.delete(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.statusMessage).toBe('No Content');
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });
  });

  describe('When we instantiate it with errors', () => {
    let mockError: Error;
    beforeEach(() => {
      mockError = new Error('Invalid multer file');
      const mockRepo = {
        create: jest.fn().mockRejectedValue(mockError),
        delete: jest.fn().mockRejectedValue(mockError),
        update: jest.fn().mockRejectedValue(mockError),
      } as unknown as CarsMongoRepo
    ;

      controller = new CarsController(mockRepo);
    });

    test('Then create should throw an error', async () => {
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    test('Then update should throw an error', async () => {
      await controller.update(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    test('Then delete should ...', async () => {
      await controller.delete(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('Given CarsController Class...', () => {
  
    const mockCar = {

    } as unknown as Car

    const mockRepo = {
      update: jest.fn().mockResolvedValue(mockCar),
    } as unknown as CarsMongoRepo;
   
  
    
      const mockRequest = {
        body: {author: {id: '1'}, userId: '1'},
        params: {id: '1'},
      } as unknown as Request;
  
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn() as NextFunction;
    
  
    controller = new CarsController(mockRepo);
  
    describe('When we update an existing car', () => {
      test('Then the update method should update the car with the provided information', async () => {
    
        const mockUpdatedCar = { /* datos actualizados del carro simulado */ };
        
        await controller.update(mockRequest, mockResponse, mockNext);
        CarsMongoRepo.prototype.update = mockRepo.update
        expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedCar);
      });
    });
    
  describe('When we create a new car', () => {
    test('Then the create method should create a new car with the proper info and the right image...', async () => {
      const mockRequestWithFile = {
        file: {
          path: 'valid/path/to/image.jpg',
        },
        body: {},
      } as unknown as Request;

      const mockImageData = { url: 'https://example.com/image.jpg' };
      const mockCloudinaryService = {
        uploadImage: jest.fn().mockResolvedValue(mockImageData),
      };

      controller.cloudinaryService = mockCloudinaryService;

      await controller.create(mockRequestWithFile, mockResponse, mockNext);
      expect(mockCloudinaryService.uploadImage).toHaveBeenCalledWith(
        mockRequestWithFile.file?.path
      );
      expect(mockRequestWithFile.body.picture).toBe(mockImageData);
    });
});

});
  
});

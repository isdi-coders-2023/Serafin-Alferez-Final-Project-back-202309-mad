import { Car } from "../../entities/car";
import { UserModel } from "../users/user.mongo.model";
import { UsersMongoRepo } from "../users/user.mongo.repo";
import { CarModel } from "./cars.mongo.model";
import { CarsMongoRepo } from "./cars.mongo.repo";

describe('Given carsmongorepo', () => {
  let carsRepo: CarsMongoRepo;

  describe('When we instantiate it without errors', () => {
    const exec = jest.fn().mockResolvedValue({});

    CarModel.findByIdAndUpdate = jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({exec})
  });
    beforeEach(() => {
      carsRepo = new CarsMongoRepo();
    });

    test('Then it should execute getAll ', async () => {
      CarModel.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({exec}),
    });
      const result = await carsRepo.getAll();
      expect(exec).toHaveBeenCalled();
      expect(result).toStrictEqual({})
    })

    test('Then is should execute getById', async () => {
      CarModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({exec}), 
    });
      const result =carsRepo.getById('');
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    })

    test('Then it should exectue create', async () => {
      CarModel.create = jest.fn().mockResolvedValue('Test');
      UsersMongoRepo.prototype.getById = jest.fn().mockResolvedValue({ cars: []});
      UsersMongoRepo.prototype.update = jest.fn();
      const result = await carsRepo.create({ author: {} } as Omit<Car, 'id'>);
      expect(result).toBe('Test');
    });

    test('Then is should execute delete ', async () => {
      const id = 'testId';
      const exec = jest.fn().mockResolvedValue({});
      CarModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec,
      });

      UserModel.findByIdAndUpdate = jest.fn().mockReturnValue({exec});
      await carsRepo.delete(id);

      expect(CarModel.findOneAndDelete).toHaveBeenLastCalledWith(id);
      expect(UserModel.findByIdAndDelete).toHaveBeenCalled()
    });
  });

  // describe('When we instantiate ir with errors', () => {
  //   const exec = jest.fn().mockResolvedValue(null);
  //   beforeEach(() => {
  //     CarModel.findById = jest.fn().mockReturnValue({
  //       populate: jest.fn().mockReturnValue({
  //         exec,
  //       })
  //     });
  //     CarModel.findByIdAndUpdate = jest.fn().mockReturnValue({
  //       populate: jest.fn().mockReturnValue({
  //         exec,
  //       }),
  //     });
  //     carsRepo = new CarsMongoRepo();
  //   })

  //   test('Then getById should throw an error', async () => {
  //     expect(carsRepo.getById('')).rejects.toThrow();
  //   });
  //   test('Then update should throw an error', async () => {
  //     expect(carsRepo.update('', {model: 'Ford'})).rejects.toThrow();

  //   });

  // });
})

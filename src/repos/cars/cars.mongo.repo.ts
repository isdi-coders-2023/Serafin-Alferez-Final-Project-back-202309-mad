import createDebug from 'debug';
import { Car } from '../../entities/car.js';
import { CarModel } from './cars.mongo.model.js';
import { HttpError } from '../../types/http.error.js';
import { UsersMongoRepo } from '../users/user.mongo.repo.js';
import { Repository } from '../repo.js';
import mongoose from 'mongoose';


const debug = createDebug('FT:hobbies:mongo:repo');

export class CarsMongoRepo implements Repository<Car> {
  userRepo: UsersMongoRepo;
  constructor() {
    this.userRepo = new UsersMongoRepo();
    debug('Instantiated');
  }

  async getAll(): Promise<Car[]> {
    const result = await CarModel.find()
      .populate('author', {
        cars: 0,
      })
      .exec();
    return result;
  }

  async getById(id: string): Promise<Car> {
    const result = await CarModel.findById(id)
    .populate('author', {
      cars: 0,
    })
    .exec();
    if (!result) throw new HttpError(404, 'Not found', 'GetById is not possible');
    return result;
  }

  async create(newCar: Omit<Car, 'id'>): Promise<Car> {
    const userID = newCar.author.id;
    const user = await this.userRepo.getById(userID);
    const result: Car = await CarModel.create({ ...newCar, author: userID});
    user.cars.push(result);
    await this.userRepo.update(userID, user);
    return result;
  }

  async update(
    id: string,
    updatedItem: Partial<Car>
  ): Promise<Car> {
    const result = await CarModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    })
      .populate('author', { cars: 0 })
      .exec();

    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }


  async delete(id: string): Promise<void> {
    const result = await CarModel.findByIdAndDelete(id)
    .populate('author', {
      cars: 0,
    })
    .exec();
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }

    const userID = result.author.id;
    const user = await this.userRepo.getById(userID);
    user.cars = user.cars.filter((item) => {
      const itemID = item as unknown as mongoose.mongo.ObjectId;
      return itemID.toString() !== id;
    });
    await this.userRepo.update(userID, user)
  }
} 



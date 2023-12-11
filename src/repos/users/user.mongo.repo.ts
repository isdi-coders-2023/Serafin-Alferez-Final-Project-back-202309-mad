import createDebug from 'debug';
import { Repository } from '../repo.js';
import { LoginUser, User} from '../../entities/user.js';

import { Auth } from '../../services/auth.js';
import { UserModel } from './user.mongo.model.js';
import { HttpError } from '../../types/http.error.js';

const debug = createDebug('FP:users:mongo:repo');

export class UsersMongoRepo implements Repository<User> {
  constructor() {
    debug('Instantiated');
  }

  async create(newItem: Omit<User, 'id'>): Promise<User> {
    newItem.passwd = await Auth.hash(newItem.passwd);
    const result: User = await UserModel.create(newItem);
    return result;
  }

  async login(LoginUser: LoginUser): Promise<User> {

    const result = await UserModel.findOne({ email: LoginUser.email }).exec();
    if (!result || !(await Auth.compare(LoginUser.passwd, result.passwd)))
      throw new HttpError(401, 'Unauthorized');
    return result;
  }

  async getAll(): Promise<User[]> {
    const result = await UserModel.find().exec();
    return result;
  }

  // async getListOfCars(id: string): Promise<Car[]> {
  //   const result = await UserModel.find({ id })
  //     .populate('cars')
  //     .exec();
  //   const listOfCars = result[0].cars
  //   return listOfCars
  // }

  async getById(id: string): Promise<User> {
    const result = await UserModel.findById(id).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById nos possible');
    return result;
  }

  async update(id: string, updatedItem: Partial<User>): Promise<User> {
    const result = await UserModel.findByIdAndUpdate(id, updatedItem,{
      new: true,
    }).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await UserModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }

  // async search({
  //   key,
  //   value,
  // }: {
  //   key: keyof User;
  //   value: any;
  // }): Promise<User[]> {
  //   const result = await UserModel.find({ [key]: value })
  //     .populate('author', {
  //       notes: 0,
  //     })
  //     .exec();

  //   return result;
  // }  
}

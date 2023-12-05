import { UsersMongoRepo } from './user.mongo.repo.js';
import { Auth } from '../../services/auth.js';
import { LoginUser, User } from '../../entities/user.js';
import { UserModel } from './user.mongo.model.js';

jest.mock('./user.mongo.model.js');
jest.mock('../../services/auth.js');

describe('GivenUsersMongoRepo', () => {
  Auth.hash = jest.fn();
  Auth.compare = jest.fn().mockResolvedValue(true);
  let repo: UsersMongoRepo;
  describe('When we instantiate it without errors', () => {
    const exec = jest.fn().mockResolvedValue('Test');
    beforeEach(() => {
      const mockQueryMethod = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
        exec,
      });
      UserModel.find = mockQueryMethod;
      UserModel.findById = mockQueryMethod;
      UserModel.findOne = mockQueryMethod;
      UserModel.findByIdAndUpdate = mockQueryMethod;
      UserModel.findByIdAndDelete = mockQueryMethod;
      UserModel.create = jest.fn().mockResolvedValue('Test');
      repo = new UsersMongoRepo();
    });

    test('Then it should execute create', async () => {
      const result = await repo.create({} as Omit<User, 'id'>);
      expect(Auth.hash).toHaveBeenCalled();
      expect(UserModel.create).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute login', async () => {
      const result = await repo.login({ email: '' } as LoginUser);
      expect(UserModel.findOne).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute getAll', async () => {
      const result = await repo.getAll();
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute getById', async () => {
      const result = await repo.getById('');
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });


    test('Then it should execute update', async () => {
      const result = await repo.update('1', { id: '2' });
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute delete', async () => {
      await repo.delete('1');
      expect(exec).toHaveBeenCalled();
    });
  });

});

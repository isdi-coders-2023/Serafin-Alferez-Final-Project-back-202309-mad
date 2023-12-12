/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver',
  coveragePathIgnorePatterns: [
    'src/repos/users/user.mongo.model.ts',
    'src/app.ts',
    'src/index.ts',
    'src/repos/repo.ts',
    'src/router/user.router.ts',
    'src/router/cars.router.ts',
    'src/repos/cars/cars.mongo.model.ts',
    'src/repos/cars/cars.mongo.repo.ts'
  ],
};

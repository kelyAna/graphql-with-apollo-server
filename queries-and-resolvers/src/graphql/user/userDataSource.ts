import { RESTDataSource } from 'apollo-datasource-rest';
import { makeUserDataLoader } from '../loaders/userLoader';
import * as dotenv from 'dotenv';
import { UserInput } from '../types';
import { createUserFn, deleteUserFn, updateUserFn } from './user-repository';
dotenv.config();

export class UsersApi extends RESTDataSource {
  private dataLoader: ReturnType<typeof makeUserDataLoader>

  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/users/';
    this.dataLoader = makeUserDataLoader(this.getUsers.bind(this));
  }

  async getUsers(urlParams = {}) {
    return this.get('', urlParams, {
      cacheOptions: {
        ttl: 60,
      },
    });
  }

  async getUser(id: string) {
    return this.get(id, undefined, {
      cacheOptions: {
        ttl: 60,
      },
    });
  }

  async createUser(userData: UserInput) {
    return createUserFn(userData, this)
  }

  async deleteUser(userId: string) {
    return deleteUserFn(userId, this)
  }

  async updateUser(userId: string, userData: UserInput) {
    return updateUserFn(userId, userData, this);
  }

  batchLoadById(id: string) {
    return this.dataLoader.load(id);
  }
}

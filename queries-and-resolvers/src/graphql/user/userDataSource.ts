import { RESTDataSource } from 'apollo-datasource-rest';
import { makeUserDataLoader } from '../loaders/userLoader';

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

  batchLoadById(id: string) {
    return this.dataLoader.load(id);
  }
}

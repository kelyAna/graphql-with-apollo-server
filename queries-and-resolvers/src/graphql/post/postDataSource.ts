import { RESTDataSource } from 'apollo-datasource-rest'
import { makePostDataLoader } from '../loaders/postLoader'

export class PostsApi extends RESTDataSource {
  private dataLoader: ReturnType<typeof makePostDataLoader>

  constructor() {
    super()
    this.baseURL = process.env.API_URL + '/posts/'
    this.dataLoader = makePostDataLoader(this.getPosts.bind(this))
  }

  async getPosts(urlParams = {}) {
    return this.get('', urlParams, {
      cacheOptions: {
        ttl: 60,
      },
    })
  }

  async getPost(id: string) {
    return this.get(id, undefined, {
      cacheOptions: {
        ttl: 60,
      },
    })
  }

  async createPost(postData) {
    
  }

  batchLoadByUserId(id: string) {
    return this.dataLoader.load(id)
  }
}

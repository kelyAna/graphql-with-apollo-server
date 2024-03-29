import { RESTDataSource } from 'apollo-datasource-rest'
import { makePostDataLoader } from '../loaders/postLoader'
import * as dotenv from 'dotenv'
import { createPostFn, deletePostFn, updatePostFn } from './post-repository'
import { PostInput } from '../types'
dotenv.config()

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
        ttl: 0,
      },
    })
  }

  async getPost(id: string) {
    return this.get(id, undefined, {
      cacheOptions: {
        ttl: 0,
      },
    })
  }

  async createPost(postData: PostInput) {
    return createPostFn(postData, this)
  }

  async deletePost(postId: string) {
    return deletePostFn(postId, this)
  }

  async updatePost(postId: string, postData: PostInput) {
    return updatePostFn(postId, postData, this)
  }

  batchLoadByUserId(id: string) {
    return this.dataLoader.load(id)
  }
}

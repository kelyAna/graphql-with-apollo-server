import { AuthenticationError } from 'apollo-server-errors'
import { checkIsLoggedIn } from '../utils/checkIsLoggedIn'

const post = async (_, { id }, { dataSources }) => {
  const post = dataSources.postApi.getPost(id)
  return post
}

const posts = async (_, { input }, { dataSources, loggedUserId }) => {
  checkIsLoggedIn(loggedUserId)

  const posts = dataSources.postApi.getPosts(input)
  return posts
}

const createPost = async (_, { data }, { dataSources }) => {
  return dataSources.postApi.createPost(data)
}

const updatePost = async (_, { postId, data }, { dataSources }) => {
  return dataSources.postApi.updatePost(postId, data)
}

const deletePost = async (_, { postId }, { dataSources }) => {
  return dataSources.postApi.deletePost(postId)
}

const user = async ({ userId }, _, { dataSources }) => {
  return dataSources.userApi.batchLoadById(userId)
}

export const postResolvers = {
  Query: { post, posts },
  Mutation: { createPost, updatePost, deletePost },
  Post: { user },
}

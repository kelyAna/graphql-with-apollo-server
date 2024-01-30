import { ValidationError } from 'apollo-server-errors'
import { PostInput, UserDataSource } from '../types'
import { checkUserExists } from '../utils/checkUserExists'

export const createPostFn = async (postData, dataSource) => {
  const postInfo = await createPostInfo(postData, dataSource)
  const { title, body, userId } = postInfo

  if (!title || !body || !userId) {
    throw new ValidationError('You have to send title, body and userId')
  }

  return await dataSource.post('', { ...postInfo })
}

export const updatePostFn = async (postId: string, postData: PostInput, dataSource) => {
  if (!postId) {
    throw new ValidationError('Missing postId')
  }

  const { title, body, userId } = postData

  if (typeof title !== 'undefined') {
    if (!title) {
      throw new ValidationError('title missing')
    }
  }

  if (typeof body !== 'undefined') {
    if (!body) {
      throw new ValidationError('body missing')
    }
  }

  if (typeof userId !== 'undefined') {
    if (!userId) {
      throw new ValidationError('userId missing')
    }
    await checkUserExists(userId, dataSource)
  }

  return dataSource.patch(postId, { ...postData })
}

export const deletePostFn = async (postId: string, dataSource) => {
  if (!postId) throw new ValidationError('Missing postId')

  const deleted = await dataSource.delete(postId)
  return !!deleted
}

const createPostInfo = async (postData: PostInput, dataSource) => {
  const { title, body, userId } = postData

  await checkUserExists(userId, dataSource)

  const indexRefPost = await dataSource.get('', {
    _limit: 1,
    _sort: 'indexRef',
  })

  const indexRef = indexRefPost[0].indexRef + 1

  return {
    title,
    body,
    userId,
    indexRef,
    createdAt: new Date().toISOString(),
  }

}

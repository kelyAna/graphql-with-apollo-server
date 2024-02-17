import jwt from 'jsonwebtoken'
import { UsersApi } from './user/userDataSource'

const authorizeUser = async (req) => {
  const { headers } = req
  const { authorization } = headers

  try {
    const [_bearer, token] = authorization.split(' ')
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)

    const usersApi = new UsersApi()

    usersApi.initialize({
      context: undefined,
      cache: undefined,
    })
    const user = await usersApi.getUser(userId)

    if (user.token !== token) return ''

    return userId
  } catch (e) {
    return e
  }
}

export const context = ({ req }) => {
  const loggedUserId = authorizeUser(req)

  return {
    loggedUserId,
  }
}

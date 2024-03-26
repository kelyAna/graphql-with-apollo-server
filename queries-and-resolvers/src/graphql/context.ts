import jwt from 'jsonwebtoken'
import { UsersApi } from './user/userDataSource'

const verifyJwtToken = async (token) => {
  try {
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

const authorizeUserWithBearerToken = async (req) => {
  const { headers } = req
  const { authorization } = headers

  try {
    const [_bearer, token] = authorization.split(' ')
    return await verifyJwtToken(token)
  } catch (e) {
    return ''
  }
}

const cookieParser = (cookiesHeader) => {
  if (typeof cookiesHeader != 'string') return {}

  const cookies = cookiesHeader.split(/;\s*/)

  const parsedCookie = {}
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split('=')
    parsedCookie[key] = value
  }

  return JSON.parse(JSON.stringify(parsedCookie))
}

export const context = async ({ req, res }) => {
  let loggedUserId = await authorizeUserWithBearerToken(req)

  console.log(req.headers.cookie)

  if (!loggedUserId) {
    if (req.headers.cookie) {
      const { jwtToken } = cookieParser(req.headers.cookie)
      loggedUserId = await verifyJwtToken(jwtToken)
    }
  }
  return {
    loggedUserId,
    res,
  }
}

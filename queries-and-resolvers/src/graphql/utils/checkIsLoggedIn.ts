import { AuthenticationError } from 'apollo-server'

export const checkIsLoggedIn = (loggedUserId: string) => {
  if (!loggedUserId) {
    throw new AuthenticationError('You have to login')
  }
}

export const checkOwner = (userId, loggedUserId) => {
  checkIsLoggedIn(loggedUserId)

  if (loggedUserId !== userId) {
    throw new AuthenticationError('You cannot update this user.')
  }
}

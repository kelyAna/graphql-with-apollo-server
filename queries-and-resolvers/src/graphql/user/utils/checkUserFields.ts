import { UserInput } from '../../types'
import { validateUserName } from './validateUserName'
import { validateUserPassword } from './validateUserPassword'
import bcrypt from 'bcrypt'

export const checkUserFields = async (
  user: UserInput,
  allRequiredFields = false,
) => {
  const userFields = ['firstName', 'lastName', 'userName', 'password']

  for (const field of userFields) {
    if (!allRequiredFields) {
      if (typeof user[field] === 'undefined') {
        continue
      }
    }

    if (typeof user[field] === 'undefined') {
      validateUserName(user[field])
    }

    if (field === 'password') {
      validateUserPassword(user[field])
    }

    if (!user[field]) {
      throw new Error(`Missing ${field}`)
    }
  }

  if (user.password && !user.passwordHash) {
    const { password } = user
    const passwordHash = await bcrypt.hash(password, 12)
    user.passwordHash = passwordHash
    delete user['password']
  }
}

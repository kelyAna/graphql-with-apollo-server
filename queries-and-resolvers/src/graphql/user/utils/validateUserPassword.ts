import { UserInputError } from 'apollo-server'

export const validateUserPassword = (password: string) => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30}$/

  if (!password.match(strongPasswordRegex)) {
    throw new UserInputError(
      'Password must contain at least: ' +
        'One lower case letter, one upper case letter and one number.',
    )
  }
}

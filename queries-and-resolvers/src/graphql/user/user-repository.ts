import { ValidationError } from 'apollo-server-errors';
import { UserInput } from '../types';

export const createUserFn = async (userData: UserInput, dataSource) => {

  console.log(userData)
  try {
    checkUserFields(userData, true);

    const indexRefUser = await dataSource.get('', {
      _limit: 1,
      _sort: 'indexRef',
      _order: 'desc',
    });

    let indexRef = 1;

    if (indexRefUser.length > 0) {
      indexRef = indexRefUser[0].indexRef + 1;
    }

    const foundUser = await userExists(userData.userName, dataSource);

    if (foundUser) {
      throw new ValidationError(
        `userName ${userData.userName} has already been taken`,
      );
    }

    const newUser = {
      ...userData,
      indexRef,
      createdAt: new Date().toISOString(),
    };

    return dataSource.post('', newUser);
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
}
export const updateUserFn = async (userId: string, userData: UserInput, dataSource) => {
  checkUserFields(userData, false);

  if (!userId) throw new ValidationError('Missing userId');

  if (userData.userName) {
    const foundUser = await userExists(userData.userName, dataSource);

    if (typeof foundUser !== 'undefined' && foundUser.id !== userId) {
      throw new ValidationError(
        `userName ${userData.userName} has already been taken`,
      );
    }
  }

  return dataSource.patch(userId, { ...userData });
};

export const deleteUserFn = async (userId: string, dataSource) => {
  if (!userId) throw new ValidationError('Missing userId');

  return !!(await dataSource.delete(userId));
};

const userExists = async (userName: string, dataSource) => {
  const found = await dataSource.get('', {
    userName,
  });
  return found[0];
};

const validateUserName = (userName: string) => {
  const userNameRegExp = /^[a-z]([a-z0-9_.-]+)+$/gi;

  if (!userName.match(userNameRegExp)) {
    throw new ValidationError(`userName must match ${userNameRegExp}`);
  }
};

const checkUserFields = (user: UserInput, allFieldsRequired = false) => {
  const userFields = ['firstName', 'lastName', 'userName'];

  for (const field of userFields) {
    if (!allFieldsRequired) {
      if (typeof user[field] === 'undefined') {
        continue;
      }
    }

    if (field === 'userName') {
      validateUserName(user[field]);
    }

    if (!user[field]) {
      throw new Error(`Missing ${field}`);
    }
  }
};
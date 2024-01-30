import { UserInput } from "../types";
import { validateUserName } from "./validateUserName";

export const checkUserFields = (user: UserInput, allRequiredFields = false) => {
  const userFields = ['firstName', 'lastName', 'userName'];

  for (const field of userFields) {
    if (!allRequiredFields) {
      if (typeof user[field] === 'undefined') {
        continue;
      }
    }

    if (typeof user[field] === 'undefined') {
      validateUserName(user[field]);
    }

    if (!user[field]) {
      throw new Error(`Missing ${field}`);
    }
  }
};

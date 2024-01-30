import { ValidationError } from "apollo-server";
import { UserDataSource } from "../types";

export const checkUserExists = async (userId: string, dataSource: UserDataSource) => {
  try {
    await dataSource.context.dataSources.userApi.get(userId);
  } catch (e) {
    throw new ValidationError(`User ${userId} does not exist.`)
  }
}
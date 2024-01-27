const users = async (_, { input }, { dataSources }) => {
  const apiFiltersInput = new URLSearchParams(input);
  const users = await dataSources.postAPi.getUsers('/?' + apiFiltersInput);

  return users;
};

const user = async (_, { id }, { dataSources }) => {
  const user = await dataSources.getUser('/' + id);
  return user;
};

const posts = ({ id }, _, { dataSources }) => {
  return dataSources.postAPi.batchLoadByUserId(id);
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
  User: { posts },
};

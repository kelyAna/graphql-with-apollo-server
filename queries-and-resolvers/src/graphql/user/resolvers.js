const user = async (_, __, { fetch }) => {
  const user = await fetch('http://localhost:3000/users/602');
  return user.json();
};

const users = async (_, __, { fetch }) => {
  const users = await fetch('http://localhost:3000/users');
  return users.json();
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};

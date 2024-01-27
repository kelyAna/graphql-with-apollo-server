import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './graphql/schema';
import { PostsApi } from './graphql/post/postDataSource';
import { UsersApi } from './graphql/user/userDataSource';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      postApi: new PostsApi(),
      userApi: new UsersApi(),
    };
  },
});

server.listen(4003).then(({ url }) => {
  console.log(`server listening on url ${url}`);
});

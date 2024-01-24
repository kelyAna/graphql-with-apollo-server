import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './graphql/schema';
import fetch from 'node-fetch';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {
      fetch,
    };
  },
});

server.listen(4003).then(({ url }) => {
  console.log(`server listening on url ${url}`);
});

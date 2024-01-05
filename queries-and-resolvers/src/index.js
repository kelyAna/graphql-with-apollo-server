import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      user: User!
      users: [User!]!
    }

    type User {
      id: ID!
      userName: String!
    }
  `,
  resolvers: {
    Query: {
      user: () => {
        return {
          id: '123',
          userName: 'kelyAna',
        };
      },
      users: () => {
        return [
          {
            id: '123',
            userName: 'kelyAna',
          },
          {
            id: '32',
            userName: 'ana',
          },
          {
            id: '12364',
            userName: 'lopes',
          },
        ];
      },
    },
  },
});

server.listen(4003).then(({ url }) => {
  console.log(`server listening on url ${url}`);
});

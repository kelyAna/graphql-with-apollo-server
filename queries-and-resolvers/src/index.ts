import { ApolloServer } from 'apollo-server'

import { context } from './graphql/context'

import { resolvers, typeDefs } from './graphql/schema'
import { PostsApi } from './graphql/post/postDataSource'
import { LoginApi } from './graphql/login/loginDataSouce'
import { UsersApi } from './graphql/user/userDataSource'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => {
    return {
      postApi: new PostsApi(),
      userApi: new UsersApi(),
      loginApi: new LoginApi(),
    }
  },
})

server.listen(4003).then(({ url }) => {
  console.log(`Server listening on url ${url}`)
})

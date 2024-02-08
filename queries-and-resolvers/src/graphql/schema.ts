import { gql } from 'apollo-server-core'
import { apiFiltersResolvers } from './api-filters/resolvers'
import { apiFiltersTypeDefs } from './api-filters/typedefs'
import { loginResolvers } from './login/resolvers'
import { postTypeDefs } from './post/typedefs'
import { userTypeDefs } from './user/typedefs'
import { loginTypedefs } from './login/typedefs'
import { userResolvers } from './user/userResolver'
import { postResolvers } from './post/postResolver'

const rootTypeDefs = gql`
  type Query {
    _empty: Boolean
  }

  type Mutation {
    _empty: Boolean
  }
`

const rootResolvers = {
  Query: {
    _empty: () => true,
  },

  Mutation: {
    _empty: () => true,
  },
}

export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  postTypeDefs,
  apiFiltersTypeDefs,
  loginTypedefs,
]
export const resolvers = [
  rootResolvers,
  userResolvers,
  postResolvers,
  apiFiltersResolvers,
  loginResolvers,
]

import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client/core'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import typeDefs from '@/graphql/typedefs.gql'
import FAVORITE_BOOKS_QUERY from '@/graphql/queries/favoriteBooks.query.gql'
import type { Book } from '@/types'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/graphql'
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql'
  })
)

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

// Cache implementation
const cache = new InMemoryCache()

cache.writeQuery({
  query: FAVORITE_BOOKS_QUERY,
  data: {
    favoriteBooks: [
      // placeholder
      // {
      //   __typename: 'Book',
      //   id: 1,
      //   title: 'Test title',
      //   author: 'Test author',
      //   description: 'Test desc',
      //   rating: 1,
      //   year: 1994,
      // },
    ]
  }
})

const resolvers = {
  Mutation: {
    addBookToFavorites: (
      _: undefined,
      { book }: { book: Book },
      { cache }: { cache: InMemoryCache }
    ) => {
      const data = cache.readQuery<{ favoriteBooks: Book[] }>({ query: FAVORITE_BOOKS_QUERY })

      if (!data) return []

      const newData = {
        favoriteBooks: [...data.favoriteBooks, book]
      }

      cache.writeQuery({ query: FAVORITE_BOOKS_QUERY, data: newData })

      return newData.favoriteBooks
    }
  }
}

// Create the apollo client
export const apolloClient = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers
})

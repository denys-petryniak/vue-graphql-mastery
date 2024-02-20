import { useQuery } from '@vue/apollo-composable'
import FAVORITE_BOOKS_QUERY from '@/graphql/queries/favoriteBooks.query.gql'

export function useFavoriteBooksQuery() {
  const { result: favoriteBooksResult, loading, error } = useQuery(FAVORITE_BOOKS_QUERY)

  return { favoriteBooksResult, loading, error }
}

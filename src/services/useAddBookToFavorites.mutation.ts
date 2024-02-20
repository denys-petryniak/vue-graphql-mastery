import { useMutation } from '@vue/apollo-composable'
import ADD_BOOK_TO_FAVORITES_MUTATION from '@/graphql/mutations/addBookToFavorites.mutation.gql'

export function useAddBookToFavoritesMutation() {
  const { mutate: addBookToFavorites, loading, error } = useMutation(ADD_BOOK_TO_FAVORITES_MUTATION)

  return { addBookToFavorites, loading, error }
}

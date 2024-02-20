import { useMutation } from '@vue/apollo-composable'
import type { ComputedRef } from 'vue'
import UPDATE_BOOK_MUTATION from '@/graphql/mutations/updateBook.mutation.gql'

interface BookUpdateParams {
  id: string
  rating: ComputedRef<number>
}

export function useUpdateBookMutation({ id, rating }: BookUpdateParams) {
  const { mutate, onDone, loading, error } = useMutation(UPDATE_BOOK_MUTATION, () => ({
    variables: {
      id,
      rating: rating.value
    }
  }))

  return { mutate, onDone, loading, error }
}

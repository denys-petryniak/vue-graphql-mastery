import { useMutation } from '@vue/apollo-composable'
import type { Book } from '../types'
import ALL_BOOKS_QUERY from '@/graphql/queries/allBooks.query.gql'
import ADD_BOOK_MUTATION from '@/graphql/mutations/addBook.mutation.gql'

interface NewBookParams {
  newBook: Omit<Book, 'id'>
  search: string
}

interface SourceData {
  allBooks: Book[]
}

export function useAddBookMutation({ newBook, search }: NewBookParams) {
  const {
    mutate: addBook,
    onDone,
    loading,
    error
  } = useMutation(ADD_BOOK_MUTATION, () => ({
    variables: {
      input: newBook
    },
    update(cache, response) {
      const sourceData: SourceData | null = cache.readQuery({
        query: ALL_BOOKS_QUERY,
        variables: {
          search
        }
      })

      if (sourceData?.allBooks) {
        const data = {
          allBooks: [...sourceData.allBooks, response.data?.addBook]
        }

        cache.writeQuery({ data, query: ALL_BOOKS_QUERY, variables: { search } })
      }
    },
    optimisticResponse: {
      addBook: {
        __typename: 'Book',
        id: -1,
        ...newBook
      }
    }
  }))

  return { addBook, onDone, loading, error }
}

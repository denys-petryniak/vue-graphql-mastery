import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import type { ComputedRef } from 'vue'
import ALL_BOOKS_QUERY from '@/graphql/queries/allBooks.query.gql'
import BOOK_SUBSCRIPTION from '@/graphql/subscriptions/newBook.subscription.gql'

import type { Book, Books } from '@/types'

interface SearchTerm {
  searchTerm: ComputedRef<string>
}

interface SubscriptionData {
  subscriptionData: {
    data: {
      bookSub: Book
    }
  }
}

export function useBooksQuery({ searchTerm }: SearchTerm) {
  const { result, loading, error, subscribeToMore } = useQuery(
    ALL_BOOKS_QUERY,
    () => ({ search: searchTerm.value }),
    () => ({
      debounce: 500
    })
  )

  subscribeToMore(() => ({
    document: BOOK_SUBSCRIPTION,
    updateQuery(previousResult: Books, newResult: SubscriptionData) {
      const res = {
        allBooks: [...previousResult.allBooks, newResult.subscriptionData.data.bookSub]
      }

      return res
    }
  }))

  const books = computed(() => result.value?.allBooks ?? [])

  return { books, loading, error }
}

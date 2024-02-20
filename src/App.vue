<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBooksQuery } from '@/services/useBooks.query'
import { useFavoriteBooksQuery } from '@/services/useFavoriteBooks.query'
import { useAddBookToFavoritesMutation } from '@/services/useAddBookToFavorites.mutation'
import type { Book } from '@/types'

import VButton from '@/components/VButton.vue'
import VInput from '@/components/VInput.vue'
import AddBook from '@/components/AddBook.vue'
import EditRating from '@/components/EditRating.vue'

const searchTerm = ref('')
const activeBook = ref<Book | null>(null)
const showNewBookForm = ref(false)

const getSearchTerm = computed(() => searchTerm.value)

const { books, loading, error } = useBooksQuery({ searchTerm: getSearchTerm })
const { favoriteBooksResult } = useFavoriteBooksQuery()
const { addBookToFavorites } = useAddBookToFavoritesMutation()
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <h1 class="mb-3 text-lg font-semibold underline">Books</h1>
    <div>
      <div v-if="loading">Loading. . .</div>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <div v-else>
        <div class="mt-4">
          <div class="mb-4">
            <p>Search</p>
            <VInput v-model="searchTerm" class="my-4" />
          </div>
          <p v-if="activeBook">
            <span class="block mb-2">Update {{ activeBook.title }} rating:</span>
            <EditRating
              :initial-rating="activeBook.rating"
              :book-id="activeBook.id"
              @close-form="activeBook = null"
            />
          </p>
          <template v-else>
            <section>
              <div
                v-for="book in books"
                :key="book.id"
                class="relative max-w-3xl mx-auto p-4 mb-4 border border-gray-400 dark:border-gray-700"
              >
                <h3 class="mb-2 text-md font-semibold">
                  {{ book.title }} - <span class="italic">{{ book.author }}</span> (<span>{{
                    book.year
                  }}</span
                  >)
                </h3>
                <VButton @click="addBookToFavorites({ book })"> Add to Favorites </VButton>
                <p class="mb-2">
                  {{ book.description }}
                </p>
                <p>
                  Rating: <span class="font-bold">{{ book.rating }}</span>
                  <VButton @click="activeBook = book"> Edit rating </VButton>
                </p>
              </div>
              <div class="mb-8">
                <VButton v-if="!showNewBookForm" @click="showNewBookForm = true">
                  Add a new book
                </VButton>
                <AddBook
                  v-if="showNewBookForm"
                  :search="searchTerm"
                  @close-form="showNewBookForm = false"
                />
              </div>
              <div v-if="favoriteBooksResult?.favoriteBooks.length">
                <h2 class="mb-2 text-md font-semibold">Favorite books</h2>
                <div
                  v-for="book in favoriteBooksResult.favoriteBooks"
                  :key="book.id"
                  class="max-w-3xl mx-auto p-4 mb-4 border border-gray-400 dark:border-gray-700"
                >
                  <h3 class="mb-2 text-md font-semibold">
                    {{ book.title }} - <span class="italic">{{ book.author }}</span> (<span>{{
                      book.year
                    }}</span
                    >)
                  </h3>
                </div>
              </div>
            </section>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useAddBookMutation } from '@/services/useAddBook.mutation'

import VButton from '@/components/VButton.vue'
import VInput from '@/components/VInput.vue'

interface Props {
  search: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'closeForm'): void
}>()

const newBook = reactive({
  title: '',
  author: '',
  description: '',
  rating: 1,
  year: 1970
})

const { addBook, onDone } = useAddBookMutation({ newBook, search: props.search })

const submitForm = async () => {
  await addBook()
}

onDone(() => emit('closeForm'))
</script>

<template>
  <form @submit.prevent="submitForm">
    <fieldset class="my-4">
      <label class="block mb-2" for="title"> Title </label>
      <VInput id="title" v-model.trim="newBook.title" type="text" required />
    </fieldset>
    <fieldset class="my-4">
      <label class="block mb-2" for="description"> Description (optional) </label>
      <VInput id="description" v-model.trim="newBook.description" type="text" />
    </fieldset>
    <fieldset class="my-4">
      <label class="block mb-2" for="author"> Author </label>
      <VInput id="author" v-model.trim="newBook.author" type="text" required />
    </fieldset>
    <fieldset class="my-4">
      <label class="block mb-2" for="year"> Year </label>
      <VInput id="year" v-model.number="newBook.year" type="number" required />
    </fieldset>
    <fieldset class="my-4">
      <label class="block mb-2" for="rating"> Rating </label>
      <VInput id="rating" v-model.number="newBook.rating" type="number" required />
    </fieldset>
    <VButton type="submit"> Submit </VButton>
    <VButton type="reset" @click="$emit('closeForm')"> Close form </VButton>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUpdateBookMutation } from '@/services/useUpdateBook.mutation'

import VInput from '@/components/VInput.vue'

interface Props {
  initialRating: number
  bookId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'closeForm'): void
}>()

const rating = ref(props.initialRating)
const getRating = computed(() => rating.value)

const {
  mutate: updateRating,
  onDone,
  loading,
  error
} = useUpdateBookMutation({ id: props.bookId, rating: getRating })

onDone(() => emit('closeForm'))
</script>

<template>
  <VInput
    v-model.number="rating"
    type="text"
    autofocus
    @keyup.esc="emit('closeForm')"
    @keyup.enter="updateRating"
  />
  <p v-if="loading" class="py-2">Updating...</p>
  <p v-if="error" class="py-2">
    {{ error }}
  </p>
</template>

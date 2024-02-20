<script setup lang="ts">
type ModelValue = string | number

interface Props {
  modelValue?: ModelValue
}

defineProps<Props>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: ModelValue): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input
    :value="modelValue"
    autocomplete="false"
    class="transition px-4 py-2 w-[250px] text-center bg-transparent border rounded border-gray-400 hover:ring-2 hover:ring-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:border-gray-700"
    @input="onInput"
  />
</template>

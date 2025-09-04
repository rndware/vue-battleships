<template>
  <input
    class="input-coordinate"
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    maxlength="3"
    @input="onInput"
    @keyup.enter="submit"
  />
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit'): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value.toUpperCase()
  value = value.replace(/[^A-J0-9]/g, '').substring(0, 3)
  emit('update:modelValue', value)
}

const submit = () => {
  emit('submit')
}
</script>

<style scoped>
.input-coordinate {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  border: 2px solid var(--gray);
  border-radius: 0.5rem;
  width: 80px;
  transition:
    border-color var(--fast-transition),
    box-shadow var(--fast-transition);
}

.input-coordinate:focus {
  outline: none;
  border-color: var(--neon-blue);
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}
</style>

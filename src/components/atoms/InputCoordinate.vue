<template>
  <input
    class="input-coordinate"
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    :maxlength="maxlength"
    @input="onInput"
    @keyup.enter="submit"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()

const maxlength = 3;

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit'): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value.toUpperCase()
  value = value.replace(/[^A-J0-9]/g, '').substring(0, maxlength) // strip out invalid chars
  emit('update:modelValue', value)
}

const submit = () => {
  emit('submit')
}
</script>

<style scoped>
.input-coordinate {
  padding: 0.55rem 1rem;
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  color: var(--input-color);
  background: var(--input-background-color);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-btn);
  width: 80px;
  transition:
    border-color var(--duration-fast),
    box-shadow var(--duration-fast)
}

</style>

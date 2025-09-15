<template>
  <button class="btn-fire" type="button" @click="$emit('click')" :disabled="disabled">
    <slot> 🚀 Fire!</slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.btn-fire {
  background-color: var(--color-primary-alpha-80);
  color: var(--color-on-primary);
  font-weight: bold;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-btn);
  cursor: pointer;
  transition: background-color var(--duration-fast);
}

.btn-fire:hover {
  background-color: var(--color-primary-hover);
}

.btn-fire:active {
  background-color: var(--color-primary-active);
}

.btn-fire:disabled {
  background-color: var(--gray-disabled-alpha-80);
  cursor: not-allowed;
}
</style>

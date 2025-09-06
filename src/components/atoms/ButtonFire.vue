<template>
  <button class="btn-fire" type="button" @click="$emit('click')">
    <slot> 🚀 Fire!</slot>
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.btn-fire {
  background-color: var(--red-action);
  color: white;
  font-weight: bold;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-fire:hover {
  background-color: var(--red-hover);
}

.btn-fire:active {
  background-color: var(--red-active);
}

.btn-fire:disabled {
  background-color: var(--gray-disabled);
  cursor: not-allowed;
}
</style>

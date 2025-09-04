<!-- src/components/atoms/ButtonNew.vue -->
<template>
  <button class="btn-new" type="button" @click="$emit('click')">
    <slot>New Game</slot>
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.btn-new {
  background-color: var(--blue);
  color: var(--white);
  font-weight: bold;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-new:hover {
  background-color: var(--blue-hover);
}

.btn-new:active {
  background-color: var(--blue-active);
}

.btn-new:disabled {
  background-color: var(--gray-disabled);
  cursor: not-allowed;
}
</style>

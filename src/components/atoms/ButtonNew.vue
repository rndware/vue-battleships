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
  background-color: var(--color-secondary);
  color: var(--color-on-secondary);
  font-weight: bold;
  border: none;
  padding: 0.6rem var(--space-5);
  border-radius: var(--radius-btn);
  cursor: pointer;
  transition: background-color var(--duration-fast);
}

.btn-new:hover {
  background-color: var(--color-secondary-hover);
}

.btn-new:active {
  background-color: var(--color-secondary-active);
}
</style>

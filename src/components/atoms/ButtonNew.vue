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
  padding: 0.6rem 1.2rem;
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

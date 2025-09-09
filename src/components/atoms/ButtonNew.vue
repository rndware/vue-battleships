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
  background-color: var(--btn-bg);
  color: var(--white);
  font-weight: bold;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color var(--duration-fast);
}

.btn-new:hover {
  background-color: var(--btn-bg-hover);
}

.btn-new:active {
  background-color: var(--btn-bg-active);
}

.btn-new:disabled {
  background-color: var(--gray-disabled);
  cursor: not-allowed;
}
</style>

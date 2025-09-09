<template>
  <span class="health-dot" :class="{ filled }" />
</template>

<script setup lang="ts">
defineProps<{
  filled: boolean
}>()
</script>

<style scoped>
.health-dot {
  display: inline-block;
  width: var(--size-dot);
  height: var(--size-dot);
  margin: 0 2px;
  border-radius: 50%;
  background-color: var(--gray-300); /* empty */
  transition: background-color var(--duration-fast);
}

.health-dot.filled {
  background-color: var(--green-400); /* alive */
}
</style>

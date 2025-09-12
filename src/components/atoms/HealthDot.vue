<template>
  <span class="health-dot" :class="{ 'health-dot--filled': filled }" />
</template>

<script setup lang="ts">
defineProps<{
  filled: boolean
}>()
</script>

<style scoped>
.health-dot {
  display: inline-block;
  width: var(--health-dot-size);
  height: var(--health-dot-size);
  margin: 0 2px;
  border-radius: 50%;
  background-color: var(--health-dot-empty);
  transition: background-color var(--duration-fast);
}

.health-dot--filled {
  background-color: var(--health-dot-alive);
}
</style>

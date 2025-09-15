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
  position: relative;
  overflow: hidden;
}

.health-dot::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--health-dot-alive);
  opacity: 0;
  transition: opacity var(--duration-fast);
}

.health-dot--filled::after {
  opacity: 1;
}
</style>

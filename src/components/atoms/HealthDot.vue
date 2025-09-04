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
  width: var(--dot-size);
  height: var(--dot-size);
  margin: 0 2px;
  border-radius: 50%;
  background-color: var(--gray); /* empty */
  transition: background-color var(--fast-transition);
}

.health-dot.filled {
  background-color: var(--green-filled); /* alive */
}
</style>

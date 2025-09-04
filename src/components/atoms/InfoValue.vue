<template>
  <span class="info-value">
    <slot />
  </span>
</template>

<script setup lang="ts">
/* no props needed — content comes from the slot */
</script>

<style scoped>
.info-value {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--dark-blue);
}
</style>

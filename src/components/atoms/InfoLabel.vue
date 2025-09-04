<template>
  <span class="info-label">
    <slot />
  </span>
</template>

<script setup lang="ts">
/* no props needed — it just styles whatever text is inside */
</script>

<style scoped>
.info-label {
  display: block;
  font-size: 0.9rem;
  color: var(--gray-dark);
  margin-bottom: 5px;
}
</style>

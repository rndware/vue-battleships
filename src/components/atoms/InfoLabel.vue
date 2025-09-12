<template>
  <span class="info-label">
    <slot />
  </span>
</template>

<style scoped>
.info-label {
  display: block;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-bottom: 5px;
}
</style>

<template>
  <span class="info-label">
    <slot />
  </span>
</template>

<style scoped>
.info-label {
  display: block;
  font-size: var(--font-size-100);
  color: var(--color-text-muted);
  margin-bottom: 5px;
}
</style>

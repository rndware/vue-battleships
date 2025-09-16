<template>
  <span class="info-value">
    <slot />
  </span>
</template>

<style scoped>
.info-value {
  font-weight: bold;
  font-size: var(--font-size-250);
  color: var(--color-text-value);
}
</style>

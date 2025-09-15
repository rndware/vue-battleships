<template>
  <div
    class="grid-cell"
    :class="[statusClass, { 'grid-cell--disabled': props.disabled }]"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MessageType } from '@/types'

const props = defineProps<{ status?: MessageType; disabled?: boolean }>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const statusClass = computed(() => {
  return `grid-cell--${props.status || 'pristine'}`
})

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<style scoped>
.grid-cell {
  --base-font-size: var(--cell-font-size);

  border: 1px solid var(--cell-color-border);
  background: var(--cell-color-background);
  color: var(--cell-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: var(--base-font-size);
  transition: all var(--duration-fast) ease;
  position: relative;
  overflow: hidden;
}

.grid-cell--pristine:hover:not(.grid-cell--disabled) {
  background: var(--cell-color-background-hover);

  &::before {
    content: '❌';
    position: absolute;
    inset: 0;
    font-size: var(--base-font-size);
    background: var(--cell-color-background-hover);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.grid-cell--disabled {
  cursor: default;
}

.grid-cell--hit {
  background: var(--color-hit);
  animation: hit-pulse var(--duration-slow) ease-out;
}

.grid-cell--miss {
  background: var(--color-miss);
}

.grid-cell--sunk {
  background: var(--color-sunk-dark);
  animation: sunk-pulse var(--duration-slower) ease-out;
}

@keyframes hit-pulse {
  0% {
    font-size: var(--base-font-size);
  }

  50% {
    font-size: calc(var(--base-font-size) * 1.5);
    background: var(--color-hit-light);
  }

  100% {
    font-size: var(--base-font-size);
    transform: scale(1);
  }
}

@keyframes sunk-pulse {
  0% {
    font-size: var(--base-font-size);
  }

  25% {
    font-size: calc(var(--base-font-size) * 1.2);
    background: var(--color-sunk-light);
  }

  50% {
    font-size: calc(var(--base-font-size) * 1.5);
    background: var(--color-sunk);
  }

  75% {
    font-size: calc(var(--base-font-size) * 1.2);
  }

  100% {
    font-size: var(--base-font-size);
  }
}

@media (width <= 768px) {
  .grid-cell {
    --base-font-size: var(--cell-font-size-sm);
  }
}
</style>

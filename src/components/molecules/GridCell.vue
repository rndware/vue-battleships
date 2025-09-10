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
  width: var(--cell-size);
  height: var(--cell-size);
  border: 1px solid var(--light-blue-400);
  background: var(--blue-faded);
  color: var(--white);
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
  background: var(--blue-400);
  box-shadow: 0 4px 8px var(--shadow-medium);

  &:before {
    content: '❌';
    position: absolute;
    inset: 0;
    font-size: var(--base-font-size);
    background: var(--blue-400);

    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.grid-cell--disabled {
  cursor: default;
}

.grid-cell--hit {
  background: var(--orange-500);
  animation: hitPulse var(--duration-slow) ease-out;
}

.grid-cell--miss {
  background: var(--blue-400);
}

.grid-cell--sunk {
  background: var(--light-blue-400);
  animation: sunkPulse var(--duration-slower) ease-out;
}

@keyframes hitPulse {
  0% {
    font-size: var(--base-font-size);
  }
  50% {
    font-size: calc(var(--base-font-size) * 1.5);
    background: var(--orange-400);
  }
  100% {
    font-size: var(--base-font-size);
    transform: scale(1);
  }
}

@keyframes sunkPulse {
  0% {
    font-size: var(--base-font-size);
  }
  25% {
    font-size: calc(var(--base-font-size) * 1.2);
    background: var(--purple-400);
  }
  50% {
    font-size: calc(var(--base-font-size) * 1.5);
    background: var(--purple-500);
  }
  75% {
    font-size: calc(var(--base-font-size) * 1.2);
  }
  100% {
    font-size: var(--base-font-size);
  }
}

@media (max-width: 768px) {
  .grid-cell {
    --base-font-size: var(--cell-font-size-sm);
    width: var(--cell-size-sm);
    height: var(--cell-size-sm);
  }
}
</style>

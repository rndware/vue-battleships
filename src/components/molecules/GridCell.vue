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
  return props.status ? `grid-cell--${props.status}` : ''
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
  border: 1px solid var(--light-blue-light);
  background: var(--blue-faded);
  color: var(--white);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: var(--base-font-size);
  transition: all var(--fast-transition) ease;
  position: relative;
  overflow: hidden;
}

.grid-cell:hover:not(.grid-cell--hit):not(.grid-cell--miss):not(.grid-cell--sunk):not(
    .grid-cell--disabled
  ) {
  background: var(--blue-light);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:before {
    content: '❌';
    position: absolute;
    inset: 0;
    font-size: var(--base-font-size);
    background: var(--blue-light);

    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.grid-cell--disabled {
  cursor: default;
}

.grid-cell--hit {
  background: var(--orange);
  animation: hitPulse var(--slow-transition) ease-out;
}

.grid-cell--miss {
  background: var(--blue-light);
}

.grid-cell--sunk {
  background: var(--light-blue-light);
  animation: sunkPulse var(--slower-transition) ease-out;
}

@keyframes hitPulse {
  0% {
    font-size: var(--base-font-size);
  }
  50% {
    font-size: calc(var(--base-font-size) * 1.5);
    background: var(--orange-light);
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
    background: var(--purple-light);
  }
  50% {
    font-size: calc(var(--base-font-size) * 1.5);
    background: var(--purple);
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

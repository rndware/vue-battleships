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
  font-size: 18px;
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
    background: var(--blue-light);
    animation: ripple var(--slow-transition) linear;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
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
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
    background: var(--orange-light);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes sunkPulse {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
    background: var(--purple-light);
  }
  50% {
    transform: scale(1.2);
    background: var(--purple);
  }
  75% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .grid-cell {
    width: var(--cell-size-sm);
    height: var(--cell-size-sm);
    font-size: 16px;
  }
}
</style>

<template>
  <p v-if="text" :class="['game-message', `game-message--${type}`]">
    {{ text }}
  </p>
</template>

<script setup lang="ts">
import type { MessageType } from '@/types'

defineProps<{
  text: string
  type: MessageType
}>()
</script>

<style scoped>
.game-message {
  text-align: center;
  padding: 0.75rem var(--space-3);
  border-radius: var(--space-2);
  font-weight: bold;
  min-height: var(--space-5);
  transition: all var(--duration-slow) ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
}

.game-message--hit {
  background: linear-gradient(45deg, var(--color-hit), var(--color-hit-light));
}

.game-message--miss {
  background: linear-gradient(45deg, var(--color-miss), var(--color-miss-light));
}

.game-message--sunk {
  background: linear-gradient(45deg, var(--color-sunk), var(--color-sunk-light));
}

.game-message--win {
  background: linear-gradient(45deg, var(--color-win), var(--color-win-light));
  font-size: var(--font-size-500);
  animation: win-pulse var(--duration-mid) ease-out infinite;
}

.game-message--lose {
  background: linear-gradient(45deg, var(--color-lose), var(--color-lose-light));
  font-size: var(--font-size-500);
  animation: win-pulse var(--duration-mid) ease-out infinite;
}

@keyframes win-pulse {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}
</style>

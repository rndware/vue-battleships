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
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: bold;
  min-height: 2rem;
  transition: all var(--duration-slow) ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
}

.game-message--hit {
  background: linear-gradient(45deg, var(--orange-500), var(--orange-400));
}

.game-message--miss {
  background: linear-gradient(45deg, var(--blue-500), var(--blue-400));
}

.game-message--sunk {
  background: linear-gradient(45deg, var(--purple-500), var(--purple-400));
}

.game-message--win {
  background: linear-gradient(45deg, var(--green-500), var(--green-400));
  font-size: 1.5rem;
  animation: winPulse 1s ease-out infinite;
}

.game-message--lose {
  background: linear-gradient(45deg, var(--black-900), var(--black-800));
  font-size: 1.5rem;
  animation: winPulse 1s ease-out infinite;
}

@keyframes winPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>

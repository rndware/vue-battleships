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
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
}

.game-message--hit {
  background: linear-gradient(45deg, var(--orange), var(--orange-light));
}

.game-message--miss {
  background: linear-gradient(45deg, var(--blue), var(--blue-light));
}

.game-message--sunk {
  background: linear-gradient(45deg, var(--purple), var(--purple-light));
}

.game-message--win {
  background: linear-gradient(45deg, var(--green), var(--green-light));
  font-size: 1.5rem;
  animation: winPulse 1s ease-out infinite;
}

.game-message--lose {
  background: linear-gradient(45deg, var(--black), var(--black-light));
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

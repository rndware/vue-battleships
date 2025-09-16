<template>
  <div class="intro-view">
    <InfoLayout
      logo="🚢"
      title="Vue Battleships"
      subtitle="Sink your opponent's fleet before they sink yours!"
      animation="float"
    >
      <button class="intro__start-button" @click="startGame">Start Game</button>
    </InfoLayout>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import InfoLayout from '@/components/templates/InfoLayout.vue'

const router = useRouter()
const startGame = () => {
  router.push('/game')
}
</script>

<style scoped>
.intro__start-button {
  padding: var(--space-3) var(--space-5);
  font-size: var(--font-size-300);
  font-weight: bold;
  background: var(--color-primary-alpha-80);
  border: none;
  border-radius: var(--radius-btn);
  color: var(--white);
  cursor: pointer;
  transition:
    transform var(--duration-fast) ease,
    box-shadow var(--duration-fast) ease;
}

.intro__start-button:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px var(--shadow-dark);
  background-color: var(--color-primary-hover-alpha-80);
}

.intro__start-button:active {
  background-color: var(--color-primary-active);
}
</style>

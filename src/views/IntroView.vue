<template>
  <div class="intro-view"></div>
  <InfoLayout
    logo="🚢"
    title="Vue Battleships"
    subtitle="Sink your opponent's fleet before they sink yours!"
    animation="float"
  >
    <button class="intro__start-button" @click="startGame">Start Game</button>
  </InfoLayout>
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
  padding: 1rem 2rem;
  font-size: 1.25rem;
  background: var(--red-action);
  border: none;
  border-radius: var(--btn-border-radius);
  color: var(--white);
  cursor: pointer;
  transition:
    transform var(--fast-transition) ease,
    box-shadow var(--fast-transition) ease;
}

.intro__start-button:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}
</style>

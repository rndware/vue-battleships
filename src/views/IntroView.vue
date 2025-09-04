<template>
  <div class="intro-view">
    <section class="intro">
      <div class="intro__content">
        <div class="intro__logo">🚢</div>
        <h1 class="intro__title">Vue Battleships</h1>
        <p class="intro__subtitle">Sink your opponent's fleet before they sink yours!</p>
        <button class="intro__start-button" @click="startGame">Start Game</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const startGame = () => {
  router.push('/game')
}
</script>

<style scoped>
.intro {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: black;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.intro__content {
  z-index: 2;
}

.intro__logo {
  font-size: 5rem;
  margin-bottom: 1rem;
  animation: intro__float 2s ease-in-out infinite;
}

.intro__title {
  font-size: 4rem;
  color: var(--dark-blue);
  margin-bottom: 1rem;
}

.intro__subtitle {
  color: var(--gray-dark);
  font-size: 1.5rem;
  margin-bottom: 4rem;
}

.intro__start-button {
  padding: 1rem 2rem;
  font-size: 1.25rem;
  background: var(--red);
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.intro__start-button:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

@keyframes intro__float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>

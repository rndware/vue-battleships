<template>
  <div class="info-layout">
    <section class="info">
      <div class="info__content">
        <div class="info__logo" :style="{ '--animation': animation }">{{ logo }}</div>
        <h1 class="info__title">{{ title }}</h1>
        <p class="info__subtitle">{{ subtitle }}</p>
        <slot />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  logo: string
  title: string
  subtitle: string
  animation?: 'float' | 'float-rotated'
}>()
</script>

<style>
.info {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: var(--color-text);
  text-align: center;
  font-family: var(--font-family-sans);
}

.info__content {
  z-index: 2;
}

.info__logo {
  font-size: 5rem;
  margin-bottom: var(--space-3);
  animation: var(--animation) var(--duration-long) ease-in-out infinite;
}

.info__title {
  font-size: 4rem;
  color: var(--layout-title-color);
  margin-bottom: var(--space-3);
}

.info__subtitle {
  color: var(--layout-subtitle-color);
  font-size: 1.5rem;
  margin-bottom: var(--space-8);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes float-rotated {
  0%,
  100% {
    transform: translateY(0) rotate(180deg);
  }

  50% {
    transform: translateY(-10px) rotate(180deg);
  }
}
</style>

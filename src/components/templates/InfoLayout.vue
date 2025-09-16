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
  font-size: var(--font-size-800);
  margin-bottom: clamp(var(--space-2), 5vw, var(--space-3));
  animation: var(--animation) var(--duration-long) ease-in-out infinite;
}

.info__title {
  font-size: clamp(var(--font-size-600), 5vw, var(--font-size-700));
  color: var(--layout-title-color);
  margin-bottom: clamp(var(--space-2), 5vw, var(--space-3));
}

.info__subtitle {
  color: var(--layout-subtitle-color);
  font-size: clamp(var(--font-size-400), 2vw, var(--font-size-500));
  margin-bottom: clamp(var(--space-7), 5vw, var(--space-8));
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

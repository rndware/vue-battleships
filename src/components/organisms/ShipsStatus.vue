<template>
  <section class="fleet-status">
    <h3 class="fleet-status__title">
      {{ title || 'Fleet Status' }}
      <span class="led"></span>
    </h3>
    <div class="fleet-status__ship" v-for="ship in ships" :key="ship.name">
      <span class="fleet-status__ship-name"> {{ ship.name }} ({{ ship.size }} squares) </span>
      <ShipHealth class="fleet-status__ship-health" :health="ship.hits" :maxHealth="ship.size" />
    </div>
  </section>
</template>

<script setup lang="ts">
import ShipHealth from '@/components/molecules/ShipHealth.vue'
import type { Ship } from '@/types'

defineProps<{
  title?: string
  ships: Ship[]
}>()
</script>

<style scoped>
.fleet-status {
  background: var(--color-section-background);
  padding: 1rem;
  border-radius: var(--radius-section);
  margin-top: 1rem;
  box-shadow: inset 0 2px 4px var(--shadow-light);
}

.fleet-status__title {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--ship-status-title-color);
  margin-bottom: 0.75rem;
  margin: 0 0 0.75rem 0;
  text-align: center;
}

.fleet-status__ship {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  border-bottom: 1px solid var(--gray-100);
}

.fleet-status__ship:last-child {
  border-bottom: none;
}

.fleet-status__ship-name {
  font-weight: bold;
  color: var(--ship-status-color);
}

.fleet-status__ship-health {
  flex-shrink: 0;
}

.led {
  width: var(--led-size);
  height: var(--led-size);
  display: inline-block;
  background: var(--led-color-background);
  border-radius: 50%;
  margin: 0 0.1rem;
  box-shadow: 0 0 8px var(--led-box-shadow);
  animation: led-blink 4s infinite ease-in-out;
}

@keyframes led-blink {
  0%,
  100% {
    opacity: 0.2;
    box-shadow: 0 0 4px var(--led-color-dark-blink);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 12px var(--led-color-light-blink);
  }
}
</style>

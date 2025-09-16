<template>
  <div class="ship-health">
    <HealthDot v-for="i in maxHealth" :key="i" :filled="i <= health" />
  </div>
</template>

<script setup lang="ts">
import HealthDot from '@/components/atoms/HealthDot.vue'

defineProps<{
  health: number
  maxHealth: number
}>()
</script>

<style scoped>
.ship-health {
  display: flex;
  gap: var(--space-1);
}
</style>

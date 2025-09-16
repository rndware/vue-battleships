<template>
  <section class="game-info">
    <slot>
      <InfoItem label="Shots" :value="shotsFired" />
      <InfoItem label="Hits" :value="hits" />
      <InfoItem label="Shots Remaining" :value="shotsRemaining" :warning="shotsRemaining <= 3" />
      <InfoItem label="Ships Remaining" :value="shipsRemaining" />
    </slot>
  </section>
</template>

<script setup lang="ts">
import InfoItem from '@/components/molecules/InfoItem.vue'

defineProps<{
  shotsFired: number
  hits: number
  shotsRemaining: number
  shipsRemaining: number
}>()
</script>

<style scoped>
.game-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: clamp(20px, 5vw, 40px);
  padding: 15px;
  background: var(--color-section-background);
  border-radius: var(--radius-section);
  box-shadow: inset 0 2px 4px var(--shadow-light);
}
</style>

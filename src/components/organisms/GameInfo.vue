<template>
  <section class="game-info">
    <InfoItem label="Shots Fired" :value="shotsFired" />
    <InfoItem label="Hits" :value="hits" />
    <InfoItem label="Shots Remaining" :value="shotsRemaining" />
    <InfoItem label="Ships Remaining" :value="shipsRemaining" />
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
  margin-bottom: 40px;
  padding: 15px;
  background: var(--white-background);
  border-radius: 10px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .game__info {
    flex-direction: column;
    gap: 10px;
  }
}
</style>

<template>
  <div class="info-item">
    <InfoLabel>{{ label }}</InfoLabel>
    <InfoValue :class="['info-item__value', { 'info-item__value--warning': warning }]">
      {{ value }}
    </InfoValue>
  </div>
</template>

<script setup lang="ts">
import InfoLabel from '@/components/atoms/InfoLabel.vue'
import InfoValue from '@/components/atoms/InfoValue.vue'

defineProps<{
  label: string
  value: string | number
  warning?: boolean
}>()
</script>

<style scoped>
.info-item {
  text-align: center;

  .info-item__value--warning {
    color: var(--color-text-warning);
  }
}
</style>

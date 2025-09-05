<template>
  <div class="info-item">
    <InfoLabel>{{ label }}</InfoLabel>
    <InfoValue :class="{ warning: warning }">{{ value }}</InfoValue>
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

  .warning {
    color: var(--red);
  }
}
</style>

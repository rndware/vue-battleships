<template>
  <div class="info-item">
    <InfoLabel>{{ label }}</InfoLabel>
    <InfoValue>{{ value }}</InfoValue>
  </div>
</template>

<script setup lang="ts">
import InfoLabel from '@/components/atoms/InfoLabel.vue'
import InfoValue from '@/components/atoms/InfoValue.vue'

defineProps<{
  label: string
  value: string | number
}>()
</script>

<style scoped>
.info-item {
  text-align: center;
}
</style>

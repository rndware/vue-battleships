<template>
  <div class="input-section">
    <div class="input-group">
      <slot>
        <InputCoordinate v-model="value" :placeholder="placeholder" @submit="onSubmit" />
        <ButtonFire :disabled="disabled" @click="onSubmit" />
        <ButtonMute />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import InputCoordinate from '@/components/atoms/InputCoordinate.vue'
import ButtonFire from '@/components/atoms/ButtonFire.vue'
import ButtonMute from '@/components/molecules/ButtonMute.vue'

const props = defineProps<{
  modelValue: string
  disabled?: boolean
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit'): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})

const onSubmit = () => {
  if (!props.disabled && value.value) {
    emit('submit')
  }
}
</script>

<style scoped>
.input-section {
  text-align: center;
  margin-bottom: var(--space-6);
}

.input-group {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  background: var(--color-section-background);
  padding: 0.75rem var(--space-4);
  border-radius: 1.5rem;
}
</style>

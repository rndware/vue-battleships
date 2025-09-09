<template>
  <div class="input-section">
    <div class="input-group">
      <InputCoordinate v-model="value" :placeholder="placeholder" @submit="onSubmit" />
      <ButtonFire :disabled="disabled" @click="onSubmit" />
      <ButtonMute />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import InputCoordinate from '@/components/atoms/InputCoordinate.vue'
import ButtonFire from '@/components/atoms/ButtonFire.vue'
import ButtonMute from '@/components/atoms/ButtonMute.vue';

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
  margin-bottom: 2.75rem;
}

.input-group {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: var(--color-background);
  padding: 0.75rem 1.5rem;
  border-radius: 1.5rem;
}

@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
    gap: 10px;
  }
}
</style>

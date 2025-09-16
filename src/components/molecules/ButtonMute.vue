<template>
  <button class="btn-mute" type="button" @click="toggleMute">
    <slot>{{ getContent() }}</slot>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSounds } from '@/composables/useSounds'

defineEmits<{
  (e: 'click'): void
}>()

const toggle = ref(false)

const toggleMute = () => {
  toggle.value = !toggle.value

  useSounds().toggleMute()
}

const getContent = () => {
  return toggle.value ? '🔇 Unmute' : '🔊 Mute'
}
</script>

<style scoped>
.btn-mute {
  background-color: var(--color-tertiary-alpha-80);
  color: var(--color-on-primary);
  font-weight: bold;
  border: none;
  padding: 0.75rem var(--space-4);
  border-radius: var(--radius-btn);
  cursor: pointer;
  transition: background-color var(--duration-fast);
}

.btn-mute:hover {
  background-color: var(--color-tertiary-hover);
}

.btn-mute:active {
  background-color: var(--color-tertiary-active);
}
</style>

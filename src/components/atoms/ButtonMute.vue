<template>
  <button class="btn-mute" type="button" @click="toggleMute">
    <slot>{{ getContent() }}</slot>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSounds } from '@/composables/useSounds';

defineEmits<{
  (e: 'click'): void
}>()

const toggle = ref(false);

const toggleMute = () => {
  toggle.value = !toggle.value;

  useSounds().toggleMute();
}

const getContent = () => {
  return  toggle.value ? '🔇 Unmute' : '🔊 Mute'
}
</script>

<style scoped>
.btn-mute {
  background-color: var(--blue-mid);
  color: var(--color-surface);
  font-weight: bold;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-btn);
  cursor: pointer;
  transition: background-color var(--duration-fast);
}

.btn-mute:hover {
  background-color: var(--blue-dark);
}

.btn-mute:active {
  background-color: var(--blue-700);
}
</style>

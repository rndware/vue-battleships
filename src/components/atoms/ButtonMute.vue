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
  background-color: var(--mid-blue);
  color: var(--white);
  font-weight: bold;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--btn-border-radius);
  cursor: pointer;
  transition: background-color var(--fast-transition);
}

.btn-mute:hover {
  background-color: var(--dark-blue);
}

.btn-mute:active {
  background-color: var(--blue-active);
}
</style>

import { ref } from 'vue'

type SoundMap = Record<string, HTMLAudioElement>

const isMuted = ref(false)

export function useSounds() {
  const sounds: SoundMap = {
    hit: new Audio('/sounds/explosion.wav'),
    sunk: new Audio('/sounds/ship-down.wav'),
  }

  // helper to play a sound by name
  function play(name: keyof typeof sounds) {
    if (isMuted.value) return

    const sound = sounds[name]
    if (sound) {
      sound.currentTime = 0
      sound.play()
    }
  }

  function toggleMute() {
    isMuted.value = !isMuted.value
  }

  return { play, toggleMute }
}

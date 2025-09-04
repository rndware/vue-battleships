type SoundMap = Record<string, HTMLAudioElement>

export function useSounds() {
  const sounds: SoundMap = {
    hit: new Audio('/sounds/explosion.wav'),
    sunk: new Audio('/sounds/ship-down.wav'),
  }

  // helper to play a sound by name
  function play(name: keyof typeof sounds) {
    const sound = sounds[name]
    if (sound) {
      sound.currentTime = 0
      sound.play()
    }
  }

  return { play }
}

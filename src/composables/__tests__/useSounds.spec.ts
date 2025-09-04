import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSounds } from '../useSounds'

describe('useSound', () => {
  const playMock = vi.fn()
  const AudioMock = vi.fn().mockImplementation((src: string) => {
    return {
      src,
      currentTime: 0,
      play: playMock,
    }
  })

  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('Audio', AudioMock)
  })

  it('should create sounds with correct sources', () => {
    useSounds()

    expect(AudioMock).toHaveBeenCalledWith('/sounds/explosion.wav')
    expect(AudioMock).toHaveBeenCalledWith('/sounds/ship-down.wav')
  })

  it('should reset currentTime and call play() when playing a sound', () => {
    const { play } = useSounds()

    play('hit')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hitSoundInstance = AudioMock.mock.results[0].value as any
    expect(hitSoundInstance.currentTime).toBe(0)
    expect(playMock).toHaveBeenCalled()
  })

  it('should not throw when playing an unknown sound', () => {
    const { play } = useSounds()

    expect(() => play('unknown')).not.toThrow()
  })
})

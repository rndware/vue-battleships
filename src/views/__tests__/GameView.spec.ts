import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import GameView from '../GameView.vue'

vi.mock('@/composables/useBattleshipsGame', () => {
  return {
    useBattleshipsGame: vi.fn(() => ({
      grid: [[null]],
      ships: [{ id: 1, size: 3 }],
      shotsFired: 2,
      hits: 1,
      message: 'Test message',
      messageType: 'info',
      gameStatus: 'in-progress',
      shipsRemaining: 2,
      shotsRemaining: 5,
      fireAt: vi.fn(),
      fireAtCoordinate: vi.fn(),
      resetGame: vi.fn(),
    })),
  }
})

describe('GameView', () => {
  let wrapper: ReturnType<typeof shallowMount>

  beforeEach(() => {
    wrapper = shallowMount(GameView)
  })

  it('renders GameLayout with expected props', () => {
    const gameLayout = wrapper.findComponent({ name: 'GameLayout' })
    expect(gameLayout.exists()).toBe(true)

    expect(gameLayout.props()).toMatchObject({
      grid: [[null]],
      ships: [{ id: 1, size: 3 }],
      info: {
        shotsFired: 2,
        hits: 1,
        shipsRemaining: 2,
        shotsRemaining: 5,
      },
      input: { placeholder: '(e.g. B4)' },
      message: { type: 'info', text: 'Test message' },
      gameStatus: 'in-progress',
    })
  })

  it('forwards event listeners to GameLayout', () => {
    const gameLayout = wrapper.findComponent({ name: 'GameLayout' })
    expect(gameLayout.exists()).toBe(true)

    // Vue Test Utils exposes listeners through `vm.$attrs` in stubs
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((gameLayout.vm as any).$attrs.onFire).toBeDefined()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((gameLayout.vm as any).$attrs.onSubmit).toBeDefined()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((gameLayout.vm as any).$attrs.onNewGame).toBeDefined()
  })
})

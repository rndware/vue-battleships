import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import IntroView from '../IntroView.vue'

// Mock vue-router
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

describe('IntroView', () => {
  let wrapper: ReturnType<typeof shallowMount>

  beforeEach(() => {
    mockPush.mockClear()

    wrapper = shallowMount(IntroView, {
      global: {
        stubs: {
          // Stub InfoLayout but render its default slot
          InfoLayout: {
            template: '<div><slot /></div>',
          },
        },
      },
    })
  })

  it('renders the start button', () => {
    const button = wrapper.find('button.intro__start-button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Start Game')
  })

  it('navigates to /game when start button is clicked', async () => {
    const button = wrapper.find('button.intro__start-button')
    await button.trigger('click')
    expect(mockPush).toHaveBeenCalledOnce()
    expect(mockPush).toHaveBeenCalledWith('/game')
  })
})

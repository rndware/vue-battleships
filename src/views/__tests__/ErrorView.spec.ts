import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ErrorView from '../ErrorView.vue'

describe('ErrorView', () => {
  it('renders error view with stubbed InfoLayout', () => {
    const wrapper = shallowMount(ErrorView)

    expect(wrapper.find('.error-view').exists()).toBe(true)

    const infoLayout = wrapper.findComponent({ name: 'InfoLayout' })
    expect(infoLayout.exists()).toBe(true)

    expect(infoLayout.props()).toMatchObject({
      logo: '🚢',
      title: 'Error!',
      subtitle: 'Looks like the app sunk instead!',
      animation: 'float__rotated',
    })
  })
})

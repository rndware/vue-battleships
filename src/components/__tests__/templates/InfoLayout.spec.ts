import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InfoLayout from '../../../components/templates/InfoLayout.vue'

describe('Templates / InfoLayout.vue', () => {
  it('renders logo, title, and subtitle correctly', () => {
    const wrapper = mount(InfoLayout, {
      props: {
        logo: '🚀',
        title: 'Test Title',
        subtitle: 'Test Subtitle',
      },
    })

    expect(wrapper.find('.info__logo').text()).toBe('🚀')
    expect(wrapper.find('.info__title').text()).toBe('Test Title')
    expect(wrapper.find('.info__subtitle').text()).toBe('Test Subtitle')
  })

  it('applies animation prop to the logo', () => {
    const wrapper = mount(InfoLayout, {
      props: {
        logo: '🚀',
        title: 'Title',
        subtitle: 'Subtitle',
        animation: 'float-rotated',
      },
    })

    const logo = wrapper.find('.info__logo')
    expect(logo.attributes('style')).toContain('--animation: float-rotated;')
  })

  it('renders slot content', () => {
    const wrapper = mount(InfoLayout, {
      props: {
        logo: '🚀',
        title: 'Title',
        subtitle: 'Subtitle',
      },
      slots: {
        default: '<p class="slot-content">Hello Slot</p>',
      },
    })

    expect(wrapper.find('.slot-content').exists()).toBe(true)
    expect(wrapper.find('.slot-content').text()).toBe('Hello Slot')
  })
})

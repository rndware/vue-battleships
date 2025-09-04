import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HealthDot from '../../../components/atoms/HealthDot.vue'

describe('Atoms / HealthDot.vue', () => {
  it('renders as an empty dot when filled=false', () => {
    const wrapper = mount(HealthDot, {
      props: { filled: false },
    })
    const dot = wrapper.find('span.health-dot')
    expect(dot.exists()).toBe(true)
    expect(dot.classes()).not.toContain('filled')
  })

  it('renders as a filled dot when filled=true', () => {
    const wrapper = mount(HealthDot, {
      props: { filled: true },
    })
    const dot = wrapper.find('span.health-dot')
    expect(dot.classes()).toContain('filled')
  })

  it('updates class when prop changes', async () => {
    const wrapper = mount(HealthDot, {
      props: { filled: false },
    })
    const dot = wrapper.find('span.health-dot')
    expect(dot.classes()).not.toContain('filled')

    await wrapper.setProps({ filled: true })
    expect(dot.classes()).toContain('filled')
  })
})

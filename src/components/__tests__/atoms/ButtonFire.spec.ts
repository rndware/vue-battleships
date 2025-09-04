import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonFire from '../../../components/atoms/ButtonFire.vue'

describe('Atoms / ButtonFire.vue', () => {
  it('renders with default slot text', () => {
    const wrapper = mount(ButtonFire)
    expect(wrapper.text()).toContain('Fire!')
  })

  it('renders custom slot content', () => {
    const wrapper = mount(ButtonFire, {
      slots: {
        default: 'Shoot',
      },
    })
    expect(wrapper.text()).toContain('Shoot')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(ButtonFire)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(ButtonFire, {
      attrs: { disabled: true },
    })
    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()

    await button.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})

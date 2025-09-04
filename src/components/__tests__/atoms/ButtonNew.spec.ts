import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonNew from '../../../components/atoms/ButtonNew.vue'

describe('Atoms / ButtonNew.vue', () => {
  it('renders with default slot text', () => {
    const wrapper = mount(ButtonNew)
    expect(wrapper.text()).toContain('New Game')
  })

  it('renders custom slot content', () => {
    const wrapper = mount(ButtonNew, {
      slots: {
        default: 'Restart',
      },
    })
    expect(wrapper.text()).toContain('Restart')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(ButtonNew)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(ButtonNew, {
      attrs: { disabled: true },
    })
    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()

    await button.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})

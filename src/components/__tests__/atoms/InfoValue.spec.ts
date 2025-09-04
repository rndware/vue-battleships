import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InfoValue from '../../../components/atoms/InfoValue.vue'

describe('Atoms / InfoValue.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(InfoValue, {
      slots: {
        default: '42',
      },
    })
    expect(wrapper.text()).toContain('42')
  })

  it('always has the info-value class', () => {
    const wrapper = mount(InfoValue, {
      slots: {
        default: 'Test Value',
      },
    })
    const span = wrapper.find('span')
    expect(span.classes()).toContain('info-value')
  })
})

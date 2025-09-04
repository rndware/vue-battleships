import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InfoLabel from '../../../components/atoms/InfoLabel.vue'

describe('Atoms / InfoLabel.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(InfoLabel, {
      slots: {
        default: 'Player 1',
      },
    })
    expect(wrapper.text()).toContain('Player 1')
  })

  it('always has the info-label class', () => {
    const wrapper = mount(InfoLabel, {
      slots: {
        default: 'Test Label',
      },
    })
    const span = wrapper.find('span')
    expect(span.classes()).toContain('info-label')
  })
})

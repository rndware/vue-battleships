import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import type { MessageType } from '../../../types'
import GameMessage from '../../../components/atoms/GameMessage.vue'

describe('Atoms / GameMessage.vue', () => {
  it('does not render anything if text is empty', () => {
    const wrapper = mount(GameMessage, { props: { text: '', type: 'hit' } })
    const p = wrapper.find('p.game-message')
    expect(p.exists()).toBe(false)
  })

  it('renders text with correct type class', () => {
    const wrapper = mount(GameMessage, { props: { text: 'Hit!', type: 'hit' } })
    const p = wrapper.find('p.game-message')
    expect(p.exists()).toBe(true)
    expect(p.text()).toBe('Hit!')
    expect(p.classes()).toContain('game-message--hit')
  })

  it('renders different types correctly', () => {
    const types: Array<MessageType> = ['hit', 'miss', 'sunk', 'win']

    types.forEach((type) => {
      const wrapper = mount(GameMessage, { props: { text: type.toUpperCase(), type } })
      const p = wrapper.find('p.game-message')
      expect(p.exists()).toBe(true)
      expect(p.text()).toBe(type.toUpperCase())
      expect(p.classes()).toContain(`game-message--${type}`)
    })
  })
})

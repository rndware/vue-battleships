import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import type { MessageType } from '../../../types'
import GridCell from '../../../components/molecules/GridCell.vue'

describe('Molecules / GridCell.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(GridCell, {
      slots: {
        default: 'X',
      },
    })
    expect(wrapper.text()).toBe('X')
  })

  it('applies default class when no status is provided', () => {
    const wrapper = mount(GridCell)
    const div = wrapper.find('div.grid-cell')
    expect(div.exists()).toBe(true)
    expect(div.classes()).toContain('grid-cell')
    // Should not include a status class
    expect(div.classes().some((c) => c.startsWith('grid-cell--'))).toBe(false)
  })

  it('applies correct status class when status prop is provided', () => {
    const statuses: Array<MessageType> = ['hit', 'miss', 'sunk']
    statuses.forEach((status) => {
      const wrapper = mount(GridCell, { props: { status } })
      const div = wrapper.find('div.grid-cell')
      expect(div.classes()).toContain(`grid-cell--${status}`)
    })
  })

  it('applies disabled class when disabled prop is true', () => {
    const wrapper = mount(GridCell, { props: { disabled: true } })
    const div = wrapper.find('div.grid-cell')
    expect(div.classes()).toContain('disabled')
  })

  it('does not apply disabled class when disabled prop is false', () => {
    const wrapper = mount(GridCell, { props: { disabled: false } })
    const div = wrapper.find('div.grid-cell')
    expect(div.classes()).not.toContain('disabled')
  })

  it('emits click event when clicked and not disabled', async () => {
    const wrapper = mount(GridCell)
    const div = wrapper.find('div.grid-cell')
    await div.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')!.length).toBe(1)
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(GridCell, { props: { disabled: true } })
    const div = wrapper.find('div.grid-cell')
    await div.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})

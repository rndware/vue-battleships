import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
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
    const statuses: Array<'hit' | 'miss' | 'sunk'> = ['hit', 'miss', 'sunk']
    statuses.forEach((status) => {
      const wrapper = mount(GridCell, { props: { status } })
      const div = wrapper.find('div.grid-cell')
      expect(div.classes()).toContain(`grid-cell--${status}`)
    })
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(GridCell)
    const div = wrapper.find('div.grid-cell')
    await div.trigger('click')
    const clicks = wrapper.emitted('click')
    expect(clicks && clicks.length).toBeGreaterThan(0)
  })
})

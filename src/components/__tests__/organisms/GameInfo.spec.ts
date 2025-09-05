import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GameInfo from '../../../components/organisms/GameInfo.vue'
import InfoItem from '../../../components/molecules/InfoItem.vue'

describe('Organisms / GameInfo.vue', () => {
  const props = {
    shotsFired: 10,
    hits: 4,
    shotsRemaining: 2,
    shipsRemaining: 3,
  }

  it('renders four InfoItem components', () => {
    const wrapper = mount(GameInfo, { props })
    const items = wrapper.findAllComponents(InfoItem)
    expect(items.length).toBe(4)
  })

  it('passes correct label and value to each InfoItem', () => {
    const wrapper = mount(GameInfo, { props })
    const items = wrapper.findAllComponents(InfoItem)

    expect(items[0].props()).toMatchObject({ label: 'Shots Fired', value: 10 })
    expect(items[1].props()).toMatchObject({ label: 'Hits', value: 4 })
    expect(items[2].props()).toMatchObject({ label: 'Shots Remaining', value: 2, warning: true })
    expect(items[3].props()).toMatchObject({ label: 'Ships Remaining', value: 3 })
  })

  it('renders numeric values correctly', () => {
    const wrapper = mount(GameInfo, { props })
    const items = wrapper.findAllComponents(InfoItem)

    expect(items.map((i) => i.props('value'))).toEqual([10, 4, 2, 3])
  })

  it('applies warning when shotsRemaining is less than 3', () => {
    const wrapper = mount(GameInfo, { props: { ...props, shotsRemaining: 1 } })
    const items = wrapper.findAllComponents(InfoItem)
    expect(items[2].props('warning')).toBe(true)
  })

  it('does not apply warning when shotsRemaining is 3 or more', () => {
    const wrapper = mount(GameInfo, { props: { ...props, shotsRemaining: 5 } })
    const items = wrapper.findAllComponents(InfoItem)
    expect(items[2].props('warning')).toBe(false)
  })
})

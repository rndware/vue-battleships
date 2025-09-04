import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GameInfo from '../../../components/organisms/GameInfo.vue'
import InfoItem from '../../../components/molecules/InfoItem.vue'

describe('Organisms / GameInfo.vue', () => {
  const props = {
    shotsFired: 10,
    hits: 4,
    shipsRemaining: 3,
  }

  it('renders three InfoItem components', () => {
    const wrapper = mount(GameInfo, { props })
    const items = wrapper.findAllComponents(InfoItem)
    expect(items.length).toBe(3)
  })

  it('passes correct label and value to each InfoItem', () => {
    const wrapper = mount(GameInfo, { props })
    const items = wrapper.findAllComponents(InfoItem)

    expect(items[0].props()).toEqual({ label: 'Shots Fired', value: 10 })
    expect(items[1].props()).toEqual({ label: 'Hits', value: 4 })
    expect(items[2].props()).toEqual({ label: 'Ships Remaining', value: 3 })
  })

  it('renders numeric values correctly', () => {
    const wrapper = mount(GameInfo, { props })
    const items = wrapper.findAllComponents(InfoItem)

    expect(items.map((i) => i.props('value'))).toEqual([10, 4, 3])
  })
})

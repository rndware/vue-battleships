import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ShipHealth from '../../../components/molecules/ShipHealth.vue'
import HealthDot from '../../../components/atoms/HealthDot.vue'

describe('Molecules / ShipHealth.vue', () => {
  it('renders the correct number of HealthDot components', () => {
    const wrapper = mount(ShipHealth, {
      props: { health: 2, maxHealth: 5 },
    })
    const dots = wrapper.findAllComponents(HealthDot)
    expect(dots.length).toBe(5)
  })

  it('sets filled prop correctly for each HealthDot', () => {
    const wrapper = mount(ShipHealth, {
      props: { health: 3, maxHealth: 5 },
    })
    const dots = wrapper.findAllComponents(HealthDot)

    dots.forEach((dotWrapper, index) => {
      const expected = index < 3 // first 3 dots should be filled
      expect(dotWrapper.props('filled')).toBe(expected)
    })
  })

  it('renders all empty dots when health is 0', () => {
    const wrapper = mount(ShipHealth, {
      props: { health: 0, maxHealth: 4 },
    })
    const dots = wrapper.findAllComponents(HealthDot)
    dots.forEach((dotWrapper) => {
      expect(dotWrapper.props('filled')).toBe(false)
    })
  })

  it('renders all filled dots when health equals maxHealth', () => {
    const wrapper = mount(ShipHealth, {
      props: { health: 4, maxHealth: 4 },
    })
    const dots = wrapper.findAllComponents(HealthDot)
    dots.forEach((dotWrapper) => {
      expect(dotWrapper.props('filled')).toBe(true)
    })
  })
})

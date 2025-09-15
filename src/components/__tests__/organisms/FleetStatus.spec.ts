import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FleetStatus from '../../../components/organisms/FleetStatus.vue'
import ShipHealth from '../../../components/molecules/ShipHealth.vue'

describe('Organisms / FleetStatus.vue', () => {
  const ships = [
    { name: 'Destroyer', size: 2, hits: 1 },
    { name: 'Submarine', size: 3, hits: 3 },
    { name: 'Battleship', size: 4, hits: 2 },
  ]

  it('renders the correct number of ships', () => {
    const wrapper = mount(FleetStatus, { props: { ships } })
    const shipDivs = wrapper.findAll('.fleet-status__ship')
    expect(shipDivs.length).toBe(ships.length)
  })

  it('displays ship names and sizes correctly', () => {
    const wrapper = mount(FleetStatus, { props: { ships } })
    const shipNames = wrapper.findAll('.fleet-status__ship-name')

    shipNames.forEach((el, index) => {
      expect(el.text()).toContain(ships[index].name)
      expect(el.text()).toContain(ships[index].size.toString())
    })
  })

  it('renders default title when none is provided', () => {
    const wrapper = mount(FleetStatus, { props: { ships } })
    const title = wrapper.find('.fleet-status__title')
    expect(title.text()).toContain('Fleet Status')
  })

  it('renders custom title when provided', () => {
    const customTitle = 'My Fleet'
    const wrapper = mount(FleetStatus, { props: { ships, title: customTitle } })
    const title = wrapper.find('.fleet-status__title')
    expect(title.text()).toContain(customTitle)
  })

  it('passes correct props to ShipHealth for each ship', () => {
    const wrapper = mount(FleetStatus, { props: { ships } })
    const healthComponents = wrapper.findAllComponents(ShipHealth)

    healthComponents.forEach((comp, index) => {
      expect(comp.props('health')).toBe(ships[index].hits)
      expect(comp.props('maxHealth')).toBe(ships[index].size)
    })
  })

  it('LED is not always on by default and should blink', () => {
    const wrapper = mount(FleetStatus, { props: { ships } })
    const led = wrapper.find('.led')
    expect(led.classes()).not.toContain('led--always-on')
  })

  it('LED is always on when ledMode is "on"', () => {
    const wrapper = mount(FleetStatus, { props: { ships, ledMode: 'on' } })
    const led = wrapper.find('.led')
    expect(led.classes()).toContain('led--always-on')
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InfoItem from '../../../components/molecules/InfoItem.vue'
import InfoLabel from '../../../components/atoms/InfoLabel.vue'
import InfoValue from '../../../components/atoms/InfoValue.vue'

describe('Molecules / InfoItem.vue', () => {
  it('renders label inside InfoLabel', () => {
    const wrapper = mount(InfoItem, {
      props: { label: 'Player', value: 5 },
    })

    const labelComponent = wrapper.findComponent(InfoLabel)
    expect(labelComponent.exists()).toBe(true)
    expect(labelComponent.text()).toBe('Player')
  })

  it('renders value inside InfoValue', () => {
    const wrapper = mount(InfoItem, {
      props: { label: 'Player', value: 5 },
    })

    const valueComponent = wrapper.findComponent(InfoValue)
    expect(valueComponent.exists()).toBe(true)
    expect(valueComponent.text()).toBe('5')
  })

  it('renders string values correctly', () => {
    const wrapper = mount(InfoItem, {
      props: { label: 'Status', value: 'Ready' },
    })

    expect(wrapper.findComponent(InfoValue).text()).toBe('Ready')
  })
})

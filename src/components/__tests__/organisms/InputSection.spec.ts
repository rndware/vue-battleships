import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputSection from '../../../components/organisms/InputSection.vue'
import InputCoordinate from '../../../components/atoms/InputCoordinate.vue'
import ButtonFire from '../../../components/atoms/ButtonFire.vue'

describe('Organisms / InputSection.vue', () => {
  it('renders child components', () => {
    const wrapper = mount(InputSection, {
      props: { modelValue: '' },
    })

    expect(wrapper.findComponent(InputCoordinate).exists()).toBe(true)
    expect(wrapper.findComponent(ButtonFire).exists()).toBe(true)
  })

  it('binds modelValue to InputCoordinate', async () => {
    const wrapper = mount(InputSection, {
      props: { modelValue: 'A1' },
    })
    const input = wrapper.findComponent(InputCoordinate)

    // Should have initial value
    expect(input.props('modelValue')).toBe('A1')

    // Emitting update should update wrapper value
    await input.vm.$emit('update:modelValue', 'B2')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['B2'])
  })

  it('fires submit event when button is clicked and value is present', async () => {
    const wrapper = mount(InputSection, {
      props: { modelValue: 'A1', disabled: false },
    })
    const button = wrapper.findComponent(ButtonFire)

    await button.trigger('click')
    expect(wrapper.emitted('submit')).toBeTruthy()
  })

  it('fires submit event when InputCoordinate emits submit and value is present', async () => {
    const wrapper = mount(InputSection, {
      props: { modelValue: 'A1', disabled: false },
    })
    const input = wrapper.findComponent(InputCoordinate)

    await input.vm.$emit('submit')
    expect(wrapper.emitted('submit')).toBeTruthy()
  })

  it('does not fire submit when disabled', async () => {
    const wrapper = mount(InputSection, {
      props: { modelValue: 'A1', disabled: true },
    })
    const button = wrapper.findComponent(ButtonFire)

    await button.trigger('click')
    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('does not fire submit when value is empty', async () => {
    const wrapper = mount(InputSection, {
      props: { modelValue: '', disabled: false },
    })
    const button = wrapper.findComponent(ButtonFire)

    await button.trigger('click')
    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('passes placeholder prop to InputCoordinate', () => {
    const placeholder = 'Enter coordinate'
    const wrapper = mount(InputSection, {
      props: { modelValue: '', placeholder },
    })

    const input = wrapper.findComponent(InputCoordinate)
    expect(input.props('placeholder')).toBe(placeholder)
  })
})

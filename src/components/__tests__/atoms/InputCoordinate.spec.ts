import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputCoordinate from '../../../components/atoms/InputCoordinate.vue'

describe('Atoms / InputCoordinate.vue', () => {
  it('renders with initial modelValue and placeholder', () => {
    const wrapper = mount(InputCoordinate, {
      props: { modelValue: 'B4', placeholder: 'Enter coord' },
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('B4')
    expect(input.attributes('placeholder')).toBe('Enter coord')
  })

  it('emits update:modelValue with uppercase and filtered input', async () => {
    const wrapper = mount(InputCoordinate, {
      props: { modelValue: '' },
    })
    const input = wrapper.find('input')

    // Type lowercase with invalid chars
    await input.setValue('a1x')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['A1'])

    // Type valid input within 3 chars
    await input.setValue('c10')
    expect(wrapper.emitted('update:modelValue')![1]).toEqual(['C10'])
  })

  it('truncates input longer than 3 chars', async () => {
    const wrapper = mount(InputCoordinate, { props: { modelValue: '' } })
    const input = wrapper.find('input')

    await input.setValue('A10B')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['A10'])
  })

  it('emits submit on Enter key', async () => {
    const wrapper = mount(InputCoordinate, { props: { modelValue: '' } })
    const input = wrapper.find('input')

    await input.trigger('keyup.enter')
    expect(wrapper.emitted('submit')).toHaveLength(1)
  })
})

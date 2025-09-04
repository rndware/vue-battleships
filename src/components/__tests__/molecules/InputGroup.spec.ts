import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputGroup from '../../../components/molecules/InputGroup.vue'

describe('Molecules / InputGroup.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(InputGroup, {
      slots: {
        default: '<button>Click Me</button>',
      },
    })

    expect(wrapper.html()).toContain('<button>Click Me</button>')
  })

  it('has the input-group class', () => {
    const wrapper = mount(InputGroup)
    const div = wrapper.find('div.input-group')
    expect(div.exists()).toBe(true)
    expect(div.classes()).toContain('input-group')
  })
})

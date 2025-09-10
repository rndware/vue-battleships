import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import NotFoundView from '../NotFoundView.vue'
import InfoLayout from '@/components/templates/InfoLayout.vue'

describe('NotFoundView', () => {
  it('renders InfoLayout with correct props', () => {
    const wrapper = shallowMount(NotFoundView, {
      global: {
        stubs: {
          InfoLayout: {
            props: ['logo', 'title', 'subtitle'],
            template: '<div />', // minimal template
          },
        },
      },
    })

    // Use the component reference for finding
    const infoLayout = wrapper.findComponent(InfoLayout)
    expect(infoLayout.exists()).toBe(true)

    expect(infoLayout.props()).toEqual({
      logo: '🚢',
      title: 'Not Found',
      subtitle: 'The page you are looking for does not exist.',
    })
  })
})

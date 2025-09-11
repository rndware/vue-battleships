import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import ButtonMute from '@/components/molecules/ButtonMute.vue'

const mockUseSounds = () => {
  const isMuted = ref(false)
  return {
    toggleMute: () => {
      isMuted.value = !isMuted.value
      console.log('Sound toggled:', isMuted.value ? 'Muted' : 'Unmuted')
    },
    isMuted: isMuted.value
  }
}

const meta: Meta<typeof ButtonMute> = {
  title: 'Components/Molecules/ButtonMute',
  component: ButtonMute,
  parameters: {
    docs: {
      description: {
        component: 'A toggle button for muting and unmuting sounds in the application. Uses the useSounds composable to manage audio state. Displays different icons and text based on the current mute state with smooth transitions.'
      }
    }
  },
  argTypes: {
    default: {
      control: 'text',
      description: 'Custom content to display instead of default mute/unmute text',
      table: {
        type: { summary: 'string | VNode' }
      }
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { ButtonMute },
    setup() {
      // Mock the composable for this story
      const sounds = mockUseSounds()
      return { sounds }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <ButtonMute />
        <p>
          Click the button to toggle between mute and unmute states. Check the console for audio state changes.
        </p>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Default mute button showing the toggle functionality between muted (🔇 Unmute) and unmuted (🔊 Mute) states.'
      }
    }
  }
}

export const CustomContent: Story = {
  args: {
    default: 'Toggle Audio'
  },
  render: (args) => ({
    components: { ButtonMute },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <ButtonMute>{{ args.default }}</ButtonMute>
        <p>
          Custom slot content overrides the default mute/unmute text and icons.
        </p>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Button with custom slot content that replaces the default mute/unmute text and icons.'
      }
    }
  }
}

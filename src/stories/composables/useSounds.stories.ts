import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useSounds } from '@/composables/useSounds'
import ButtonNew from '@/components/atoms/ButtonNew.vue'

const meta: Meta = {
  title: 'Composables/useSounds',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A composable for playing game sounds and toggling mute state.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const Template = () => ({
  components: { ButtonNew },
  setup() {
    const { play, toggleMute } = useSounds()
    const isMuted = ref(false)

    function handleToggleMute() {
      toggleMute()
      isMuted.value = !isMuted.value
    }

    return { play, handleToggleMute, isMuted }
  },
  template: `
    <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
      <ButtonNew @click="play('hit')">Play Hit Sound 💥</ButtonNew>
      <ButtonNew @click="play('sunk')">Play Sunk Sound 🔥</ButtonNew>
      <ButtonNew @click="handleToggleMute">
        {{ isMuted ? 'Unmute Sounds' : 'Mute Sounds' }}
      </ButtonNew>
      <p>Current state: <strong>{{ isMuted ? 'Muted' : 'Unmuted' }}</strong></p>
    </div>
  `,
})

export const Default: Story = {
  render: Template,
  name: 'Default',
}

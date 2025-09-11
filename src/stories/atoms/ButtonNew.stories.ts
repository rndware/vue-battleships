import ButtonNew from '@/components/atoms/ButtonNew.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof ButtonNew> = {
  title: 'Components/Atoms/ButtonNew',
  component: ButtonNew,
  parameters: {
    docs: {
      description: {
        component: 'A button component for starting a new game. Provides consistent styling with a bold appearance and hover effects.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    default: { control: 'text', name: 'Label' },
    onClick: { action: 'clicked' },
  },
}

export default meta
type Story = StoryObj<typeof ButtonNew>

export const Default: Story = {
  render: (args) => ({
    components: { ButtonNew },
    setup() {
      return { args }
    },
    template: `
      <div>
        <p>Start a new game by clicking the button below.</p>
        <ButtonNew v-bind="args" />
      </div>
    `,
  }),
  args: {
    default: 'New Game',
  },
}

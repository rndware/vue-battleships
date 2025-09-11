import ButtonFire from '@/components/atoms/ButtonFire.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof ButtonFire> = {
  title: 'Components/Atoms/ButtonFire',
  component: ButtonFire,
  parameters: {
    docs: {
      description: {
        component: 'A button component for firing actions in the game. Provides consistent styling with a bold appearance and hover effects.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    default: { control: 'text', name: 'Label' },
    onClick: { action: 'clicked' },
  },
}

export default meta
type Story = StoryObj<typeof ButtonFire>

export const Default: Story = {
  render: (args) => ({
    components: { ButtonFire },
    setup() {
      return { args }
    },
    template: `
      <div>
        <p>Click the most important button in the game, the fire button!</p>
        <ButtonFire v-bind="args" />
      </div>
    `,
  }),
  args: {
    default: '🚀 Fire!',
    disabled: false,
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { ButtonFire },
    setup() {
      return { args }
    },
    template: `
      <div>
        <p>Can't click button when disabled (aka bad coordinate)</p>
        <ButtonFire v-bind="args" />
      </div>
    `,
  }),
  args: {
    default: '🚀 Fire!',
    disabled: true,
  },
}

export const CustomLabel: Story = {
  args: {
    default: '🔥 Launch Missiles',
    disabled: false,
  },
}

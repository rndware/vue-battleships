import type { Meta, StoryObj } from '@storybook/vue3'
import ShipHealth from '@/components/molecules/ShipHealth.vue'

const meta: Meta<typeof ShipHealth> = {
  title: 'Components/Molecules/ShipHealth',
  component: ShipHealth,
  tags: ['autodocs'],
  argTypes: {
    health: { control: { type: 'number', min: 0 }, description: 'Current health of the ship' },
    maxHealth: { control: { type: 'number', min: 1 }, description: 'Maximum health of the ship' },
  },
}

export default meta
type Story = StoryObj<typeof ShipHealth>

export const Default: Story = {
  args: {
    health: 3,
    maxHealth: 5,
  },
}

export const FullHealth: Story = {
  args: {
    health: 5,
    maxHealth: 5,
  },
}

export const NoHealth: Story = {
  args: {
    health: 0,
    maxHealth: 5,
  },
}

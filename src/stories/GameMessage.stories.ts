import GameMessage from '@/components/atoms/GameMessage.vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import type { MessageType } from '@/types'

const meta: Meta<typeof GameMessage> = {
  title: 'Components/Atoms/GameMessage',
  parameters: {
    docs: {
      description: {
        component: 'A message component for displaying game status updates. Provides consistent styling with appropriate colors and icons for each message type.'
      }
    }
  },
  component: GameMessage,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text', name: 'Text' },
    type: {
      control: { type: 'select' },
      options: ['hit', 'miss', 'sunk', 'win', 'lose'] as MessageType[],
      name: 'Type'
    }
  }
}

export default meta

type Story = StoryObj<typeof GameMessage>

export const Hit: Story = {
  args: {
    text: 'Hit!',
    type: 'hit'
  }
}

export const Miss: Story = {
  args: {
    text: 'Miss!',
    type: 'miss'
  }
}

export const Sunk: Story = {
  args: {
    text: 'Ship sunk!',
    type: 'sunk'
  }
}

export const Win: Story = {
  args: {
    text: 'You win!',
    type: 'win'
  }
}

export const Lose: Story = {
  args: {
    text: 'You lose!',
    type: 'lose'
  }
}

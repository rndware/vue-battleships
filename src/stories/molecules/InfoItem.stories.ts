import type { Meta, StoryObj } from '@storybook/vue3'
import InfoItem from '@/components/molecules/InfoItem.vue'

const meta: Meta<typeof InfoItem> = {
  title: 'Components/Molecules/InfoItem',
  component: InfoItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Displays a label and value pair detailing the game status, optionally highlighting a warning state.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label text' },
    value: { control: 'text', description: 'Value text or number' },
    warning: { control: 'boolean', description: 'Apply warning style' },
  },
}

export default meta
type Story = StoryObj<typeof InfoItem>

export const Default: Story = {
  args: {
    label: 'Score',
    value: 42,
    warning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default InfoItem showing a normal value.',
      },
    },
  },
}

export const Warning: Story = {
  args: {
    label: 'Health',
    value: 10,
    warning: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'InfoItem displaying a warning state.',
      },
    },
  },
}

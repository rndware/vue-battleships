import type { Meta, StoryObj } from '@storybook/vue3'
import GridCell from '@/components/molecules/GridCell.vue'

const meta: Meta<typeof GridCell> = {
  title: 'Components/Molecules/GridCell',
  component: GridCell,
  parameters: {
    docs: {
      description: {
        component:
          'A single grid cell used in a Battleship-style game board. Supports statuses like `hit`, `miss`, and `sunk`. Can be disabled to prevent clicks. Slot content is displayed centered inside the cell.',
      },
    },
  },
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['pristine', 'hit', 'miss', 'sunk'],
      description: 'Visual status of the cell',
      table: {
        type: { summary: 'pristine | hit | miss | sunk' },
        defaultValue: { summary: 'pristine' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables click interaction',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    onClick: {
      action: 'clicked',
      description: 'Emitted when the cell is clicked (unless disabled)',
      table: { type: { summary: '() => void' } },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: false,
  },
  render: (args) => ({
    components: { GridCell },
    setup() {
      const handleClick = () => {
        console.log('Cell clicked!')
      }
      return { args, handleClick }
    },
    template: '<p>Hover to see effect. Click to log message.</p><GridCell v-bind="args" @click="handleClick"></GridCell>',
  }),
  parameters: {
    docs: {
      description: {
        story: 'Basic grid cell in its default pristine state.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { GridCell },
    setup() {
      return { args }
    },
    template: '<GridCell v-bind="args">B2</GridCell>',
  }),
  parameters: {
    docs: {
      description: {
        story: 'A disabled cell that cannot be clicked. Hover effects are disabled.',
      },
    },
  },
}

export const Hit: Story = {
  args: { status: 'hit' },
  render: (args) => ({
    components: { GridCell },
    setup() {
      return { args }
    },
    template: '<GridCell v-bind="args">💥</GridCell>',
  }),
  parameters: {
    docs: {
      description: {
        story: 'Cell showing a "hit" status with animation.',
      },
    },
  },
}

export const Miss: Story = {
  args: { status: 'miss' },
  render: (args) => ({
    components: { GridCell },
    setup() {
      return { args }
    },
    template: '<GridCell v-bind="args">💦</GridCell>',
  }),
  parameters: {
    docs: {
      description: {
        story: 'Cell showing a "miss" status.',
      },
    },
  },
}

export const Sunk: Story = {
  args: { status: 'sunk' },
  render: (args) => ({
    components: { GridCell },
    setup() {
      return { args }
    },
    template: '<GridCell v-bind="args">🔥</GridCell>',
  }),
  parameters: {
    docs: {
      description: {
        story: 'Cell showing a "sunk" status with pulsing animation.',
      },
    },
  },
}

import type { Meta, StoryObj } from '@storybook/vue3'
import GameInfo from '@/components/organisms/GameInfo.vue'
import InfoItem from '@/components/molecules/InfoItem.vue'

const meta: Meta<typeof GameInfo> = {
  title: 'Components/Organisms/GameInfo',
  component: GameInfo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The `GameInfo` component displays key game statistics such as shots fired, hits, shots remaining, and ships remaining. It uses `InfoItem` to present label-value pairs and highlights warnings when critical thresholds are reached (e.g., low shots remaining).',
      },
    },
  },
  argTypes: {
    shotsFired: {
      control: { type: 'number' },
      description: 'Total number of shots the player has fired.',
    },
    hits: {
      control: { type: 'number' },
      description: 'Number of successful hits made by the player.',
    },
    shotsRemaining: {
      control: { type: 'number' },
      description: 'Number of shots left. Shows a warning state if 3 or fewer remain.',
    },
    shipsRemaining: {
      control: { type: 'number' },
      description: 'Number of enemy ships still in play.',
    },
  },
}

export default meta
type Story = StoryObj<typeof GameInfo>

export const Default: Story = {
  args: {
    shotsFired: 10,
    hits: 4,
    shotsRemaining: 6,
    shipsRemaining: 3,
  },
}

export const LowShotsWarning: Story = {
  args: {
    shotsFired: 20,
    hits: 7,
    shotsRemaining: 2,
    shipsRemaining: 2,
  },
}

export const NoShipsRemaining: Story = {
  args: {
    shotsFired: 25,
    hits: 10,
    shotsRemaining: 5,
    shipsRemaining: 0,
  },
}

export const UpdatedSlots: Story = {
  args: {
    shotsFired: 25,
    hits: 10,
    shotsRemaining: 5,
    shipsRemaining: 0,
  },
  render: (args) => ({
    components: { GameInfo, InfoItem },
    setup() {
      return { args }
    },
    template: `
      <GameInfo v-bind="args">
        <InfoItem label="Shots" :value="args.shotsFired" />
        <InfoItem label="Hits" :value="args.hits" />
        <InfoItem label="Shots Remaining" :value="args.shotsRemaining" :warning="args.shotsRemaining <= 3" />
        <InfoItem label="Ships Remaining" :value="args.shipsRemaining" />
        <InfoItem label="Time Left" value="12:00" />
      </GameInfo>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'A disabled cell that cannot be clicked. Hover effects are disabled.',
      },
    },
  },
}

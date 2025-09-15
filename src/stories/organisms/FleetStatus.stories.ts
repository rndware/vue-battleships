import type { Meta, StoryObj } from '@storybook/vue3'
import ShipStatus from '@/components/organisms/FleetStatus.vue'
import type { Ship } from '@/types'

const meta: Meta<typeof ShipStatus> = {
  title: 'Components/Organisms/FleetStatus',
  component: ShipStatus,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The `FleetStatus` component displays the current status of all ships in the fleet. Each ship is listed with its name, size, and a visual health indicator (`ShipHealth`) showing remaining durability. A blinking LED in the title reinforces the active status of the fleet panel.',
      },
    },
  },
  argTypes: {
    ships: {
      control: { type: 'object' },
      description:
        'An array of `Ship` objects, each containing a name, size (number of squares), and current hit count.',
    },
  },
}

export default meta
type Story = StoryObj<typeof ShipStatus>

const sampleShips: Ship[] = [
  { name: 'Carrier', size: 5, hits: 5, positions: [] },
  { name: 'Battleship', size: 4, hits: 3, positions: [] },
  { name: 'Cruiser', size: 3, hits: 1, positions: [] },
  { name: 'Submarine', size: 3, hits: 0, positions: [] },
  { name: 'Destroyer', size: 2, hits: 2, positions: [] },
]

export const Default: Story = {
  args: {
    ships: sampleShips,
  },
}

export const AllIntact: Story = {
  args: {
    ships: [
      { name: 'Carrier', size: 5, hits: 0, positions: [] },
      { name: 'Battleship', size: 4, hits: 0, positions: [] },
      { name: 'Cruiser', size: 3, hits: 0, positions: [] },
      { name: 'Submarine', size: 3, hits: 0, positions: [] },
      { name: 'Destroyer', size: 2, hits: 0, positions: [] },
    ],
  },
}

export const AllDestroyed: Story = {
  args: {
    ships: [
      { name: 'Carrier', size: 5, hits: 5, positions: [] },
      { name: 'Battleship', size: 4, hits: 4, positions: [] },
      { name: 'Cruiser', size: 3, hits: 3, positions: [] },
      { name: 'Submarine', size: 3, hits: 3, positions: [] },
      { name: 'Destroyer', size: 2, hits: 2, positions: [] },
    ],
  },
}

export const SmallList: Story = {
  args: {
    ships: [
      { name: 'Carrier', size: 5, hits: 5, positions: [] },
      { name: 'Battleship', size: 4, hits: 4, positions: [] },
    ],
  },
}

export const MixedDamage: Story = {
  args: {
    ships: [
      { name: 'Carrier', size: 5, hits: 2, positions: [] },
      { name: 'Battleship', size: 4, hits: 4, positions: [] },
      { name: 'Cruiser', size: 3, hits: 1, positions: [] },
      { name: 'Submarine', size: 3, hits: 0, positions: [] },
      { name: 'Destroyer', size: 2, hits: 1, positions: [] },
    ],
  },
}

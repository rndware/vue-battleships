import type { Meta, StoryObj } from '@storybook/vue3'
import { shallowReactive } from 'vue'
import GameBoard from '@/components/organisms/GameBoard.vue'
import type { GridCellData } from '@/types'

const sampleGrid: GridCellData[][] = Array.from({ length: 5 }, () =>
  Array.from({ length: 5 }, () => (
    shallowReactive({
      ship: null,
      hit: false,
      sunk: false,
      miss: false,
    } as GridCellData)
  ))
)

const meta: Meta<typeof GameBoard> = {
  title: 'Components/Molecules/GameBoard',
  component: GameBoard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A grid-based game board used in Battleship-style games. ' +
          'Each cell can represent different states such as **hit**, **miss**, or **sunk**. ' +
          'The board emits a `fire` event when a cell is clicked, allowing interaction logic to be handled externally. ' +
          'It can also be disabled to prevent user interaction.',
      },
    },
  },
  argTypes: {
    grid: { control: 'object', description: '2D array representing the game board cells' },
    disabled: { control: 'boolean', description: 'Whether the board is disabled' },
    onFire: { action: 'fire', description: 'Emitted when a cell is clicked' },
  },
}

export default meta
type Story = StoryObj<typeof GameBoard>

export const Default: Story = {
  args: {
    grid: sampleGrid,
    disabled: false,
  },
}

export const DifferentSizedGird: Story = {
  args: {
    grid: [
      Array(6).fill({ hit: false, miss: false, sunk: false }),
      Array(6).fill({ hit: false, miss: false, sunk: false }),
      Array(6).fill({ hit: false, miss: false, sunk: false }),
    ],
    disabled: false,
  },
}

export const SomeHitsAndMisses: Story = {
  args: {
    grid: [
      [
        { hit: true, miss: false, sunk: false },
        { hit: false, miss: false, sunk: false },
        { hit: false, miss: true, sunk: false },
        { hit: false, miss: false, sunk: false },
        { hit: false, miss: false, sunk: false },
      ],
      Array(5).fill({ hit: false, miss: false, sunk: false }),
      Array(5).fill({ hit: false, miss: false, sunk: true }),
      Array(5).fill({ hit: false, miss: false, sunk: false }),
      Array(5).fill({ hit: false, miss: false, sunk: false }),
    ],
    disabled: false,
  },
}

export const WithCustomCellContent: Story = {
  args: {
    grid: [
      [
        { hit: true, miss: false, sunk: false },
        { hit: false, miss: false, sunk: false },
        { hit: false, miss: true, sunk: false },
        { hit: false, miss: false, sunk: false },
        { hit: false, miss: false, sunk: false },
      ],
      Array(5).fill({ hit: false, miss: false, sunk: false }),
      Array(5).fill({ hit: false, miss: false, sunk: true }),
      Array(5).fill({ hit: false, miss: false, sunk: false }),
      Array(5).fill({ hit: false, miss: false, sunk: false }),
    ],
  },
  render: (args) => ({
    components: { GameBoard },
    setup() {
      return { args }
    },
    template: `
      <GameBoard v-bind="args" @fire="args.fire">
        <template #cellContent="{ cell }">
          <span v-if="cell.ship">-</span>
          <span v-else-if="cell.hit">+</span>
          <span v-else-if="cell.miss">0</span>
          <span v-else-if="cell.sunk">x</span>
        </template>
      </GameBoard>
    `,
  }),
}

export const DisabledBoard: Story = {
  args: {
    grid: sampleGrid,
    disabled: true,
  },
}

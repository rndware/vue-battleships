import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { useBattleshipsGame } from '@/composables/useBattleshipsGame'
import InputCoordinate from '@/components/atoms/InputCoordinate.vue'
import GridCell from '@/components/molecules/GridCell.vue'

const meta: Meta = {
  title: 'Composables/useBattleshipsGame',
  parameters: {
    docs: {
      description: {
        component:
          'Composable managing the full Battleships game state. Handles grid initialization, random ship placement, firing shots, tracking hits/misses, updating messages, sounds, and game win/lose conditions.'
      }
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj

export const DefaultGame: Story = {
  render: () => ({
    components: { InputCoordinate, GridCell },
    setup() {
      const game = useBattleshipsGame()
      const coord = ref('')

      const handleFire = () => {
        if (coord.value) {
          game.fireAtCoordinate(coord.value)
          coord.value = ''
        }
      }

      return { game, coord, handleFire }
    },
    template: `
      <div style="padding: 24px; background: #f9fafb; border-radius: 12px; max-width: 600px;">
        <h3 style="margin: 0 0 16px 0; text-align: center;">🚢 Battleships Game</h3>

        <!-- Status message -->
        <p :class="'message--' + game.messageType" style="text-align: center; font-weight: bold; margin-bottom: 16px;">
          {{ game.message || 'Game in progress...' }}
        </p>

        <!-- Game stats -->
        <div style="display: flex; justify-content: space-around; margin-bottom: 16px;">
          <div>Shots Fired: <strong>{{ game.shotsFired }}</strong></div>
          <div>Shots Remaining: <strong>{{ game.shotsRemaining }}</strong></div>
          <div>Ships Remaining: <strong>{{ game.shipsRemaining }}</strong></div>
        </div>

        <div style="display: flex; justify-content: center; margin-bottom: 16px;">
          Ship Coordinates: &nbsp;
          <strong>
            {{
              game.ships.value
                .map(ship =>
                  ship.positions
                    .map(pos => String.fromCharCode(65 + pos.col) + (pos.row + 1))
                    .join(', ')
                )
                .join(' | ')
            }}
          </strong>
        </div>

        <!-- Input to fire at coordinates -->
        <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 20px;">
          <InputCoordinate v-model="coord" placeholder="A1" @submit="handleFire" />
          <button
            @click="handleFire"
            :disabled="!coord || game.gameStatus !== 'in-progress'"
            style="padding: 8px 16px; border: none; border-radius: 6px; background: #3b82f6; color: white; font-weight: 600; cursor: pointer;"
          >
            🎯 Fire
          </button>
          <button
            @click="game.resetGame"
            style="padding: 8px 16px; border: none; border-radius: 6px; background: #6b7280; color: white; font-weight: 600; cursor: pointer;"
          >
            🔄 Reset
          </button>
        </div>

        <!-- Grid display -->
        <div
          style="display: grid; grid-template-columns: repeat(auto-fill, 40px); gap: 4px; justify-content: center;"
        >
          <GridCell
            v-for="(row, rIdx) in game.grid"
            :key="rIdx"
            v-for="(cell, cIdx) in row"
            :status="cell.sunk ? 'sunk' : cell.hit ? 'hit' : cell.miss ? 'miss' : 'pristine'"
            :disabled="game.gameStatus !== 'in-progress'"
          >
            {{ String.fromCharCode(65 + rIdx) }}{{ cIdx + 1 }}
          </GridCell>
        </div>

        <!-- Game over status -->
        <p v-if="game.gameStatus !== 'in-progress'" style="margin-top: 16px; text-align: center; font-size: 14px; color: #374151;">
        </p>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Full interactive demo using the composable. Fire at cells by entering coordinates (A1, B5, etc.), track hits and misses, and reset the game when over.'
      }
    }
  }
}

<template>
  <div class="game-board">
    <!-- Column headers -->
    <div class="game-board__header">
      <div class="game-board__corner"></div>
      <div
        v-for="(col, colIndex) in grid[0].length"
        :key="colIndex"
        class="game-board__header-cell"
      >
        {{ String.fromCharCode(65 + colIndex) }}
      </div>
    </div>

    <!-- Rows with numbers -->
    <div class="game-board__row" v-for="(row, rowIndex) in grid" :key="rowIndex">
      <div class="game-board__row-label">{{ rowIndex + 1 }}</div>
      <div class="game-board__row-cells">
        <GridCell
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          :status="getStatus(cell)"
          :disabled="disabled"
          @click="$emit('fire', { row: rowIndex, col: colIndex })"
        >
          {{ getContent(cell) }}
        </GridCell>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GridCell from '@/components/molecules/GridCell.vue'
import type { GridCellData } from '@/types'
import config from '@/config/app.json'

const cellEmoji = config.data.cellEmoji

defineProps<{ grid: GridCellData[][]; disabled?: boolean }>()
defineEmits(['fire'])

const getStatus = (cell: GridCellData) => {
  if (cell.sunk) return 'sunk'
  if (cell.hit) return 'hit'
  if (cell.miss) return 'miss'
  return ''
}

const getContent = (cell: GridCellData) => {
  if (cell.sunk) return cellEmoji.sunk
  if (cell.hit) return cellEmoji.hit
  if (cell.miss) return cellEmoji.miss
  return ''
}
</script>

<style scoped>
.game-board {
  display: inline-block;
  overflow: hidden;
}

.game-board__header {
  display: flex;
}

.game-board__header-cell {
  border: 1px solid transparent;
  width: var(--cell-size);
  color: var(--blue-dark);
  text-align: center;
  font-weight: bold;
  padding: 4px 0;
}

.game-board__row {
  display: flex;
  align-items: center;
}

.game-board__row-label {
  color: var(--blue-dark);
  width: 30px;
  text-align: center;
  font-weight: bold;
  min-width: 2ch;
}

.game-board__row-cells {
  display: flex;
}

.game-board__header + .game-board__row {
  .game-board__row-cells .grid-cell:first-of-type {
    border-top-left-radius: var(--table-corner-radius);
  }
  .game-board__row-cells .grid-cell:last-of-type {
    border-top-right-radius: var(--table-corner-radius);
  }
}

.game-board__row:last-child {
  .game-board__row-cells .grid-cell:first-of-type {
    border-bottom-left-radius: var(--table-corner-radius);
  }
  .game-board__row-cells .grid-cell:last-of-type {
    border-bottom-right-radius: var(--table-corner-radius);
  }
}

@media (max-width: 768px) {
  .game-board__header-cell {
    width: 35px;
    font-size: 16px;
  }
}
</style>

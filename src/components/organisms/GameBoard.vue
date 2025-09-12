<template>
  <div class="game-board" :style="{ '--grid-cols': grid[0].length, '--grid-rows': grid.length }">
    <!-- Empty corner cell -->
    <div class="game-board__corner"></div>

    <!-- Column headers -->
    <div v-for="(_, colIndex) in grid[0].length" :key="colIndex" class="game-board__header-cell">
      {{ String.fromCharCode(65 + colIndex) }}
    </div>

    <!-- Rows with row labels and cells -->
    <template v-for="(row, rowIndex) in grid" :key="rowIndex">
      <div class="game-board__row-label">{{ rowIndex + 1 }}</div>
      <GridCell
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        :status="getStatus(cell)"
        :disabled="disabled"
        @click="$emit('fire', { row: rowIndex, col: colIndex })"
      >
        <slot name="cellContent" :cell="cell">
          {{ getContent(cell) }}
        </slot>
      </GridCell>
    </template>
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
  display: grid;
  grid-template-columns: var(--grid-header-size) repeat(var(--grid-cols), var(--cell-size));
  grid-template-rows: var(--grid-header-size) repeat(var(--grid-rows), var(--cell-size));
  overflow: hidden;
}

.game-board__corner {
  grid-column: 1;
  grid-row: 1;
}

.game-board__header-cell {
  grid-row: 1;
  border: 1px solid transparent;
  color: var(--grid-header-color);
  text-align: center;
  font-weight: bold;
  padding: 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-board__row-label {
  grid-column: 1;
  color: var(--grid-header-color);
  text-align: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .game-board {
    grid-template-columns: var(--grid-header-size) repeat(var(--grid-cols), var(--cell-size-sm));
    grid-template-rows: var(--grid-header-size) repeat(var(--grid-rows), var(--cell-size-sm));
  }

  .game-board__header-cell {
    font-size: var(--grid-header-font-size);
  }
}
</style>

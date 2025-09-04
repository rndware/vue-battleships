import type { Coordinate, GridCellData } from '@/types'
import config from '@/config/app.json'

const { rows, cols } = config.data.grid

/**
 * Checks whether a given row and column are within the game grid bounds.
 *
 * @param row - Row index to check.
 * @param col - Column index to check.
 * @returns True if the position is inside the grid, false otherwise.
 */
const isWithinGridBounds = (row: number, col: number): boolean => {
  return row >= 0 && row < rows && col >= 0 && col < cols
}

/**
 * Parses a user input string into a grid coordinate.
 *
 * Accepts inputs like "A1", "B5", "J10".
 *
 * @param input - The coordinate string.
 * @returns A valid Coordinate object if input is valid and within bounds, otherwise null.
 */
export const parseCoordinate = (input: string): Coordinate | null => {
  const match = input.toUpperCase().match(/^([A-J])(10|[1-9])$/)
  if (!match) return null

  const col = match[1].charCodeAt(0) - 65 // letter to index
  const row = parseInt(match[2], 10) - 1 // number to index

  if (isWithinGridBounds(row, col)) {
    return { row, col }
  }

  return null
}

/**
 * Determines if a ship can be placed at a given starting position on the grid.
 *
 * Ensures the ship:
 * - Fits within the grid boundaries.
 * - Does not overlap with existing ships.
 * - Does not touch other ships (adjacent cells are also checked).
 *
 * @param row - Starting row index for the ship.
 * @param col - Starting column index for the ship.
 * @param size - Length of the ship in cells.
 * @param horizontal - Whether the ship is placed horizontally (true) or vertically (false).
 * @param grid - The current game grid containing ship placements.
 * @returns True if the ship can be placed, false otherwise.
 */
export const canPlaceShip = (
  row: number,
  col: number,
  size: number,
  horizontal: boolean,
  grid: GridCellData[][],
) => {
  if (horizontal && col + size > cols) return false
  if (!horizontal && row + size > rows) return false

  for (let i = 0; i < size; i++) {
    const r = horizontal ? row : row + i
    const c = horizontal ? col + i : col

    // Check the current cell and all 8 surrounding cells (including diagonals).
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr
        const nc = c + dc

        if (isWithinGridBounds(nr, nc)) {
          // If any of them already contain part of a ship, this placement is **invalid**
          if (grid[nr][nc].ship !== null) return false
        }
      }
    }
  }

  return true
}

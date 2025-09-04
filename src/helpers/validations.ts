import type { GridCellData } from '@/types'
import { parseCoordinate } from '@/helpers/grid'

export const isCellFree = (cell: GridCellData): boolean => {
  return !cell.hit && !cell.miss && !cell.sunk
}

export const isValidInput = (input: string, grid: GridCellData[][]): boolean => {
  const coord = parseCoordinate(input)
  if (!coord) return false

  return isCellFree(grid[coord.row][coord.col])
}

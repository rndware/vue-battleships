import { describe, it, expect, beforeEach } from 'vitest'
import type { GridCellData } from '../../../types'
import { parseCoordinate, canPlaceShip } from '../../../helpers/grid'
import config from '../../../config/app.json'

const { rows, cols } = config.data.grid

// Helper to create an empty grid
const createEmptyGrid = (): GridCellData[][] =>
  Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ ship: null, hit: false, sunk: false, miss: false })),
  )

describe('parseCoordinate', () => {
  it('parses valid coordinates correctly', () => {
    expect(parseCoordinate('A1')).toEqual({ row: 0, col: 0 })
    expect(parseCoordinate('J10')).toEqual({ row: 9, col: 9 })
    expect(parseCoordinate('C5')).toEqual({ row: 4, col: 2 })
  })

  it('returns null for invalid coordinates', () => {
    expect(parseCoordinate('K1')).toBeNull() // column out of range
    expect(parseCoordinate('A0')).toBeNull() // row out of range
    expect(parseCoordinate('B11')).toBeNull() // row out of range
    expect(parseCoordinate('AA1')).toBeNull() // invalid format
    expect(parseCoordinate('')).toBeNull() // empty string
  })

  it('is case-insensitive', () => {
    expect(parseCoordinate('a1')).toEqual({ row: 0, col: 0 })
    expect(parseCoordinate('j10')).toEqual({ row: 9, col: 9 })
  })
})

describe('canPlaceShip', () => {
  let grid: GridCellData[][]

  beforeEach(() => {
    grid = createEmptyGrid()
  })

  it('allows placing a ship within empty grid bounds', () => {
    expect(canPlaceShip(0, 0, 3, true, grid)).toBe(true) // horizontal
    expect(canPlaceShip(0, 0, 3, false, grid)).toBe(true) // vertical
  })

  it('prevents placing a ship out of bounds', () => {
    expect(canPlaceShip(0, cols - 2, 3, true, grid)).toBe(false) // horizontal overflow
    expect(canPlaceShip(rows - 2, 0, 3, false, grid)).toBe(false) // vertical overflow
  })

  it('prevents overlapping another ship', () => {
    // Place a ship at (0,0) horizontally
    for (let i = 0; i < 3; i++) grid[0][i].ship = 1

    // Attempt to place overlapping ship
    expect(canPlaceShip(0, 1, 3, true, grid)).toBe(false)
    expect(canPlaceShip(0, 0, 3, false, grid)).toBe(false) // vertical overlaps at (0,0)
  })

  it('prevents placing adjacent to another ship', () => {
    // Place a ship at (1,1)
    grid[1][1].ship = 1

    // Attempt to place next to it (all adjacent cells)
    const positionsToTest = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ]
    positionsToTest.forEach(([r, c]) => {
      expect(canPlaceShip(r, c, 1, true, grid)).toBe(false)
    })
  })

  it('allows placing ship far from other ships', () => {
    grid[0][0].ship = 1
    expect(canPlaceShip(5, 5, 2, true, grid)).toBe(true)
    expect(canPlaceShip(5, 5, 2, false, grid)).toBe(true)
  })
})

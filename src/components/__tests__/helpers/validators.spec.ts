import { describe, it, expect } from 'vitest'
import { isCellFree, isValidInput } from '../../../helpers/validations'
import type { GridCellData } from '../../../types'

describe('isCellFree', () => {
  it('returns true for a cell that is not hit, missed, or sunk', () => {
    const cell: GridCellData = { hit: false, miss: false, sunk: false, ship: null }
    expect(isCellFree(cell)).toBe(true)
  })

  it('returns false if the cell is hit', () => {
    const cell: GridCellData = { hit: true, miss: false, sunk: false, ship: null }
    expect(isCellFree(cell)).toBe(false)
  })

  it('returns false if the cell is missed', () => {
    const cell: GridCellData = { hit: false, miss: true, sunk: false, ship: null }
    expect(isCellFree(cell)).toBe(false)
  })

  it('returns false if the cell is sunk', () => {
    const cell: GridCellData = { hit: false, miss: false, sunk: true, ship: null }
    expect(isCellFree(cell)).toBe(false)
  })
})

describe('isValidInput', () => {
  const grid: GridCellData[][] = [
    [
      { hit: false, miss: false, sunk: false, ship: null },
      { hit: false, miss: false, sunk: false, ship: null },
    ],
    [
      { hit: true, miss: false, sunk: false, ship: null },
      { hit: false, miss: false, sunk: true, ship: null },
    ],
  ]

  it('returns true for a valid, free cell', () => {
    expect(isValidInput('A1', grid)).toBe(true)
  })

  it('returns false for a cell that is hit, missed, or sunk', () => {
    expect(isValidInput('B2', grid)).toBe(false)
  })

  it('returns false for an invalid coordinate', () => {
    expect(isValidInput('Z9', grid)).toBe(false)
  })
})

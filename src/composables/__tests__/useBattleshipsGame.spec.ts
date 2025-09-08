import { describe, it, expect, vi, beforeEach } from 'vitest'
import config from '../../config/app.json'
import { useBattleshipsGame } from '../useBattleshipsGame'
import type { Coordinate } from '../../types'

const playMock = vi.fn()
vi.stubGlobal(
  'Audio',
  class {
    src = ''
    currentTime = 0
    play = playMock
    constructor(src?: string) {
      if (src) this.src = src
    }
  },
)

describe('useBattleshipsGame', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('initializes grid with correct dimensions', () => {
    const { grid } = useBattleshipsGame()
    expect(grid.length).toBe(config.data.grid.rows)
    expect(grid[0].length).toBe(config.data.grid.cols)
  })

  it('places all ships on the grid', () => {
    const { ships, grid } = useBattleshipsGame()
    // each ship should have positions equal to its size
    ships.value.forEach((ship, index) => {
      expect(ship.positions.length).toBe(ship.size)
      ship.positions.forEach(({ row, col }) => {
        expect(grid[row][col].ship).toBe(index)
      })
    })
  })

  it('registers a hit when firing at a ship cell', () => {
    const { ships, grid, fireAt, shotsFired, hits, message, messageType } = useBattleshipsGame()
    const target: Coordinate = ships.value[0].positions[0]

    fireAt(target)

    expect(shotsFired.value).toBe(1)
    expect(hits.value).toBe(1)
    expect(grid[target.row][target.col].hit).toBe(true)
    expect(message.value).toContain('Direct Hit')
    expect(['hit', 'sunk']).toContain(messageType.value)
  })

  it('registers a miss when firing at empty cell', () => {
    const { grid, fireAt, shotsFired, hits, message, messageType } = useBattleshipsGame()
    const emptyCell: Coordinate = { row: 0, col: 0 }

    // ensure empty cell
    emptyCell.row = grid.findIndex((row) => row.some((c) => c.ship === null))
    emptyCell.col = grid[emptyCell.row].findIndex((c) => c.ship === null)

    fireAt(emptyCell)

    expect(shotsFired.value).toBe(1)
    expect(hits.value).toBe(0)
    expect(grid[emptyCell.row][emptyCell.col].miss).toBe(true)
    expect(message.value).toContain('Miss')
    expect(messageType.value).toBe('miss')
  })

  it('sinks a ship and updates message', () => {
    const { ships, fireAt, grid, messageType } = useBattleshipsGame()
    const ship = ships.value[0]

    ship.positions.forEach((pos) => fireAt(pos))

    ship.positions.forEach((pos) => {
      expect(grid[pos.row][pos.col].sunk).toBe(true)
    })
    expect(messageType.value).toBe('sunk')
  })

  it('ends the game with loss when shots run out', () => {
    const game = useBattleshipsGame()

    // Directly set shotsFired to maxShots - 1
    game.shotsFired.value = config.data.maxShots - 1

    const emptyCell: Coordinate = { row: 0, col: 0 }

    // ensure empty cell
    emptyCell.row = game.grid.findIndex((row) => row.some((c) => c.ship === null))
    emptyCell.col = game.grid[emptyCell.row].findIndex((c) => c.ship === null)

    game.fireAt(emptyCell)

    expect(game.shotsRemaining.value).toBe(0)
    expect(game.gameStatus.value).toBe('lose')
    expect(game.messageType.value).toBe('lose')
    expect(game.message.value).toContain('Defeat')
  })

  it('resets the game properly', () => {
    const game = useBattleshipsGame()

    // fire once
    game.fireAt(game.ships.value[0].positions[0])
    expect(game.shotsFired.value).toBe(1)

    game.resetGame()
    expect(game.shotsFired.value).toBe(0)
    expect(game.hits.value).toBe(0)
    expect(game.message.value).toBe('')
    expect(game.gameStatus.value).toBe('in-progress')
    expect(game.messageType.value).toBe('')
    expect(game.ships.value.length).toBe(config.data.ships.length)
  })

  it('accepts coordinate strings via fireAtCoordinate', () => {
    const game = useBattleshipsGame()
    const target = game.ships.value[0].positions[0]
    const coordStr = String.fromCharCode(65 + target.col) + (target.row + 1)

    game.fireAtCoordinate(coordStr)

    expect(game.shotsFired.value).toBe(1)
  })
})

import { ref, computed } from 'vue'
import { parseCoordinate, canPlaceShip } from '@/helpers/grid'
import type { GridCellData, Ship, Coordinate, MessageType } from '@/types'
import config from '@/config/app.json'

export function useBattleshipsGame() {
  const grid = ref<GridCellData[][]>([])
  const ships = ref<Ship[]>([])
  const shotsFired = ref(0)
  const hits = ref(0)
  const message = ref<string>('')
  const messageType = ref<MessageType>('')

  const gameWon = computed(() => ships.value.every((ship) => ship.hits >= ship.size))
  const shipsRemaining = computed(() => ships.value.filter((ship) => ship.hits < ship.size).length)

  const initializeGrid = () => {
    grid.value = Array(config.data.grid.rows)
      .fill(null)
      .map(() =>
        Array(config.data.grid.cols)
          .fill(null)
          .map(
            () =>
              ({
                ship: null,
                hit: false,
                sunk: false,
                miss: false,
              }) as GridCellData,
          ),
      )
  }

  const placeShips = () => {
    ships.value = config.data.ships.map((ship) => ({
      ...ship,
      hits: 0,
      positions: [],
    }))

    ships.value.forEach((ship, index) => {
      let placed = false
      let attempts = 0
      while (!placed && attempts < 100) {
        attempts++
        const horizontal = Math.random() < 0.5 // 50-50 chance
        const row = Math.floor(Math.random() * config.data.grid.rows) // random row
        const col = Math.floor(Math.random() * config.data.grid.cols) // random column

        if (canPlaceShip(row, col, ship.size, horizontal, grid.value)) {
          for (let i = 0; i < ship.size; i++) {
            const r = horizontal ? row : row + i
            const c = horizontal ? col + i : col
            grid.value[r][c].ship = index
            ship.positions.push({ row: r, col: c })
          }
          placed = true
        }
      }
    })
  }

  const fireAt = (coords: Coordinate) => {
    const cell = grid.value[coords.row][coords.col]
    if (cell.hit || cell.miss || gameWon.value) return

    shotsFired.value++

    if (cell.ship !== null) {
      cell.hit = true
      hits.value++
      const ship = ships.value[cell.ship]
      ship.hits++

      if (ship.hits >= ship.size) {
        ship.positions.forEach((pos) => (grid.value[pos.row][pos.col].sunk = true))
        message.value = `🎯 Direct Hit! You sunk the ${ship.name}!`
        messageType.value = 'sunk'

        if (gameWon.value) {
          setTimeout(() => {
            message.value = `🏆 Victory! You destroyed all ships in ${shotsFired.value} shots!`
            messageType.value = 'win'
          }, 500)
        }
      } else {
        message.value = `🎯 Direct Hit!`
        messageType.value = 'hit'
      }
    } else {
      cell.miss = true
      message.value = `${config.data.cellEmoji.miss} Miss!`
      messageType.value = 'miss'
    }
  }

  const fireAtCoordinate = (coordInput: string) => {
    const coord = parseCoordinate(coordInput)
    if (coord) fireAt(coord)
  }

  const resetGame = () => {
    shotsFired.value = 0
    hits.value = 0
    message.value = ''
    messageType.value = ''
    initializeGrid()
    placeShips()
  }

  initializeGrid()
  placeShips()

  return {
    grid,
    ships,
    shotsFired,
    hits,
    message,
    messageType,
    shipsRemaining,
    gameWon,
    fireAt,
    fireAtCoordinate,
    resetGame,
  }
}

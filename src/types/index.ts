export interface Coordinate {
  row: number
  col: number
}

export interface GridCellData {
  ship: number | null
  hit: boolean
  miss: boolean
  sunk?: boolean
}

export interface Ship {
  name: string
  size: number
  hits: number
  positions: Coordinate[]
}

export interface GameInfoData {
  shotsFired: number
  hits: number
  shipsRemaining: number
  shotsRemaining: number
}

export type GameStatus = 'win' | 'lose' | 'in-progress'

export type MessageType = '' | 'hit' | 'miss' | 'sunk' | 'win' | 'lose'

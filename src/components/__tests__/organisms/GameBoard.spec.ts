import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import type { GridCellData } from '../../../types'
import GameBoard from '../../../components/organisms/GameBoard.vue'
import GridCell from '../../../components/molecules/GridCell.vue'

const createGrid = (): GridCellData[][] => [
  [
    { ship: null, hit: false, miss: false, sunk: false },
    { ship: null, hit: true, miss: false, sunk: false },
  ],
  [
    { ship: null, hit: false, miss: true, sunk: false },
    { ship: null, hit: false, miss: false, sunk: true },
  ],
]

describe('Organisms / GameBoard.vue', () => {
  it('renders the correct number of rows and columns', () => {
    const grid = createGrid()
    const wrapper = mount(GameBoard, { props: { grid } })

    const rows = wrapper.findAll('.game-board__row')
    expect(rows.length).toBe(grid.length)

    const firstRowCells = rows[0].findAllComponents(GridCell)
    expect(firstRowCells.length).toBe(grid[0].length)
  })

  it('renders column headers correctly', () => {
    const grid = createGrid()
    const wrapper = mount(GameBoard, { props: { grid } })

    const headers = wrapper.findAll('.game-board__header-cell')
    expect(headers.length).toBe(grid[0].length)
    expect(headers[0].text()).toBe('A')
    expect(headers[1].text()).toBe('B')
  })

  it('renders row labels correctly', () => {
    const grid = createGrid()
    const wrapper = mount(GameBoard, { props: { grid } })

    const rowLabels = wrapper.findAll('.game-board__row-label')
    expect(rowLabels[0].text()).toBe('1')
    expect(rowLabels[1].text()).toBe('2')
  })

  it('renders correct status and content for cells', () => {
    const grid = createGrid()
    const wrapper = mount(GameBoard, { props: { grid } })

    const cells = wrapper.findAllComponents(GridCell)

    // cell 0,0: empty
    expect(cells[0].props('status')).toBe('')
    expect(cells[0].text()).toBe('')

    // cell 0,1: hit
    expect(cells[1].props('status')).toBe('hit')
    expect(cells[1].text()).toBe('💥')

    // cell 1,0: miss
    expect(cells[2].props('status')).toBe('miss')
    expect(cells[2].text()).toBe('💦')

    // cell 1,1: sunk
    expect(cells[3].props('status')).toBe('sunk')
    expect(cells[3].text()).toBe('🔥')
  })

  it('emits fire event when a cell is clicked', async () => {
    const grid = createGrid()
    const wrapper = mount(GameBoard, { props: { grid } })

    const firstCell = wrapper.findAllComponents(GridCell)[0]
    await firstCell.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('fire')
    expect(wrapper.emitted('fire')![0][0]).toEqual({ row: 0, col: 0 })
  })
})

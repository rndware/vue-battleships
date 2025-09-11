import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import type { GridCellData } from '../../../types'
import GameBoard from '../../../components/organisms/GameBoard.vue'
import GridCell from '../../../components/molecules/GridCell.vue'
import config from '../../../config/app.json'

const cellEmoji = config.data.cellEmoji

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
  const grid = createGrid()
  const wrapper = mount(GameBoard, { props: { grid } })

  it('renders column headers correctly', () => {
    const headers = wrapper.findAll('.game-board__header-cell')
    expect(headers.length).toBe(grid[0].length)
    expect(headers[0].text()).toBe('A')
    expect(headers[1].text()).toBe('B')
  })

  it('renders row labels correctly', () => {
    const rowLabels = wrapper.findAll('.game-board__row-label')
    expect(rowLabels.length).toBe(grid.length)
    expect(rowLabels[0].text()).toBe('1')
    expect(rowLabels[1].text()).toBe('2')
  })

  it('renders correct status and content for cells', () => {
    const cells = wrapper.findAllComponents(GridCell)
    expect(cells.length).toBe(grid.length * grid[0].length)

    // cell 0,0: empty
    expect(cells[0].props('status')).toBe('')
    expect(cells[0].text()).toBe('')

    // cell 0,1: hit
    expect(cells[1].props('status')).toBe('hit')
    expect(cells[1].text()).toBe(cellEmoji.hit)

    // cell 1,0: miss
    expect(cells[2].props('status')).toBe('miss')
    expect(cells[2].text()).toBe(cellEmoji.miss)

    // cell 1,1: sunk
    expect(cells[3].props('status')).toBe('sunk')
    expect(cells[3].text()).toBe(cellEmoji.sunk)
  })

  it('renders custom slot content', () => {
    const wrapper = mount(GameBoard, {
      props: { grid },
      slots: {
        cellContent: '<template #cellContent="{ cell }">[{{ cell.hit ? "X" : "-" }}]</template>',
      },
    })

    const cells = wrapper.findAllComponents(GridCell)
    expect(cells[0].text()).toBe('[-]')
    expect(cells[1].text()).toBe('[X]')
    expect(cells[2].text()).toBe('[-]')
    expect(cells[3].text()).toBe('[-]')
  })

  it('emits fire event when a cell is clicked', async () => {
    const cells = wrapper.findAllComponents(GridCell)
    await cells[0].trigger('click')

    expect(wrapper.emitted()).toHaveProperty('fire')
    expect(wrapper.emitted('fire')![0][0]).toEqual({ row: 0, col: 0 })
  })
})

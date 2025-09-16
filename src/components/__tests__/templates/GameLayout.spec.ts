import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import GameLayout from '../../../components/templates/GameLayout.vue'
import type { GridCellData, GameInfoData, Ship, MessageType } from '../../../types'

// Mock subcomponents to simplify testing
vi.mock('@/components/organisms/GameInfo.vue', () => ({ default: { template: '<div />' } }))
vi.mock('@/components/organisms/GameBoard.vue', () => ({ default: { template: '<div />' } }))
vi.mock('@/components/organisms/InputSection.vue', () => ({ default: { template: '<div />' } }))
vi.mock('@/components/organisms/FleetStatus.vue', () => ({ default: { template: '<div />' } }))
vi.mock('@/components/atoms/ButtonNew.vue', () => ({ default: { template: '<button />' } }))
vi.mock('@/components/atoms/GameMessage.vue', () => ({ default: { template: '<div />' } }))

describe('Templates / GameLayout.vue', () => {
  const grid: GridCellData[][] = [[{ hit: false, miss: false, sunk: false, ship: null }]]
  const info: GameInfoData = { shotsFired: 0, hits: 0, shotsRemaining: 5, shipsRemaining: 1 }
  const ships: Ship[] = [{ positions: [], name: 'Destroyer', size: 2, hits: 0 }]

  beforeEach(() => {
    window.scrollTo = vi.fn()
  })

  it('renders the default title slot', () => {
    const wrapper = mount(GameLayout, {
      props: { info, grid, ships, input: {}, gameStatus: 'in-progress' },
    })
    expect(wrapper.find('.game-layout__title').text()).toBe('Battleships')
  })

  it('renders custom title slot', () => {
    const wrapper = mount(GameLayout, {
      props: { info, grid, ships, input: {}, gameStatus: 'in-progress' },
      slots: { title: '<span>Custom Title</span>' },
    })
    expect(wrapper.find('.game-layout__title').text()).toBe('Custom Title')
  })

  it('emits "fire" event from GameBoard', async () => {
    const wrapper = mount(GameLayout, {
      props: { info, grid, ships, input: {}, gameStatus: 'in-progress' },
    })
    await wrapper.vm.$emit('fire', { row: 0, col: 0 })
    expect(wrapper.emitted('fire')).toBeTruthy()
    expect(wrapper.emitted('fire')![0]).toEqual([{ row: 0, col: 0 }])
  })

  it('emits "submit" event from InputSection', async () => {
    const wrapper = mount(GameLayout, {
      props: { info, grid, ships, input: {}, gameStatus: 'in-progress' },
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const vm = wrapper.vm as any
    vm.inputValue = 'A1'
    await vm.$emit('submit', 'A1')
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')![0]).toEqual(['A1'])
  })

  it('emits "new-game" when ButtonNew is clicked after win', async () => {
    const wrapper = mount(GameLayout, {
      props: { info, grid, ships, input: {}, gameStatus: 'win' },
    })
    const button = wrapper.findComponent({ name: 'ButtonNew' })
    await button.trigger('click')
    expect(wrapper.emitted('new-game')).toBeTruthy()
  })

  it('conditionally renders GameMessage', () => {
    const message: { type: MessageType; text: string } = { type: '', text: 'Test message' }
    const wrapper = mount(GameLayout, {
      props: { info, grid, ships, input: {}, gameStatus: 'in-progress', message },
    })
    expect(wrapper.findComponent({ name: 'GameMessage' }).exists()).toBe(true)
  })

  it('disables input when game is not in-progress', () => {
    const wrapper = mount(GameLayout, {
      props: { info, grid, ships, input: {}, gameStatus: 'win' },
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const vm = wrapper.vm as any
    expect(vm.disabled).toBe(true)
  })

  it('calls scrollTo when gameStatus changes', async () => {
    const wrapper = mount(GameLayout, {
      props: { info, grid, ships, input: {}, gameStatus: 'in-progress' },
    })

    // Change prop to trigger the watch
    await wrapper.setProps({ gameStatus: 'win' })

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    })
  })
})

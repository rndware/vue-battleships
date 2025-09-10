import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createWebHashHistory, createWebHistory } from 'vue-router'

function loadRouterWithEnv(mode: string) {
  vi.resetModules()
  process.env = { ...process.env, NODE_ENV: mode }
  return import('@/router')
}

describe('router', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  // due to github static hosting constraints, we use hash history in production
  it('uses hash history in production', async () => {
    const { default: router } = await loadRouterWithEnv('production')
    expect(router.options.history).toBeInstanceOf(createWebHashHistory().constructor)
  })

  it('uses HTML5 history in development', async () => {
    const { default: router } = await loadRouterWithEnv('development')
    expect(router.options.history).toBeInstanceOf(createWebHistory().constructor)
  })

  it('has the expected routes', async () => {
    const { default: router } = await loadRouterWithEnv('development')
    const routePaths = router.getRoutes().map(r => r.path)

    expect(routePaths).toContain('/')
    expect(routePaths).toContain('/game')
    expect(routePaths).toContain('/error')
    expect(routePaths.some(p => p.includes(':pathMatch'))).toBe(true)
  })
})

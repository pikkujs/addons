import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku'

export type TestGrafanaInput = {}
export type TestGrafanaOutput = { passed: number; failed: string[] }

export const testGrafana = pikkuSessionlessFunc<TestGrafanaInput, TestGrafanaOutput>({
  func: async (_services, _data, { rpc }) => {
    let passed = 0
    const failed: string[] = []

    const run = async (name: string, fn: () => Promise<void>) => {
      try {
        await fn()
        passed++
      } catch (e: any) {
        failed.push(`${name}: ${e.message}`)
      }
    }

    // -- Dashboards --
    await run('dashboardsList returns dashboards', async () => {
      const result = await rpc.invoke('grafana:dashboardsList', {})
      assert.ok(Array.isArray(result), 'Expected array')
      assert.ok(result.length > 0, 'Expected at least one dashboard')
      const dashboard = result[0]
      assert.ok(dashboard.uid, 'Expected dashboard to have uid')
      assert.ok(dashboard.title, 'Expected dashboard to have title')
    })

    let dashboardUid: string

    await run('dashboardsList finds test dashboard', async () => {
      const result = await rpc.invoke('grafana:dashboardsList', { query: 'Pikku Test' })
      assert.ok(Array.isArray(result), 'Expected array')
      assert.ok(result.length > 0, 'Expected to find test dashboard')
      dashboardUid = result[0].uid
    })

    await run('dashboardsGet retrieves dashboard by UID', async () => {
      const result = await rpc.invoke('grafana:dashboardsGet', { uid: dashboardUid })
      assert.ok(result.dashboard, 'Expected dashboard object')
      assert.equal(result.dashboard.uid, dashboardUid)
      assert.ok(result.dashboard.title, 'Expected title')
      assert.ok(result.meta, 'Expected meta object')
      assert.ok(result.meta.url, 'Expected meta.url')
    })

    return { passed, failed }
  }
})

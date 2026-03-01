import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku'

export type TestMetabaseInput = {}
export type TestMetabaseOutput = { passed: number; failed: string[] }

export const testMetabase = pikkuSessionlessFunc<TestMetabaseInput, TestMetabaseOutput>({
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
    await run('dashboardsList returns array', async () => {
      const result = await rpc.invoke('metabase:dashboardsList', {})
      assert.ok(Array.isArray(result), 'Expected array')
    })

    let dashboardId: number

    await run('dashboardsList includes test dashboard', async () => {
      const result = await rpc.invoke('metabase:dashboardsList', {})
      const testDash = result.find((d: any) => d.name === 'Pikku Test Dashboard')
      assert.ok(testDash, 'Expected to find test dashboard')
      assert.ok(typeof testDash.id === 'number', 'Expected numeric ID')
      dashboardId = testDash.id
    })

    await run('dashboardsGet retrieves dashboard', async () => {
      const result = await rpc.invoke('metabase:dashboardsGet', { dashboardId })
      assert.equal(result.id, dashboardId)
      assert.equal(result.name, 'Pikku Test Dashboard')
      assert.equal(result.archived, false)
    })

    // -- Questions (cards) --
    await run('questionsList returns array', async () => {
      const result = await rpc.invoke('metabase:questionsList', {})
      assert.ok(Array.isArray(result), 'Expected array')
    })

    return { passed, failed }
  }
})

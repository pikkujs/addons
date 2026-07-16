import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku'

export type TestTwistInput = {}
export type TestTwistOutput = { passed: number; failed: string[] }

export const testTwist = pikkuSessionlessFunc<TestTwistInput, TestTwistOutput>({
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

    // Add test cases here:
    // await run('test name', async () => {
    //   const result = await rpc.invoke('twist:functionName', { ... })
    //   assert.equal(result.someField, expectedValue)
    // })

    return { passed, failed }
  }
})

import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku'

export type TestAirtopInput = {}
export type TestAirtopOutput = { passed: number; failed: string[] }

export const testAirtop = pikkuSessionlessFunc<TestAirtopInput, TestAirtopOutput>({
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
    //   const result = await rpc.invoke('airtop:functionName', { ... })
    //   assert.equal(result.someField, expectedValue)
    // })

    return { passed, failed }
  }
})

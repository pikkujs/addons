import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export type TestVonageInput = {}
export type TestVonageOutput = { passed: number; failed: string[] }

export const testVonage = pikkuSessionlessFunc<TestVonageInput, TestVonageOutput>({
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
    //   const result = await rpc.invoke('vonage:functionName', { ... })
    //   assert.equal(result.someField, expectedValue)
    // })

    return { passed, failed }
  }
})

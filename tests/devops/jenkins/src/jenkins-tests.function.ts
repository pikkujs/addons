import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku'

export type TestJenkinsInput = {}
export type TestJenkinsOutput = { passed: number; failed: string[] }

export const testJenkins = pikkuSessionlessFunc<TestJenkinsInput, TestJenkinsOutput>({
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

    // -- Jobs --
    await run('jobsList returns jobs', async () => {
      const result = await rpc.invoke('jenkins:jobsList', {})
      assert.ok(result.jobs, 'Expected jobs array')
      assert.ok(Array.isArray(result.jobs), 'Expected jobs to be an array')
      assert.ok(result.jobs.length > 0, 'Expected at least one job')
    })

    await run('jobsList contains test-job', async () => {
      const result = await rpc.invoke('jenkins:jobsList', {})
      const testJob = result.jobs.find((j: any) => j.name === 'test-job')
      assert.ok(testJob, 'Expected to find test-job')
      assert.ok(testJob.url, 'Expected job URL')
    })

    // -- Trigger build --
    await run('jobsTrigger triggers a build', async () => {
      const result = await rpc.invoke('jenkins:jobsTrigger', { jobName: 'test-job' })
      assert.equal(result.success, true)
    })

    // -- Get build (poll until available) --
    await run('buildsGet retrieves build info', async () => {
      let result: any
      const maxAttempts = 15
      for (let i = 0; i < maxAttempts; i++) {
        await new Promise((r) => setTimeout(r, 2000))
        try {
          result = await rpc.invoke('jenkins:buildsGet', {
            jobName: 'test-job',
            buildNumber: 1,
          })
          break
        } catch (e: any) {
          if (i === maxAttempts - 1) throw e
        }
      }
      assert.ok(result, 'Expected build result after polling')
      assert.ok(typeof result.number === 'number', 'Expected build number')
      assert.ok(typeof result.building === 'boolean', 'Expected building flag')
      assert.ok(result.url, 'Expected build URL')
    })

    return { passed, failed }
  }
})

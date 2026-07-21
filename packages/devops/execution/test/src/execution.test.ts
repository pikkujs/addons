import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

test('execution addon', async () => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  await test('execute captures stdout and a zero exit code', async () => {
    const result = await rpc.invoke('execution:execute', {
      command: 'echo hello',
    })
    assert.equal(result.stdout.trim(), 'hello')
    assert.equal(result.exitCode, 0)
  })

  await test('execute returns a non-zero exit code without throwing', async () => {
    const result = await rpc.invoke('execution:execute', {
      command: 'exit 3',
    })
    assert.equal(result.exitCode, 3)
  })

  await test('spawnCommand runs a program with an argument array', async () => {
    const result = await rpc.invoke('execution:spawnCommand', {
      command: 'node',
      args: ['-e', 'process.stdout.write("hi")'],
    })
    assert.equal(result.stdout, 'hi')
    assert.equal(result.exitCode, 0)
  })

  await test('spawnCommand surfaces a non-zero exit code', async () => {
    const result = await rpc.invoke('execution:spawnCommand', {
      command: 'node',
      args: ['-e', 'process.exit(2)'],
    })
    assert.equal(result.exitCode, 2)
  })
})

import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { GenericContainer, Wait } from 'testcontainers'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { InMemoryTriggerService, LocalVariablesService, LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'

const REDIS_PASSWORD = 'testpass'

test('redis external package', async () => {
  const container = await new GenericContainer('redis:7-alpine')
    .withExposedPorts(6379)
    .withCommand(['redis-server', '--requirepass', REDIS_PASSWORD])
    .withWaitStrategy(Wait.forLogMessage('Ready to accept connections'))
    .withStartupTimeout(60_000)
    .start()

  try {
    const variables = new LocalVariablesService({
      REDIS_PARAMS: JSON.stringify({
        host: container.getHost(),
        port: String(container.getMappedPort(6379)),
        database: '0',
      }),
      REDIS_PASSWORD,
    })
    const secrets = new LocalSecretService(variables)

    const singletonServices = await createSingletonServices({}, { variables, secrets })
    const rpc = rpcService.getContextRPCService(singletonServices as any, {})

    const triggerService = new InMemoryTriggerService()
    await triggerService.start()

    try {
      const { passed, failed } = await rpc.invoke('testRedis', {})

      console.log(`\n  ${passed} passed`)
      if (failed.length > 0) {
        console.log(`  ${failed.length} failed:`)
        for (const f of failed) console.log(`    ✗ ${f}`)
      }

      assert.equal(failed.length, 0, `Failed tests:\n${failed.join('\n')}`)
    } finally {
      await triggerService.stop()
      await stopSingletonServices()
    }
  } finally {
    await container.stop()
  }
})

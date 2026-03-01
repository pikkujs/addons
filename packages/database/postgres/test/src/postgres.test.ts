import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { PostgreSqlContainer } from '@testcontainers/postgresql'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { InMemoryTriggerService, LocalVariablesService, LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'

test('postgres external package', async () => {
  const container = await new PostgreSqlContainer('postgres:16-alpine')
    .withDatabase('pikku_test')
    .withUsername('pikku')
    .withPassword('pikku')
    .withStartupTimeout(60_000)
    .start()

  try {
    const variables = new LocalVariablesService({
      POSTGRES_PARAMS: JSON.stringify({
        host: container.getHost(),
        port: String(container.getPort()),
        database: container.getDatabase(),
      }),
    })
    const secrets = new LocalSecretService(variables)
    await secrets.setSecretJSON('POSTGRES_CREDENTIALS', {
      user: container.getUsername(),
      password: container.getPassword(),
    })

    const singletonServices = await createSingletonServices({}, { variables, secrets })
    const rpc = rpcService.getContextRPCService(singletonServices as any, {})

    const triggerService = new InMemoryTriggerService()

    const startTriggers = async () => {
      await triggerService.start()
    }

    try {
      const { passed, failed } = await rpc.invoke('testPostgres', { startTriggers })

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

import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { MySqlContainer } from '@testcontainers/mysql'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalVariablesService, LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'

test('mysql external package', async () => {
  const container = await new MySqlContainer('mysql:8')
    .withDatabase('pikku_test')
    .withUsername('pikku')
    .withRootPassword('root')
    .withUserPassword('pikku')
    .withStartupTimeout(120_000)
    .start()

  try {
    const variables = new LocalVariablesService({
      MYSQL_PARAMS: JSON.stringify({
        host: container.getHost(),
        port: String(container.getPort()),
        database: container.getDatabase(),
      }),
    })
    const secrets = new LocalSecretService(variables)
    await secrets.setSecretJSON('MYSQL_CREDENTIALS', {
      user: container.getUsername(),
      password: container.getUserPassword(),
    })

    const singletonServices = await createSingletonServices({}, { variables, secrets })
    const rpc = rpcService.getContextRPCService(singletonServices as any, {})

    try {
      const { passed, failed } = await rpc.invoke('testMysql', {})

      console.log(`\n  ${passed} passed`)
      if (failed.length > 0) {
        console.log(`  ${failed.length} failed:`)
        for (const f of failed) console.log(`    ✗ ${f}`)
      }

      assert.equal(failed.length, 0, `Failed tests:\n${failed.join('\n')}`)
    } finally {
      await stopSingletonServices()
    }
  } finally {
    await container.stop()
  }
})

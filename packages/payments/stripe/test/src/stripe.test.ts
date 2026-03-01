import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { GenericContainer, Wait } from 'testcontainers'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalVariablesService, LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'

test('stripe external package', async () => {
  console.log(`\n  Starting stripe-mock container...`)

  const container = await new GenericContainer('stripe/stripe-mock:latest')
    .withExposedPorts(12111)
    .withWaitStrategy(Wait.forListeningPorts())
    .withStartupTimeout(60_000)
    .start()

  const apiUrl = `http://${container.getHost()}:${container.getMappedPort(12111)}`
  console.log(`  stripe-mock ready at ${apiUrl}`)

  try {
    const variables = new LocalVariablesService({ STRIPE_API_URL: apiUrl })
    const secrets = new LocalSecretService(variables)
    await secrets.setSecretJSON('STRIPE_SECRET_KEY', 'sk_test_mock')

    const singletonServices = await createSingletonServices({}, { variables, secrets })
    const rpc = rpcService.getContextRPCService(singletonServices as any, {})

    try {
      const { passed, failed } = await rpc.invoke('testStripe', {})

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

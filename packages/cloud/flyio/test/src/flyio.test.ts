import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'

test('flyio addon', async () => {
  const secrets = new LocalSecretService()
  // Set up secrets for the service
  // await secrets.setSecretJSON('FLYIO_CREDENTIALS', { ... })

  const singletonServices = await createSingletonServices({}, { secrets })
  const rpc = rpcService.getContextRPCService(singletonServices as any, {})

  try {
    const { passed, failed } = await rpc.invoke('testFlyio', {})

    console.log(`\n  ${passed} passed`)
    if (failed.length > 0) {
      console.log(`  ${failed.length} failed:`)
      for (const f of failed) console.log(`    \u2717 ${f}`)
    }

    assert.equal(failed.length, 0, `Failed tests:\n${failed.join('\n')}`)
  } finally {
    await stopSingletonServices()
  }
})

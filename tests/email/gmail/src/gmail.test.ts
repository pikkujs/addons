import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'

const appCredentials = process.env.GMAIL_APP_CREDENTIALS
const tokens = process.env.GMAIL_TOKENS

if (!appCredentials || !tokens) {
  console.error('Required: GMAIL_APP_CREDENTIALS and GMAIL_TOKENS')
  process.exit(1)
}

test('gmail external package', async () => {
  const secrets = new LocalSecretService()

  await secrets.setSecretJSON('GMAIL_APP_CREDENTIALS', JSON.parse(appCredentials))
  await secrets.setSecretJSON('GMAIL_TOKENS', JSON.parse(tokens))

  const singletonServices = await createSingletonServices({}, { secrets })
  const rpc = rpcService.getContextRPCService(singletonServices as any, {})

  try {
    const { passed, failed } = await rpc.invoke('testGmail', {})

    console.log(`\n  ${passed} passed`)
    if (failed.length > 0) {
      console.log(`  ${failed.length} failed:`)
      for (const f of failed) console.log(`    ✗ ${f}`)
    }

    assert.equal(failed.length, 0, `Failed tests:\n${failed.join('\n')}`)
  } finally {
    await stopSingletonServices()
  }
})

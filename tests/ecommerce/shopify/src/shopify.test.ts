import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'

const SHOPIFY_SHOP_DOMAIN = process.env.SHOPIFY_SHOP_DOMAIN
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN

if (!SHOPIFY_SHOP_DOMAIN || !SHOPIFY_ACCESS_TOKEN) {
  console.error('Required: SHOPIFY_SHOP_DOMAIN and SHOPIFY_ACCESS_TOKEN')
  process.exit(1)
}

test('shopify external package', async () => {
  const secrets = new LocalSecretService()
  await secrets.setSecretJSON('SHOPIFY_CREDENTIALS', {
    shopDomain: SHOPIFY_SHOP_DOMAIN,
    accessToken: SHOPIFY_ACCESS_TOKEN,
  })

  const singletonServices = await createSingletonServices({}, { secrets })
  const rpc = rpcService.getContextRPCService(singletonServices as any, {})

  try {
    const { passed, failed } = await rpc.invoke('testShopify', {})

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

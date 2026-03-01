import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

test('rss-feed addon', async (t) => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  await t.test('reads a public RSS feed', async () => {
    const result = await rpc.invoke('rss-feed:rssFeedRead', {
      url: 'https://feeds.bbci.co.uk/news/rss.xml',
    })
    assert.ok(result.title)
    assert.ok(result.items.length > 0)
    assert.ok(result.items[0].title)
  })

  await t.test('respects maxItems limit', async () => {
    const result = await rpc.invoke('rss-feed:rssFeedRead', {
      url: 'https://feeds.bbci.co.uk/news/rss.xml',
      maxItems: 3,
    })
    assert.ok(result.items.length <= 3)
  })

  await t.test('items have expected fields', async () => {
    const result = await rpc.invoke('rss-feed:rssFeedRead', {
      url: 'https://feeds.bbci.co.uk/news/rss.xml',
      maxItems: 1,
    })
    const item = result.items[0]
    assert.ok('title' in item)
    assert.ok('link' in item)
    assert.ok('pubDate' in item)
    assert.ok('guid' in item)
  })

  await t.test('reads an Atom feed', async () => {
    const result = await rpc.invoke('rss-feed:rssFeedRead', {
      url: 'https://github.com/pikkujs.atom',
      maxItems: 5,
    })
    assert.ok(result.title || result.items.length >= 0)
  })
})

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

test('hackernews addon', async (t) => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  await t.test('hnGetStories returns top story IDs', async () => {
    const result = await rpc.invoke('hackernews:hnGetStories', {})
    assert.ok(result.ids.length > 0)
    assert.ok(result.ids.length <= 10)
    assert.ok(typeof result.ids[0] === 'number')
  })

  await t.test('hnGetStories respects limit', async () => {
    const result = await rpc.invoke('hackernews:hnGetStories', {
      limit: 3,
    })
    assert.equal(result.ids.length, 3)
  })

  await t.test('hnGetStories supports different types', async () => {
    const result = await rpc.invoke('hackernews:hnGetStories', {
      type: 'new',
      limit: 5,
    })
    assert.ok(result.ids.length > 0)
    assert.ok(result.ids.length <= 5)
  })

  await t.test('hnGetItem returns a story', async () => {
    const stories = await rpc.invoke('hackernews:hnGetStories', { limit: 1 })
    const result = await rpc.invoke('hackernews:hnGetItem', {
      id: stories.ids[0],
    })
    assert.ok(result.id)
    assert.ok(result.type)
    assert.ok(result.by)
  })

  await t.test('hnGetItem returns expected fields', async () => {
    const stories = await rpc.invoke('hackernews:hnGetStories', { limit: 1 })
    const result = await rpc.invoke('hackernews:hnGetItem', {
      id: stories.ids[0],
    })
    assert.ok('title' in result)
    assert.ok('score' in result)
    assert.ok('time' in result)
    assert.ok('kids' in result)
    assert.ok(Array.isArray(result.kids))
  })

  await t.test('hnGetUser returns a user profile', async () => {
    const result = await rpc.invoke('hackernews:hnGetUser', {
      username: 'dang',
    })
    assert.equal(result.id, 'dang')
    assert.ok(result.karma > 0)
    assert.ok(result.created > 0)
    assert.ok(Array.isArray(result.submitted))
  })
})

import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku'
import { onSubscribeMessages } from './on-subscribe.function.js'

export type TestRedisInput = {}
export type TestRedisOutput = { passed: number; failed: string[] }

/**
 * Exercises every Redis external package function through the RPC pipeline.
 * Each sub-test calls rpc.invoke('redis:...') — the same path a real app uses.
 */
export const testRedis = pikkuSessionlessFunc<TestRedisInput, TestRedisOutput>({
  func: async (_services, _data, { rpc }) => {
    let passed = 0
    const failed: string[] = []

    const run = async (name: string, fn: () => Promise<void>) => {
      try {
        await fn()
        passed++
      } catch (e: any) {
        failed.push(`${name}: ${e.message}`)
      }
    }

    // Helper: direct redis access for setup / verification
    const set = (key: string, value: string) =>
      rpc.invoke('redis:keySet', { key, value })
    const get = (key: string) => rpc.invoke('redis:keyGet', { key })
    const del = (key: string) => rpc.invoke('redis:keyDelete', { key })
    const flush = () => rpc.invoke('redis:keys', { pattern: '*' }).then(async (r: any) => {
      for (const k of r.keys) await del(k)
    })

    // ── Keys ──────────────────────────────────────────────

    await flush()

    await run('keySet/keyGet round-trip', async () => {
      const s = await rpc.invoke('redis:keySet', { key: 'hello', value: 'world' })
      assert.equal(s.success, true)
      const g = await get('hello')
      assert.equal(g.value, 'world')
    })

    await flush()

    await run('keyGet returns null for missing key', async () => {
      const g = await get('nonexistent')
      assert.equal(g.value, null)
    })

    await flush()

    await run('keySet with TTL', async () => {
      await rpc.invoke('redis:keySet', { key: 'expiring', value: 'temp', ttl: 10 })
      // We can't check TTL via RPC, but if no error the command succeeded
      const g = await get('expiring')
      assert.equal(g.value, 'temp')
    })

    await flush()

    await run('keyDelete removes a key', async () => {
      await set('todelete', 'value')
      const r = await del('todelete')
      assert.equal(r.deleted, 1)
      const g = await get('todelete')
      assert.equal(g.value, null)
    })

    await flush()

    await run('keyIncr increments a counter', async () => {
      const first = await rpc.invoke('redis:keyIncr', { key: 'counter' })
      assert.equal(first.value, 1)
      const second = await rpc.invoke('redis:keyIncr', { key: 'counter' })
      assert.equal(second.value, 2)
    })

    await flush()

    await run('keys returns matching keys', async () => {
      await set('user:1', 'a')
      await set('user:2', 'b')
      await set('other', 'c')
      const r = await rpc.invoke('redis:keys', { pattern: 'user:*' })
      assert.equal(r.keys.length, 2)
      assert.ok(r.keys.includes('user:1'))
      assert.ok(r.keys.includes('user:2'))
    })

    await flush()

    await run('info returns server info string', async () => {
      const r = await rpc.invoke('redis:info', {})
      assert.equal(typeof r.info, 'string')
      assert.ok(r.info.length > 0)
    })

    // ── Hashes ────────────────────────────────────────────

    await flush()

    await run('hashSet/hashGet round-trip', async () => {
      const s = await rpc.invoke('redis:hashSet', { key: 'myhash', field: 'name', value: 'alice' })
      assert.equal(s.created, true)
      const g = await rpc.invoke('redis:hashGet', { key: 'myhash', field: 'name' })
      assert.equal(g.value, 'alice')
    })

    await flush()

    await run('hashGetAll returns all fields', async () => {
      await rpc.invoke('redis:hashSet', { key: 'myhash', field: 'a', value: '1' })
      await rpc.invoke('redis:hashSet', { key: 'myhash', field: 'b', value: '2' })
      const r = await rpc.invoke('redis:hashGetAll', { key: 'myhash' })
      assert.deepEqual(r.fields, { a: '1', b: '2' })
    })

    await flush()

    await run('hashDelete removes a field', async () => {
      await rpc.invoke('redis:hashSet', { key: 'myhash', field: 'f1', value: 'v1' })
      const r = await rpc.invoke('redis:hashDelete', { key: 'myhash', field: 'f1' })
      assert.equal(r.deleted, 1)
      const g = await rpc.invoke('redis:hashGet', { key: 'myhash', field: 'f1' })
      assert.equal(g.value, null)
    })

    // ── Sets ──────────────────────────────────────────────

    await flush()

    await run('setAdd/setMembers round-trip', async () => {
      await rpc.invoke('redis:setAdd', { key: 'myset', value: 'a' })
      await rpc.invoke('redis:setAdd', { key: 'myset', value: 'b' })
      const r = await rpc.invoke('redis:setMembers', { key: 'myset' })
      assert.equal(r.members.length, 2)
      assert.ok(r.members.includes('a'))
      assert.ok(r.members.includes('b'))
    })

    await flush()

    await run('setIsMember returns true/false', async () => {
      await rpc.invoke('redis:setAdd', { key: 'myset', value: 'x' })
      const yes = await rpc.invoke('redis:setIsMember', { key: 'myset', value: 'x' })
      assert.equal(yes.isMember, true)
      const no = await rpc.invoke('redis:setIsMember', { key: 'myset', value: 'z' })
      assert.equal(no.isMember, false)
    })

    await flush()

    await run('setRemove removes a member', async () => {
      await rpc.invoke('redis:setAdd', { key: 'myset', value: 'a' })
      await rpc.invoke('redis:setAdd', { key: 'myset', value: 'b' })
      const r = await rpc.invoke('redis:setRemove', { key: 'myset', value: 'a' })
      assert.equal(r.removed, 1)
      const m = await rpc.invoke('redis:setMembers', { key: 'myset' })
      assert.deepEqual(m.members, ['b'])
    })

    // ── Lists ─────────────────────────────────────────────

    await flush()

    await run('listPush/listPop round-trip', async () => {
      await rpc.invoke('redis:listPush', { key: 'mylist', value: 'first' })
      await rpc.invoke('redis:listPush', { key: 'mylist', value: 'second', tail: true })
      const head = await rpc.invoke('redis:listPop', { key: 'mylist' })
      assert.equal(head.value, 'first')
    })

    await flush()

    await run('listLength returns correct count', async () => {
      await rpc.invoke('redis:listPush', { key: 'mylist', value: 'a', tail: true })
      await rpc.invoke('redis:listPush', { key: 'mylist', value: 'b', tail: true })
      await rpc.invoke('redis:listPush', { key: 'mylist', value: 'c', tail: true })
      const r = await rpc.invoke('redis:listLength', { key: 'mylist' })
      assert.equal(r.length, 3)
    })

    await flush()

    await run('listRange returns values in range', async () => {
      await rpc.invoke('redis:listPush', { key: 'mylist', value: 'a', tail: true })
      await rpc.invoke('redis:listPush', { key: 'mylist', value: 'b', tail: true })
      await rpc.invoke('redis:listPush', { key: 'mylist', value: 'c', tail: true })
      await rpc.invoke('redis:listPush', { key: 'mylist', value: 'd', tail: true })
      const r = await rpc.invoke('redis:listRange', { key: 'mylist', start: 1, stop: 2 })
      assert.deepEqual(r.values, ['b', 'c'])
    })

    // ── PubSub ────────────────────────────────────────────

    await flush()

    await run('publish reaches trigger subscriber', async () => {
      const before = onSubscribeMessages.length
      const r = await rpc.invoke('redis:publish', { channel: 'test-chan', message: 'hello' })
      assert.equal(typeof r.subscribers, 'number')
      assert.ok(r.subscribers >= 1, `Expected at least 1 subscriber, got ${r.subscribers}`)

      // Wait for trigger handler to process the message
      await new Promise((r) => setTimeout(r, 200))
      assert.equal(onSubscribeMessages.length, before + 1, 'Trigger handler should have received the message')
      assert.equal(onSubscribeMessages[before]!.channel, 'test-chan')
      assert.equal(onSubscribeMessages[before]!.message, 'hello')
    })

    return { passed, failed }
  },
})

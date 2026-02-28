import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku'

export type TestMysqlInput = {}
export type TestMysqlOutput = { passed: number; failed: string[] }

export const testMysql = pikkuSessionlessFunc<TestMysqlInput, TestMysqlOutput>({
  func: async (_services, _input, { rpc }) => {
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

    const cleanup = async () => {
      await rpc.invoke('mysql:executeQuery', {
        query: 'DROP TABLE IF EXISTS pikku_test_items',
      })
      await rpc.invoke('mysql:executeQuery', {
        query: `CREATE TABLE pikku_test_items (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          value VARCHAR(255),
          count INT DEFAULT 0
        )`,
      })
    }

    // ── Insert ─────────────────────────────────────────────

    await cleanup()

    await run('insert a row', async () => {
      const r = await rpc.invoke('mysql:insert', {
        table: 'pikku_test_items',
        data: { name: 'alice', value: 'hello' },
      })
      assert.equal(r.affectedRows, 1)
    })

    await run('insert with returning', async () => {
      const r = await rpc.invoke('mysql:insert', {
        table: 'pikku_test_items',
        data: { name: 'bob', value: 'world' },
      })
      assert.ok(r.insertId > 0)
    })

    // ── InsertMany ─────────────────────────────────────────

    await cleanup()

    await run('insertMany rows', async () => {
      const r = await rpc.invoke('mysql:insertMany', {
        table: 'pikku_test_items',
        data: [
          { name: 'one', value: 'v1' },
          { name: 'two', value: 'v2' },
          { name: 'three', value: 'v3' },
        ],
      })
      assert.equal(r.affectedRows, 3)
    })

    // ── Select ─────────────────────────────────────────────

    await cleanup()

    await run('select all rows', async () => {
      await rpc.invoke('mysql:insert', { table: 'pikku_test_items', data: { name: 'a', value: '1' } })
      await rpc.invoke('mysql:insert', { table: 'pikku_test_items', data: { name: 'b', value: '2' } })
      await rpc.invoke('mysql:insert', { table: 'pikku_test_items', data: { name: 'c', value: '3' } })

      const r = await rpc.invoke('mysql:select', { table: 'pikku_test_items' })
      assert.equal(r.count, 3)
      assert.equal(r.results.length, 3)
    })

    await run('select with where = clause', async () => {
      const r = await rpc.invoke('mysql:select', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'name', operator: '=', value: 'b' }] },
      })
      assert.equal(r.count, 1)
      assert.equal(r.results[0].value, '2')
    })

    await run('select with columns', async () => {
      const r = await rpc.invoke('mysql:select', {
        table: 'pikku_test_items',
        columns: ['name'],
      })
      assert.equal(r.count, 3)
      assert.ok('name' in r.results[0])
      assert.ok(!('value' in r.results[0]))
    })

    await run('select with orderBy and limit', async () => {
      const r = await rpc.invoke('mysql:select', {
        table: 'pikku_test_items',
        orderBy: [{ column: 'name', direction: 'DESC' }],
        limit: 2,
      })
      assert.equal(r.count, 2)
      assert.equal(r.results[0].name, 'c')
      assert.equal(r.results[1].name, 'b')
    })

    // ── Update ─────────────────────────────────────────────

    await cleanup()

    await run('update rows', async () => {
      await rpc.invoke('mysql:insert', { table: 'pikku_test_items', data: { name: 'alice', value: 'old' } })
      await rpc.invoke('mysql:insert', { table: 'pikku_test_items', data: { name: 'bob', value: 'old' } })

      const r = await rpc.invoke('mysql:update', {
        table: 'pikku_test_items',
        data: { value: 'new' },
        where: { conditions: [{ column: 'name', operator: '=', value: 'alice' }] },
      })
      assert.equal(r.affectedRows, 1)

      const s = await rpc.invoke('mysql:select', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'name', operator: '=', value: 'alice' }] },
      })
      assert.equal(s.results[0].value, 'new')
    })

    // ── Delete ─────────────────────────────────────────────

    await cleanup()

    await run('delete rows', async () => {
      await rpc.invoke('mysql:insert', { table: 'pikku_test_items', data: { name: 'del1', value: 'v' } })
      await rpc.invoke('mysql:insert', { table: 'pikku_test_items', data: { name: 'del2', value: 'v' } })
      await rpc.invoke('mysql:insert', { table: 'pikku_test_items', data: { name: 'keep', value: 'v' } })

      const r = await rpc.invoke('mysql:deleteRows', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'name', operator: '=', value: 'del1' }] },
      })
      assert.equal(r.affectedRows, 1)

      const s = await rpc.invoke('mysql:select', { table: 'pikku_test_items' })
      assert.equal(s.count, 2)
    })

    // ── Truncate ───────────────────────────────────────────

    await run('truncate empties the table', async () => {
      await rpc.invoke('mysql:insert', { table: 'pikku_test_items', data: { name: 'trunc1', value: 'v' } })

      const before = await rpc.invoke('mysql:select', { table: 'pikku_test_items' })
      assert.ok(before.count > 0)

      const r = await rpc.invoke('mysql:truncate', {
        table: 'pikku_test_items',
      })
      assert.equal(r.success, true)

      const after = await rpc.invoke('mysql:select', { table: 'pikku_test_items' })
      assert.equal(after.count, 0)
    })

    // ── ExecuteQuery ───────────────────────────────────────

    await cleanup()

    await run('executeQuery with raw SQL', async () => {
      await rpc.invoke('mysql:insert', { table: 'pikku_test_items', data: { name: 'raw1', value: 'v1' } })
      await rpc.invoke('mysql:insert', { table: 'pikku_test_items', data: { name: 'raw2', value: 'v2' } })

      const r = await rpc.invoke('mysql:executeQuery', {
        query: 'SELECT name FROM pikku_test_items ORDER BY name',
      })
      assert.equal(r.results.length, 2)
      assert.equal(r.results[0].name, 'raw1')
    })

    await run('executeQuery with parameters', async () => {
      const r = await rpc.invoke('mysql:executeQuery', {
        query: 'SELECT * FROM pikku_test_items WHERE name = ?',
        parameters: ['raw2'],
      })
      assert.equal(r.results.length, 1)
      assert.equal(r.results[0].value, 'v2')
    })

    // ── Final cleanup ──────────────────────────────────────

    await rpc.invoke('mysql:executeQuery', {
      query: 'DROP TABLE IF EXISTS pikku_test_items',
    })

    return { passed, failed }
  },
})

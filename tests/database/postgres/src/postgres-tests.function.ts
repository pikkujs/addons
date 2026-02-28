import assert from 'node:assert/strict'
import pg from 'pg'
import { pikkuSessionlessFunc } from '#pikku'
import { onChangedMessages } from './on-change.function.js'

export type TestPostgresInput = { startTriggers: () => Promise<void> }
export type TestPostgresOutput = { passed: number; failed: string[] }

/**
 * Exercises every Postgres external package function through the RPC pipeline.
 * Each sub-test calls rpc.invoke('postgres:...') — the same path a real app uses.
 */
export const testPostgres = pikkuSessionlessFunc<TestPostgresInput, TestPostgresOutput>({
  func: async (_services, { startTriggers }, { rpc }) => {
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

    // Helper: clean up the test table before each group
    const cleanup = async () => {
      await rpc.invoke('postgres:executeQuery', {
        query: 'DROP TABLE IF EXISTS pikku_test_items',
      })
      await rpc.invoke('postgres:executeQuery', {
        query: `CREATE TABLE pikku_test_items (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          value TEXT,
          count INTEGER DEFAULT 0
        )`,
      })
      onChangedMessages.splice(0)
    }

    // ── Insert ─────────────────────────────────────────────

    await cleanup()

    await run('insert a row', async () => {
      const r = await rpc.invoke('postgres:insert', {
        table: 'pikku_test_items',
        data: { name: 'alice', value: 'hello' },
      })
      assert.equal(r.success, true)
      assert.equal(r.rowCount, 1)
    })

    await run('insert with returning', async () => {
      const r = await rpc.invoke('postgres:insert', {
        table: 'pikku_test_items',
        data: { name: 'bob', value: 'world' },
        returning: ['id', 'name'],
      })
      assert.equal(r.success, true)
      assert.equal(r.returning?.length, 1)
      assert.equal(r.returning[0].name, 'bob')
      assert.ok(r.returning[0].id > 0)
    })

    // ── Insert skipOnConflict ────────────────────────────────

    await cleanup()

    await run('insert skipOnConflict skips duplicate', async () => {
      // Add a unique constraint for conflict testing
      await rpc.invoke('postgres:executeQuery', {
        query: 'ALTER TABLE pikku_test_items ADD CONSTRAINT pikku_test_skip_name_unique UNIQUE (name)',
      })

      await rpc.invoke('postgres:insert', {
        table: 'pikku_test_items',
        data: { name: 'unique1', value: 'first' },
      })

      // This should silently skip instead of throwing
      const r = await rpc.invoke('postgres:insert', {
        table: 'pikku_test_items',
        data: { name: 'unique1', value: 'second' },
        skipOnConflict: true,
      })
      assert.equal(r.success, true)
      assert.equal(r.rowCount, 0)

      // Original value should remain
      const s = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'name', operator: '=', value: 'unique1' }] },
      })
      assert.equal(s.results[0].value, 'first')
    })

    await run('insert without skipOnConflict inserts normally', async () => {
      const r = await rpc.invoke('postgres:insert', {
        table: 'pikku_test_items',
        data: { name: 'unique2', value: 'normal' },
      })
      assert.equal(r.success, true)
      assert.equal(r.rowCount, 1)
    })

    // ── InsertMany ─────────────────────────────────────────

    await cleanup()

    await run('insertMany rows', async () => {
      const r = await rpc.invoke('postgres:insertMany', {
        table: 'pikku_test_items',
        data: [
          { name: 'one', value: 'v1' },
          { name: 'two', value: 'v2' },
          { name: 'three', value: 'v3' },
        ],
      })
      assert.equal(r.success, true)
      assert.equal(r.rowCount, 3)
    })

    await run('insertMany with returning', async () => {
      const r = await rpc.invoke('postgres:insertMany', {
        table: 'pikku_test_items',
        data: [
          { name: 'four', value: 'v4' },
          { name: 'five', value: 'v5' },
        ],
        returning: ['name'],
      })
      assert.equal(r.returning?.length, 2)
    })

    // ── Select ─────────────────────────────────────────────

    await cleanup()

    await run('select all rows', async () => {
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'a', value: '1' } })
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'b', value: '2' } })
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'c', value: '3' } })

      const r = await rpc.invoke('postgres:select', { table: 'pikku_test_items' })
      assert.equal(r.count, 3)
      assert.equal(r.results.length, 3)
    })

    await run('select with where = clause', async () => {
      const r = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'name', operator: '=', value: 'b' }] },
      })
      assert.equal(r.count, 1)
      assert.equal(r.results[0].value, '2')
    })

    await run('select with columns', async () => {
      const r = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        columns: ['name'],
      })
      assert.equal(r.count, 3)
      assert.ok('name' in r.results[0])
      assert.ok(!('value' in r.results[0]))
    })

    await run('select with sort and limit', async () => {
      const r = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        orderBy: [{ column: 'name', direction: 'DESC' }],
        limit: 2,
      })
      assert.equal(r.count, 2)
      assert.equal(r.results[0].name, 'c')
      assert.equal(r.results[1].name, 'b')
    })

    await run('select with offset', async () => {
      const r = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        orderBy: [{ column: 'name', direction: 'ASC' }],
        offset: 1,
        limit: 1,
      })
      assert.equal(r.count, 1)
      assert.equal(r.results[0].name, 'b')
    })

    await run('select returns empty for no matches', async () => {
      const r = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'name', operator: '=', value: 'nonexistent' }] },
      })
      assert.equal(r.count, 0)
      assert.deepEqual(r.results, [])
    })

    // ── Select: WHERE operators ─────────────────────────────

    await cleanup()

    await run('select with != operator', async () => {
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'x', value: 'keep' } })
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'y', value: 'skip' } })

      const r = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'value', operator: '!=', value: 'skip' }] },
      })
      assert.equal(r.count, 1)
      assert.equal(r.results[0].name, 'x')
    })

    await run('select with LIKE operator', async () => {
      const r = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'value', operator: 'LIKE', value: 'ke%' }] },
      })
      assert.equal(r.count, 1)
      assert.equal(r.results[0].value, 'keep')
    })

    await run('select with > operator', async () => {
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'z', value: 'v', count: 10 } })
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'w', value: 'v', count: 20 } })

      const r = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'count', operator: '>', value: 5 }] },
      })
      assert.equal(r.count, 2)
    })

    await run('select with < operator', async () => {
      const r = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'count', operator: '<', value: 15 }] },
      })
      // count=10 matches, count=0 (defaults) match
      assert.ok(r.count >= 1)
      const counts = r.results.map((row: any) => row.count)
      assert.ok(counts.every((c: number) => c < 15))
    })

    await run('select with >= operator', async () => {
      const r = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'count', operator: '>=', value: 10 }] },
      })
      assert.ok(r.count >= 2)
      const counts = r.results.map((row: any) => row.count)
      assert.ok(counts.every((c: number) => c >= 10))
    })

    await run('select with <= operator', async () => {
      const r = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'count', operator: '<=', value: 10 }] },
      })
      assert.ok(r.count >= 1)
      const counts = r.results.map((row: any) => row.count)
      assert.ok(counts.every((c: number) => c <= 10))
    })

    await run('select with IS NULL operator', async () => {
      // Insert a row with null value
      await rpc.invoke('postgres:executeQuery', {
        query: "INSERT INTO pikku_test_items (name, value) VALUES ('nullrow', NULL)",
      })

      const r = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'value', operator: 'IS NULL' }] },
      })
      assert.ok(r.count >= 1)
      assert.ok(r.results.some((row: any) => row.name === 'nullrow'))
    })

    await run('select with IS NOT NULL operator', async () => {
      const r = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'value', operator: 'IS NOT NULL' }] },
      })
      assert.ok(r.count >= 2)
      assert.ok(r.results.every((row: any) => row.value !== null))
    })

    // ── Select: OR combining ────────────────────────────────

    await run('select with OR combineWith', async () => {
      const r = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        where: {
          conditions: [
            { column: 'name', operator: '=', value: 'x' },
            { column: 'name', operator: '=', value: 'y' },
          ],
          combineWith: 'OR',
        },
      })
      assert.equal(r.count, 2)
      const names = r.results.map((row: any) => row.name).sort()
      assert.deepEqual(names, ['x', 'y'])
    })

    // ── Select: multi-column sort ───────────────────────────

    await cleanup()

    await run('select with multi-column sort', async () => {
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'a', value: 'z', count: 1 } })
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'a', value: 'y', count: 2 } })
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'b', value: 'x', count: 3 } })

      const r = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        orderBy: [
          { column: 'name', direction: 'ASC' },
          { column: 'count', direction: 'DESC' },
        ],
      })
      assert.equal(r.count, 3)
      // name 'a' first, then within 'a' sorted by count DESC → count=2 before count=1
      assert.equal(r.results[0].name, 'a')
      assert.equal(r.results[0].count, 2)
      assert.equal(r.results[1].name, 'a')
      assert.equal(r.results[1].count, 1)
      assert.equal(r.results[2].name, 'b')
    })

    // ── Update ─────────────────────────────────────────────

    await cleanup()

    await run('update rows', async () => {
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'alice', value: 'old' } })
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'bob', value: 'old' } })

      const r = await rpc.invoke('postgres:update', {
        table: 'pikku_test_items',
        data: { value: 'new' },
        where: { conditions: [{ column: 'name', operator: '=', value: 'alice' }] },
      })
      assert.equal(r.success, true)
      assert.equal(r.rowCount, 1)

      const s = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'name', operator: '=', value: 'alice' }] },
      })
      assert.equal(s.results[0].value, 'new')
    })

    await run('update with returning', async () => {
      const r = await rpc.invoke('postgres:update', {
        table: 'pikku_test_items',
        data: { value: 'updated' },
        where: { conditions: [{ column: 'name', operator: '=', value: 'bob' }] },
        returning: ['name', 'value'],
      })
      assert.equal(r.returning?.length, 1)
      assert.equal(r.returning[0].value, 'updated')
    })

    // ── Delete ─────────────────────────────────────────────

    await cleanup()

    await run('delete rows', async () => {
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'del1', value: 'v' } })
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'del2', value: 'v' } })
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'keep', value: 'v' } })

      const r = await rpc.invoke('postgres:deleteRows', {
        table: 'pikku_test_items',
        where: {
          conditions: [
            { column: 'value', operator: '=', value: 'v' },
            { column: 'name', operator: '=', value: 'del1' },
          ],
        },
      })
      assert.equal(r.success, true)
      assert.equal(r.rowCount, 1)

      const s = await rpc.invoke('postgres:select', { table: 'pikku_test_items' })
      assert.equal(s.count, 2)
    })

    await run('delete with returning', async () => {
      const r = await rpc.invoke('postgres:deleteRows', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'name', operator: '=', value: 'del2' }] },
        returning: ['name'],
      })
      assert.equal(r.returning?.length, 1)
      assert.equal(r.returning[0].name, 'del2')
    })

    // ── Upsert ─────────────────────────────────────────────

    await cleanup()

    await run('upsert inserts when no conflict', async () => {
      // Add a unique constraint for upsert testing
      await rpc.invoke('postgres:executeQuery', {
        query: 'ALTER TABLE pikku_test_items ADD CONSTRAINT pikku_test_items_name_unique UNIQUE (name)',
      })

      const r = await rpc.invoke('postgres:upsert', {
        table: 'pikku_test_items',
        data: { name: 'upsert1', value: 'initial' },
        conflictColumns: ['name'],
      })
      assert.equal(r.success, true)

      const s = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'name', operator: '=', value: 'upsert1' }] },
      })
      assert.equal(s.results[0].value, 'initial')
    })

    await run('upsert updates on conflict', async () => {
      const r = await rpc.invoke('postgres:upsert', {
        table: 'pikku_test_items',
        data: { name: 'upsert1', value: 'updated' },
        conflictColumns: ['name'],
      })
      assert.equal(r.success, true)

      const s = await rpc.invoke('postgres:select', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'name', operator: '=', value: 'upsert1' }] },
      })
      assert.equal(s.results[0].value, 'updated')
    })

    await run('upsert with returning', async () => {
      const r = await rpc.invoke('postgres:upsert', {
        table: 'pikku_test_items',
        data: { name: 'upsert2', value: 'new' },
        conflictColumns: ['name'],
        returning: ['name', 'value'],
      })
      assert.equal(r.returning?.length, 1)
      assert.equal(r.returning[0].name, 'upsert2')
    })

    // ── Truncate ───────────────────────────────────────────

    await run('truncate empties the table', async () => {
      // Insert some data first
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'trunc1', value: 'v' } })

      const before = await rpc.invoke('postgres:select', { table: 'pikku_test_items' })
      assert.ok(before.count > 0)

      const r = await rpc.invoke('postgres:truncate', {
        table: 'pikku_test_items',
      })
      assert.equal(r.success, true)

      const after = await rpc.invoke('postgres:select', { table: 'pikku_test_items' })
      assert.equal(after.count, 0)
    })

    // ── DropTable ──────────────────────────────────────────

    await run('dropTable basic', async () => {
      await rpc.invoke('postgres:executeQuery', {
        query: 'CREATE TABLE pikku_test_drop_basic (id SERIAL PRIMARY KEY)',
      })

      const r = await rpc.invoke('postgres:dropTable', {
        table: 'pikku_test_drop_basic',
      })
      assert.equal(r.success, true)

      const check = await rpc.invoke('postgres:executeQuery', {
        query: "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'pikku_test_drop_basic')",
      })
      assert.equal(check.results[0].exists, false)
    })

    await run('dropTable ifExists does not error on missing table', async () => {
      const r = await rpc.invoke('postgres:dropTable', {
        table: 'pikku_test_nonexistent_table',
        ifExists: true,
      })
      assert.equal(r.success, true)
    })

    await run('dropTable cascade', async () => {
      await rpc.invoke('postgres:executeQuery', {
        query: 'CREATE TABLE pikku_test_drop_parent (id SERIAL PRIMARY KEY)',
      })
      await rpc.invoke('postgres:executeQuery', {
        query: 'CREATE TABLE pikku_test_drop_child (id SERIAL PRIMARY KEY, parent_id INTEGER REFERENCES pikku_test_drop_parent(id))',
      })

      const r = await rpc.invoke('postgres:dropTable', {
        table: 'pikku_test_drop_parent',
        cascade: true,
      })
      assert.equal(r.success, true)

      // Cleanup child table
      await rpc.invoke('postgres:dropTable', { table: 'pikku_test_drop_child' })
    })

    // ── ExecuteQuery ───────────────────────────────────────

    await cleanup()

    await run('executeQuery with raw SQL', async () => {
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'raw1', value: 'v1' } })
      await rpc.invoke('postgres:insert', { table: 'pikku_test_items', data: { name: 'raw2', value: 'v2' } })

      const r = await rpc.invoke('postgres:executeQuery', {
        query: 'SELECT name FROM pikku_test_items ORDER BY name',
      })
      assert.equal(r.results.length, 2)
      assert.equal(r.results[0].name, 'raw1')
    })

    await run('executeQuery with parameters', async () => {
      const r = await rpc.invoke('postgres:executeQuery', {
        query: 'SELECT * FROM pikku_test_items WHERE name = $1',
        parameters: ['raw2'],
      })
      assert.equal(r.results.length, 1)
      assert.equal(r.results[0].value, 'v2')
    })

    await run('executeQuery DDL returns empty results', async () => {
      const r = await rpc.invoke('postgres:executeQuery', {
        query: 'CREATE TABLE IF NOT EXISTS pikku_test_temp (id SERIAL)',
      })
      assert.deepEqual(r.results, [])
      // Cleanup
      await rpc.invoke('postgres:executeQuery', { query: 'DROP TABLE pikku_test_temp' })
    })

    // ── onChanges Trigger ─────────────────────────────────
    // Tests the PG LISTEN/NOTIFY trigger mechanism used by the onChanges trigger.
    // Start triggers AFTER the table has been created so the postgres trigger can be set up.
    // Use TRUNCATE instead of DROP/CREATE to preserve the postgres trigger on the table.

    await cleanup() // Ensure table exists
    await startTriggers() // Now start triggers - postgres trigger will be created on the table

    const triggerCleanup = async () => {
      await rpc.invoke('postgres:truncate', { table: 'pikku_test_items' })
      onChangedMessages.splice(0)
    }

    await triggerCleanup()

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    await run('onChanges trigger fires on INSERT', async () => {
      await rpc.invoke('postgres:insert', {
        table: 'pikku_test_items',
        data: { name: 'trigger_insert', value: 'tv1' },
      })
      await wait(200)

      assert.equal(onChangedMessages?.length, 1)
      assert.equal(onChangedMessages[0].event, 'INSERT')
      // assert.equal(onChangedMessages[0].table, 'pikku_test_items')
      assert.equal(onChangedMessages[0].data.name, 'trigger_insert')
      assert.equal(onChangedMessages[0].data.value, 'tv1')
    })

    await triggerCleanup()

    await run('onChanges trigger fires on UPDATE', async () => {
      await rpc.invoke('postgres:insert', {
        table: 'pikku_test_items',
        data: { name: 'trigger_upd', value: 'before' },
      })
      await wait(100)
      onChangedMessages.splice(0) // Clear INSERT message

      await rpc.invoke('postgres:update', {
        table: 'pikku_test_items',
        data: { value: 'after' },
        where: { conditions: [{ column: 'name', operator: '=', value: 'trigger_upd' }] },
      })
      await wait(200)

      assert.equal(onChangedMessages?.length, 1)
      assert.equal(onChangedMessages[0].event, 'UPDATE')
      assert.equal(onChangedMessages[0].data.name, 'trigger_upd')
      assert.equal(onChangedMessages[0].data.value, 'after')
    })

    await triggerCleanup()

    await run('onChanges trigger fires on DELETE', async () => {
      await rpc.invoke('postgres:insert', {
        table: 'pikku_test_items',
        data: { name: 'trigger_del', value: 'goodbye' },
      })
      await wait(100)
      onChangedMessages.splice(0) // Clear INSERT message

      await rpc.invoke('postgres:deleteRows', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'name', operator: '=', value: 'trigger_del' }] },
      })
      await wait(200)

      assert.equal(onChangedMessages?.length, 1)
      assert.equal(onChangedMessages[0].event, 'DELETE')
      assert.equal(onChangedMessages[0].data.name, 'trigger_del')
      assert.equal(onChangedMessages[0].data.value, 'goodbye')
    })

    await triggerCleanup()

    await run('onChanges trigger fires on multiple events', async () => {
      assert.equal(onChangedMessages.length, 0)

      await rpc.invoke('postgres:insert', {
        table: 'pikku_test_items',
        data: { name: 'multi_ev', value: 'v1' },
      })
      await rpc.invoke('postgres:update', {
        table: 'pikku_test_items',
        data: { value: 'v2' },
        where: { conditions: [{ column: 'name', operator: '=', value: 'multi_ev' }] },
      })
      await rpc.invoke('postgres:deleteRows', {
        table: 'pikku_test_items',
        where: { conditions: [{ column: 'name', operator: '=', value: 'multi_ev' }] },
      })
      await wait(200)

      assert.equal(onChangedMessages?.length, 3)
      assert.equal(onChangedMessages[0].event, 'INSERT')
      assert.equal(onChangedMessages[1].event, 'UPDATE')
      assert.equal(onChangedMessages[1].data.value, 'v2')
      assert.equal(onChangedMessages[2].event, 'DELETE')

      // await run('onChanges trigger does not fire after teardown', async () => {
      //   await rpc.invoke('postgres:insert', {
      //     table: 'pikku_test_items',
      //     data: { name: 'after_teardown', value: 'nope' },
      //   })
      //   await wait(200)

      //   assert.equal(onChangedMessages.length, 0)
      // })

      // ── Final cleanup ──────────────────────────────────────

      await rpc.invoke('postgres:executeQuery', {
        query: 'DROP TABLE IF EXISTS pikku_test_items',
      })
    })

    return { passed, failed }
  },
})

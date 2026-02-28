import assert from 'node:assert/strict'
import { pikkuSessionlessFunc } from '#pikku'

export type TestSupabaseInput = {}
export type TestSupabaseOutput = { passed: number; failed: string[] }

export const testSupabase = pikkuSessionlessFunc<TestSupabaseInput, TestSupabaseOutput>({
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

    // -- Insert --
    await run('insertRows inserts a single row', async () => {
      const result = await rpc.invoke('supabase:insertRows', {
        table: 'test_items',
        data: { name: 'Item A', value: 10 },
        returning: true,
      })
      assert.ok(result.data, 'Expected data')
      assert.ok(result.data.length > 0, 'Expected inserted row')
      assert.equal(result.data[0].name, 'Item A')
    })

    await run('insertRows inserts multiple rows', async () => {
      const result = await rpc.invoke('supabase:insertRows', {
        table: 'test_items',
        data: [
          { name: 'Item B', value: 20 },
          { name: 'Item C', value: 30 },
        ],
        returning: true,
      })
      assert.ok(result.data.length >= 2, 'Expected 2 inserted rows')
    })

    // -- Select --
    await run('selectRows returns all rows', async () => {
      const result = await rpc.invoke('supabase:selectRows', {
        table: 'test_items',
      })
      assert.ok(Array.isArray(result.data), 'Expected data array')
      assert.ok(result.data.length >= 3, 'Expected at least 3 rows')
    })

    await run('selectRows filters with eq', async () => {
      const result = await rpc.invoke('supabase:selectRows', {
        table: 'test_items',
        filters: [{ column: 'name', operator: 'eq', value: 'Item A' }],
      })
      assert.equal(result.data.length, 1)
      assert.equal(result.data[0].name, 'Item A')
    })

    await run('selectRows supports orderBy', async () => {
      const result = await rpc.invoke('supabase:selectRows', {
        table: 'test_items',
        orderBy: { column: 'value', ascending: false },
      })
      assert.ok(result.data[0].value >= result.data[1].value, 'Expected descending order')
    })

    await run('selectRows supports limit', async () => {
      const result = await rpc.invoke('supabase:selectRows', {
        table: 'test_items',
        limit: 2,
      })
      assert.equal(result.data.length, 2)
    })

    // -- Update --
    await run('updateRows updates matching rows', async () => {
      const result = await rpc.invoke('supabase:updateRows', {
        table: 'test_items',
        data: { value: 99 },
        filters: [{ column: 'name', operator: 'eq', value: 'Item A' }],
        returning: true,
      })
      assert.ok(result.data, 'Expected data')
      assert.equal(result.data[0].value, 99)
    })

    // -- Upsert --
    await run('upsertRows upserts a row', async () => {
      const result = await rpc.invoke('supabase:upsertRows', {
        table: 'test_items',
        data: { name: 'Item D', value: 40 },
        returning: true,
      })
      assert.ok(result.data, 'Expected data')
      assert.ok(result.data.length > 0, 'Expected upserted row')
    })

    // -- Delete --
    await run('deleteRows removes matching rows', async () => {
      const result = await rpc.invoke('supabase:deleteRows', {
        table: 'test_items',
        filters: [{ column: 'name', operator: 'eq', value: 'Item D' }],
        returning: true,
      })
      assert.ok(result.data, 'Expected data')

      // Verify deletion
      const check = await rpc.invoke('supabase:selectRows', {
        table: 'test_items',
        filters: [{ column: 'name', operator: 'eq', value: 'Item D' }],
      })
      assert.equal(check.data.length, 0, 'Expected row to be deleted')
    })

    // -- RPC --
    await run('rpc calls a database function', async () => {
      const result = await rpc.invoke('supabase:rpc', {
        functionName: 'get_item_count',
      })
      assert.ok(typeof result.data === 'number', 'Expected numeric count')
    })

    return { passed, failed }
  }
})

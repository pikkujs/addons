import { describe, test } from 'node:test'
import assert from 'node:assert/strict'

import { listRecordItems } from './list-record-items.function.js'

const call = (services: any, data: any) =>
  (listRecordItems as any).func(services, data)

describe('airtable listRecordItems', () => {
  test('flattens id + createdTime + fields to the top level per record', async () => {
    const services = {
      airtable: {
        listRecords: async () => ({
          records: [
            {
              id: 'rec1',
              createdTime: '2026-01-01T00:00:00Z',
              fields: { Name: 'Alice', Age: 30 },
            },
            {
              id: 'rec2',
              createdTime: '2026-01-02T00:00:00Z',
              fields: { Name: 'Bob', Age: 41 },
            },
          ],
        }),
      },
    }

    const items = await call(services, { baseId: 'b', tableId: 't' })

    assert.deepEqual(items, [
      { id: 'rec1', createdTime: '2026-01-01T00:00:00Z', Name: 'Alice', Age: 30 },
      { id: 'rec2', createdTime: '2026-01-02T00:00:00Z', Name: 'Bob', Age: 41 },
    ])
  })

  test('returns [] when there are no records', async () => {
    const services = {
      airtable: { listRecords: async () => ({ records: [] }) },
    }
    assert.deepEqual(await call(services, { baseId: 'b', tableId: 't' }), [])
  })
})

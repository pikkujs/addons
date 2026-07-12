import { describe, test, afterEach } from 'node:test'
import assert from 'node:assert/strict'

import { AirtableService } from './airtable-api.service.js'

const realFetch = globalThis.fetch

afterEach(() => {
  globalThis.fetch = realFetch
})

function captureUrl() {
  const calls: string[] = []
  globalThis.fetch = (async (input: any) => {
    calls.push(String(input))
    return {
      ok: true,
      status: 200,
      json: async () => ({ records: [] }),
      text: async () => '',
    } as any
  }) as any
  return calls
}

describe('AirtableService URL construction', () => {
  test('listRecords keeps the /v0 API version segment', async () => {
    const calls = captureUrl()
    const svc = new AirtableService('pat_test')
    await svc.listRecords('appABC', 'People')
    assert.equal(calls.length, 1)
    // Regression: a leading-slash endpoint resolved against a base without a
    // trailing slash used to drop `/v0`, yielding a 404 INVALID_API_VERSION.
    assert.ok(
      calls[0]!.startsWith('https://api.airtable.com/v0/appABC/People'),
      `expected /v0/ in URL, got ${calls[0]}`
    )
  })

  test('encodes a table name containing a space', async () => {
    const calls = captureUrl()
    const svc = new AirtableService('pat_test')
    await svc.listRecords('appABC', 'Table 1')
    assert.ok(
      calls[0]!.includes('/v0/appABC/Table%201'),
      `expected encoded table segment, got ${calls[0]}`
    )
  })
})

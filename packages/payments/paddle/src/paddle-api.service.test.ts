import { describe, test, afterEach } from 'node:test'
import assert from 'node:assert/strict'

import { PaddleService } from './paddle-api.service.js'

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
      json: async () => ({}),
      text: async () => '',
    } as any
  }) as any
  return calls
}

describe('PaddleService URL construction', () => {
  test('joins base + endpoint with a single slash (production)', async () => {
    const calls = captureUrl()
    const svc = new PaddleService({ apiKey: 'k', sandbox: false } as any)
    await svc.request('GET', 'products')
    assert.equal(calls[0], 'https://api.paddle.com/products')
  })

  test('tolerates a leading-slash endpoint without doubling the slash', async () => {
    const calls = captureUrl()
    const svc = new PaddleService({ apiKey: 'k', sandbox: true } as any)
    await svc.request('GET', '/subscriptions')
    assert.equal(calls[0], 'https://sandbox-api.paddle.com/subscriptions')
  })

  test('preserves a versioned base path (the airtable failure mode)', async () => {
    const calls = captureUrl()
    const svc = new PaddleService({ apiKey: 'k', sandbox: false } as any)
    ;(svc as any).baseUrl = 'https://api.paddle.com/v1'
    await svc.request('GET', '/transactions')
    assert.equal(calls[0], 'https://api.paddle.com/v1/transactions')
  })
})

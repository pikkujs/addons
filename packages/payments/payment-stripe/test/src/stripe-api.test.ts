import assert from 'node:assert/strict'
import test, { afterEach } from 'node:test'
import { StripeApi } from '@pikku/addon-payment-stripe'

type Call = { url: string; init: RequestInit }

const realFetch = globalThis.fetch

const stub = (status: number, body: unknown): Call[] => {
  const calls: Call[] = []
  globalThis.fetch = (async (url: any, init: any) => {
    calls.push({ url: String(url), init })
    return new Response(typeof body === 'string' ? body : JSON.stringify(body), { status })
  }) as typeof fetch
  return calls
}

afterEach(() => {
  globalThis.fetch = realFetch
})

const headersOf = (init: RequestInit) => init.headers as Record<string, string>

test('posts form-encoded to the v1 path with a bearer key', async () => {
  const calls = stub(200, { id: 'cs_123' })
  const api = new StripeApi('sk_test_123')
  const result = await api.post<{ id: string }>('/checkout/sessions', { mode: 'payment' })

  assert.equal(result.id, 'cs_123')
  assert.equal(calls[0]!.url, 'https://api.stripe.com/v1/checkout/sessions')
  assert.equal(calls[0]!.init.method, 'POST')
  assert.equal(calls[0]!.init.body, 'mode=payment')
  assert.equal(headersOf(calls[0]!.init)['Authorization'], 'Bearer sk_test_123')
  assert.equal(
    headersOf(calls[0]!.init)['Content-Type'],
    'application/x-www-form-urlencoded'
  )
})

test('sends the idempotency key only when one is given', async () => {
  const calls = stub(200, {})
  const api = new StripeApi('sk_test_123')
  await api.post('/checkout/sessions', {}, 'order_abc')
  await api.post('/checkout/sessions', {})

  assert.equal(headersOf(calls[0]!.init)['Idempotency-Key'], 'order_abc')
  assert.equal(headersOf(calls[1]!.init)['Idempotency-Key'], undefined)
})

test('omits Stripe-Version unless one is configured', async () => {
  const calls = stub(200, {})
  await new StripeApi('sk_test_123').post('/x')
  await new StripeApi('sk_test_123', 'https://api.stripe.com', '2026-04-22').post('/x')

  assert.equal(headersOf(calls[0]!.init)['Stripe-Version'], undefined)
  assert.equal(headersOf(calls[1]!.init)['Stripe-Version'], '2026-04-22')
})

test('puts GET params in the query string and sends no body', async () => {
  const calls = stub(200, { data: [] })
  await new StripeApi('sk_test_123').get('/checkout/sessions', { limit: 10 })

  assert.equal(calls[0]!.url, 'https://api.stripe.com/v1/checkout/sessions?limit=10')
  assert.equal(calls[0]!.init.method, 'GET')
  assert.equal(calls[0]!.init.body, undefined)
})

test('honours an overridden api url, for a mock server', async () => {
  const calls = stub(200, {})
  await new StripeApi('sk_test_123', 'http://localhost:12111').post('/x')
  assert.equal(calls[0]!.url, 'http://localhost:12111/v1/x')
})

test("surfaces Stripe's error message and code", async () => {
  stub(402, { error: { message: 'Your card was declined.', code: 'card_declined' } })
  await assert.rejects(
    () => new StripeApi('sk_test_123').post('/payment_intents'),
    /Your card was declined\..*card_declined/
  )
})

test('reports a non-JSON body rather than throwing a parse error', async () => {
  stub(502, '<html>bad gateway</html>')
  await assert.rejects(
    () => new StripeApi('sk_test_123').get('/charges'),
    /non-JSON body/
  )
})

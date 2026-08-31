import { test } from 'node:test'
import assert from 'node:assert/strict'
import { StripeSignature } from '@pikku/addon-payment-stripe'

const SECRET = 'whsec_test_secret'
const BODY = JSON.stringify({ id: 'evt_123', type: 'checkout.session.completed' })

const sign = async (body: string, timestamp: number, secret = SECRET): Promise<string> => {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${timestamp}.${body}`))
  const hex = Array.from(new Uint8Array(mac))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
  return `t=${timestamp},v1=${hex}`
}

const now = () => Math.floor(Date.now() / 1000)

test('accepts a signature Stripe would have sent', async () => {
  const verifier = new StripeSignature(SECRET)
  await verifier.verify(BODY, await sign(BODY, now()))
})

test('accepts when the header carries several v1 signatures and one matches', async () => {
  const verifier = new StripeSignature(SECRET)
  const header = await sign(BODY, now())
  await verifier.verify(BODY, `${header},v1=${'0'.repeat(64)}`)
})

test('rejects a tampered body', async () => {
  const verifier = new StripeSignature(SECRET)
  const header = await sign(BODY, now())
  await assert.rejects(
    () => verifier.verify(BODY.replace('evt_123', 'evt_456'), header),
    /does not match/
  )
})

test('rejects a signature made with a different secret', async () => {
  const verifier = new StripeSignature(SECRET)
  const header = await sign(BODY, now(), 'whsec_wrong')
  await assert.rejects(() => verifier.verify(BODY, header), /does not match/)
})

test('rejects a replayed signature outside the tolerance', async () => {
  const verifier = new StripeSignature(SECRET, 300)
  const header = await sign(BODY, now() - 600)
  await assert.rejects(() => verifier.verify(BODY, header), /tolerance/)
})

test('accepts a timestamp inside the tolerance', async () => {
  const verifier = new StripeSignature(SECRET, 300)
  await verifier.verify(BODY, await sign(BODY, now() - 60))
})

test('rejects a header with no v1 signature', async () => {
  const verifier = new StripeSignature(SECRET)
  await assert.rejects(() => verifier.verify(BODY, `t=${now()}`), /Malformed/)
})

test('rejects a header with no timestamp', async () => {
  const verifier = new StripeSignature(SECRET)
  await assert.rejects(() => verifier.verify(BODY, `v1=${'0'.repeat(64)}`), /Malformed/)
})

test('an unprovisioned verifier refuses every caller', async () => {
  const verifier = new StripeSignature(null)
  assert.equal(verifier.configured, false)
  const header = await sign(BODY, now())
  await assert.rejects(() => verifier.verify(BODY, header), /not configured/)
})

test('a provisioned verifier reports configured', () => {
  assert.equal(new StripeSignature(SECRET).configured, true)
})

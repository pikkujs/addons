import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import { WhatsAppGatewayAdapter } from './whatsapp-gateway-adapter.js'
import { verifyWhatsAppSignature } from './whatsapp-signature.js'
import type { WhatsappService } from './whatsapp-api.service.js'
import type { PikkuHTTPRequest } from '@pikku/core/http'

const APP_SECRET = 'test-app-secret'

const sign = (body: string) =>
  'sha256=' + createHmac('sha256', APP_SECRET).update(body).digest('hex')

const mockService = () =>
  ({ phoneNumberId: 'test-phone-id' } as unknown as WhatsappService)

const mockRequest = (
  body: string,
  headers: Record<string, string> = {},
  method: string = 'post',
  query: Record<string, string> = {}
): PikkuHTTPRequest =>
  ({
    method: () => method,
    query: () => query,
    header: (name: string) => headers[name.toLowerCase()] ?? null,
    arrayBuffer: async () => new TextEncoder().encode(body).buffer,
  } as unknown as PikkuHTTPRequest)

const messagePayload = {
  object: 'whatsapp_business_account',
  entry: [{ id: 'biz-1', changes: [{ field: 'messages', value: {} }] }],
}

describe('verifyWhatsAppSignature', () => {
  test('accepts a correctly signed body', () => {
    const body = JSON.stringify(messagePayload)
    assert.equal(verifyWhatsAppSignature(APP_SECRET, sign(body), body), true)
  })

  test('rejects a tampered body', () => {
    const body = JSON.stringify(messagePayload)
    const signature = sign(body)
    assert.equal(
      verifyWhatsAppSignature(APP_SECRET, signature, body + ' '),
      false
    )
  })

  test('rejects a signature made with the wrong secret', () => {
    const body = JSON.stringify(messagePayload)
    const wrong =
      'sha256=' +
      createHmac('sha256', 'other-secret').update(body).digest('hex')
    assert.equal(verifyWhatsAppSignature(APP_SECRET, wrong, body), false)
  })

  test('rejects a signature without the sha256= prefix', () => {
    const body = JSON.stringify(messagePayload)
    const bare = sign(body).replace('sha256=', '')
    assert.equal(verifyWhatsAppSignature(APP_SECRET, bare, body), false)
  })

  test('rejects when no app secret is configured', () => {
    const body = JSON.stringify(messagePayload)
    assert.equal(verifyWhatsAppSignature('', sign(body), body), false)
  })
})

describe('WhatsAppGatewayAdapter webhook signature enforcement', () => {
  test('a correctly signed message delivery is accepted', async () => {
    const adapter = new WhatsAppGatewayAdapter(
      mockService(),
      'verify-token',
      APP_SECRET
    )
    const body = JSON.stringify(messagePayload)

    const result = await adapter.verifyWebhook(
      messagePayload,
      mockRequest(body, { 'x-hub-signature-256': sign(body) })
    )

    assert.deepEqual(result, { verified: false })
  })

  test('an unsigned message delivery is rejected', async () => {
    const adapter = new WhatsAppGatewayAdapter(
      mockService(),
      'verify-token',
      APP_SECRET
    )
    const body = JSON.stringify(messagePayload)

    await assert.rejects(
      () => adapter.verifyWebhook(messagePayload, mockRequest(body)),
      /signature/i
    )
  })

  test('a forged message delivery is rejected', async () => {
    const adapter = new WhatsAppGatewayAdapter(
      mockService(),
      'verify-token',
      APP_SECRET
    )
    const body = JSON.stringify(messagePayload)
    const forged =
      'sha256=' +
      createHmac('sha256', 'attacker-secret').update(body).digest('hex')

    await assert.rejects(
      () =>
        adapter.verifyWebhook(
          messagePayload,
          mockRequest(body, { 'x-hub-signature-256': forged })
        ),
      /signature/i
    )
  })

  test('a delivery with no request access is rejected', async () => {
    const adapter = new WhatsAppGatewayAdapter(
      mockService(),
      'verify-token',
      APP_SECRET
    )

    await assert.rejects(
      () => adapter.verifyWebhook(messagePayload, undefined),
      /signature/i
    )
  })

  test('the unsigned GET subscription challenge still succeeds', async () => {
    const adapter = new WhatsAppGatewayAdapter(
      mockService(),
      'my-verify-token',
      APP_SECRET
    )

    const challengeQuery = {
      'hub.mode': 'subscribe',
      'hub.verify_token': 'my-verify-token',
      'hub.challenge': 'challenge-value-123',
    }

    const result = await adapter.verifyWebhook(
      challengeQuery,
      mockRequest('', {}, 'get', challengeQuery)
    )

    assert.deepEqual(result, {
      verified: true,
      response: 'challenge-value-123',
    })
  })
})

import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { WhatsAppGatewayAdapter } from './whatsapp-gateway-adapter.js'
import type { WhatsappService } from './whatsapp-api.service.js'

// Mock WhatsApp service
const createMockWhatsappService = () => {
  const sentMessages: Array<{ endpoint: string; body: unknown }> = []
  return {
    service: {
      phoneNumberId: 'test-phone-id',
      request: async (
        method: string,
        endpoint: string,
        options?: { body?: unknown }
      ) => {
        sentMessages.push({ endpoint, body: options?.body })
        return { messages: [{ id: 'msg-id-1' }] }
      },
    } as unknown as WhatsappService,
    sentMessages,
  }
}

describe('WhatsAppGatewayAdapter', () => {
  describe('parse', () => {
    test('parses a text message from WhatsApp webhook', () => {
      const { service } = createMockWhatsappService()
      const adapter = new WhatsAppGatewayAdapter(service, 'verify-token')

      const result = adapter.parse({
        object: 'whatsapp_business_account',
        entry: [
          {
            id: 'biz-account-1',
            changes: [
              {
                value: {
                  messaging_product: 'whatsapp',
                  metadata: {
                    display_phone_number: '+1234567890',
                    phone_number_id: 'phone-1',
                  },
                  contacts: [
                    { profile: { name: 'John' }, wa_id: '491234567890' },
                  ],
                  messages: [
                    {
                      from: '491234567890',
                      id: 'wamid.abc123',
                      timestamp: '1234567890',
                      text: { body: 'Hello from WhatsApp!' },
                      type: 'text',
                    },
                  ],
                },
                field: 'messages',
              },
            ],
          },
        ],
      })

      assert.ok(result)
      assert.equal(result.senderId, '491234567890')
      assert.equal(result.text, 'Hello from WhatsApp!')
      assert.equal(result.metadata?.messageId, 'wamid.abc123')
      assert.equal(result.metadata?.contactName, 'John')
    })

    test('returns null for status updates (non-message events)', () => {
      const { service } = createMockWhatsappService()
      const adapter = new WhatsAppGatewayAdapter(service, 'verify-token')

      const result = adapter.parse({
        object: 'whatsapp_business_account',
        entry: [
          {
            changes: [
              {
                value: {
                  statuses: [
                    {
                      id: 'wamid.abc',
                      status: 'delivered',
                    },
                  ],
                },
                field: 'messages',
              },
            ],
          },
        ],
      })

      assert.equal(result, null)
    })

    test('returns null for non-whatsapp payloads', () => {
      const { service } = createMockWhatsappService()
      const adapter = new WhatsAppGatewayAdapter(service, 'verify-token')

      assert.equal(adapter.parse({ object: 'other' }), null)
      assert.equal(adapter.parse(null), null)
      assert.equal(adapter.parse(undefined), null)
    })

    test('parses interactive button reply', () => {
      const { service } = createMockWhatsappService()
      const adapter = new WhatsAppGatewayAdapter(service, 'verify-token')

      const result = adapter.parse({
        object: 'whatsapp_business_account',
        entry: [
          {
            changes: [
              {
                value: {
                  messages: [
                    {
                      from: '491234567890',
                      id: 'wamid.xyz',
                      type: 'interactive',
                      interactive: {
                        type: 'button_reply',
                        button_reply: {
                          id: 'btn-1',
                          title: 'Yes',
                        },
                      },
                    },
                  ],
                },
                field: 'messages',
              },
            ],
          },
        ],
      })

      assert.ok(result)
      assert.equal(result.text, 'Yes')
    })
  })

  describe('send', () => {
    test('sends a text message', async () => {
      const { service, sentMessages } = createMockWhatsappService()
      const adapter = new WhatsAppGatewayAdapter(service, 'verify-token')

      await adapter.send('491234567890', { text: 'Hello back!' })

      assert.equal(sentMessages.length, 1)
      const body = sentMessages[0].body as Record<string, any>
      assert.equal(body.messaging_product, 'whatsapp')
      assert.equal(body.to, '491234567890')
      assert.equal(body.type, 'text')
      assert.equal(body.text.body, 'Hello back!')
    })

    test('sends rich content', async () => {
      const { service, sentMessages } = createMockWhatsappService()
      const adapter = new WhatsAppGatewayAdapter(service, 'verify-token')

      await adapter.send('491234567890', {
        richContent: {
          type: 'template',
          template: { name: 'hello_world', language: { code: 'en_US' } },
        },
      })

      assert.equal(sentMessages.length, 1)
      const body = sentMessages[0].body as Record<string, any>
      assert.equal(body.to, '491234567890')
      assert.equal(body.type, 'template')
    })
  })

  describe('verifyWebhook', () => {
    test('verifies with correct token', () => {
      const { service } = createMockWhatsappService()
      const adapter = new WhatsAppGatewayAdapter(service, 'my-verify-token')

      const result = adapter.verifyWebhook({
        'hub.mode': 'subscribe',
        'hub.verify_token': 'my-verify-token',
        'hub.challenge': 'challenge-value-123',
      })

      assert.deepEqual(result, {
        verified: true,
        response: 'challenge-value-123',
      })
    })

    test('rejects with wrong token', () => {
      const { service } = createMockWhatsappService()
      const adapter = new WhatsAppGatewayAdapter(service, 'my-verify-token')

      const result = adapter.verifyWebhook({
        'hub.mode': 'subscribe',
        'hub.verify_token': 'wrong-token',
        'hub.challenge': 'challenge-value',
      })

      assert.deepEqual(result, { verified: false })
    })

    test('rejects non-subscribe mode', () => {
      const { service } = createMockWhatsappService()
      const adapter = new WhatsAppGatewayAdapter(service, 'my-verify-token')

      const result = adapter.verifyWebhook({
        'hub.mode': 'unsubscribe',
        'hub.verify_token': 'my-verify-token',
        'hub.challenge': 'challenge-value',
      })

      assert.deepEqual(result, { verified: false })
    })
  })
})

import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { SlackGatewayAdapter } from './slack-gateway-adapter.js'
import type { SlackService } from './slack-api.service.js'

// Mock Slack service
const createMockSlackService = () => {
  const sentMessages: Array<{ endpoint: string; body: unknown }> = []
  return {
    service: {
      request: async (
        method: string,
        endpoint: string,
        options?: { body?: unknown }
      ) => {
        sentMessages.push({ endpoint, body: options?.body })
        return { ok: true, ts: '1234567890.123456' }
      },
    } as unknown as SlackService,
    sentMessages,
  }
}

describe('SlackGatewayAdapter', () => {
  describe('parse', () => {
    test('parses a message event', () => {
      const { service } = createMockSlackService()
      const adapter = new SlackGatewayAdapter(service)

      const result = adapter.parse({
        type: 'event_callback',
        team_id: 'T12345',
        event_id: 'Ev12345',
        event: {
          type: 'message',
          user: 'U12345',
          text: 'Hello from Slack!',
          channel: 'C12345',
          ts: '1234567890.123456',
        },
      })

      assert.ok(result)
      assert.equal(result.senderId, 'U12345')
      assert.equal(result.text, 'Hello from Slack!')
      assert.equal(result.metadata?.channel, 'C12345')
      assert.equal(result.metadata?.ts, '1234567890.123456')
      assert.equal(result.metadata?.teamId, 'T12345')
    })

    test('returns null for url_verification events', () => {
      const { service } = createMockSlackService()
      const adapter = new SlackGatewayAdapter(service)

      const result = adapter.parse({
        type: 'url_verification',
        challenge: 'abc123',
        token: 'xoxb-test',
      })

      assert.equal(result, null)
    })

    test('returns null for bot messages', () => {
      const { service } = createMockSlackService()
      const adapter = new SlackGatewayAdapter(service)

      const result = adapter.parse({
        type: 'event_callback',
        event: {
          type: 'message',
          bot_id: 'B12345',
          text: 'Bot message',
          channel: 'C12345',
          ts: '1234567890.123456',
        },
      })

      assert.equal(result, null)
    })

    test('returns null for message subtypes', () => {
      const { service } = createMockSlackService()
      const adapter = new SlackGatewayAdapter(service)

      const result = adapter.parse({
        type: 'event_callback',
        event: {
          type: 'message',
          subtype: 'message_changed',
          user: 'U12345',
          text: 'Edited message',
          channel: 'C12345',
          ts: '1234567890.123456',
        },
      })

      assert.equal(result, null)
    })

    test('returns null for non-message events', () => {
      const { service } = createMockSlackService()
      const adapter = new SlackGatewayAdapter(service)

      const result = adapter.parse({
        type: 'event_callback',
        event: {
          type: 'reaction_added',
          user: 'U12345',
        },
      })

      assert.equal(result, null)
    })

    test('returns null for non-event_callback types', () => {
      const { service } = createMockSlackService()
      const adapter = new SlackGatewayAdapter(service)

      assert.equal(adapter.parse({ type: 'app_rate_limited' }), null)
      assert.equal(adapter.parse(null), null)
      assert.equal(adapter.parse(undefined), null)
    })

    test('parses thread replies', () => {
      const { service } = createMockSlackService()
      const adapter = new SlackGatewayAdapter(service)

      const result = adapter.parse({
        type: 'event_callback',
        event: {
          type: 'message',
          user: 'U12345',
          text: 'Thread reply',
          channel: 'C12345',
          ts: '1234567890.999999',
          thread_ts: '1234567890.123456',
        },
      })

      assert.ok(result)
      assert.equal(result.text, 'Thread reply')
      assert.equal(result.metadata?.threadTs, '1234567890.123456')
    })
  })

  describe('send', () => {
    test('sends a text message', async () => {
      const { service, sentMessages } = createMockSlackService()
      const adapter = new SlackGatewayAdapter(service)

      await adapter.send('C12345', { text: 'Hello back!' })

      assert.equal(sentMessages.length, 1)
      assert.equal(sentMessages[0].endpoint, 'chat.postMessage')
      const body = sentMessages[0].body as Record<string, any>
      assert.equal(body.channel, 'C12345')
      assert.equal(body.text, 'Hello back!')
    })

    test('sends rich content with blocks', async () => {
      const { service, sentMessages } = createMockSlackService()
      const adapter = new SlackGatewayAdapter(service)

      await adapter.send('C12345', {
        text: 'Fallback text',
        richContent: {
          blocks: [
            {
              type: 'section',
              text: { type: 'mrkdwn', text: '*Bold* text' },
            },
          ],
          thread_ts: '1234567890.123456',
        },
      })

      assert.equal(sentMessages.length, 1)
      const body = sentMessages[0].body as Record<string, any>
      assert.equal(body.text, 'Fallback text')
      assert.ok(Array.isArray(body.blocks))
      assert.equal(body.thread_ts, '1234567890.123456')
    })
  })

  describe('verifyWebhook', () => {
    test('handles url_verification challenge', () => {
      const { service } = createMockSlackService()
      const adapter = new SlackGatewayAdapter(service)

      const result = adapter.verifyWebhook({
        type: 'url_verification',
        challenge: 'my-challenge-token',
        token: 'Jhj5dZrVaK7ZwHHjRyZWjbDl',
      })

      assert.deepEqual(result, {
        verified: true,
        response: { challenge: 'my-challenge-token' },
      })
    })

    test('returns not verified for non-verification payloads', () => {
      const { service } = createMockSlackService()
      const adapter = new SlackGatewayAdapter(service)

      const result = adapter.verifyWebhook({
        type: 'event_callback',
        event: { type: 'message' },
      })

      assert.deepEqual(result, { verified: false })
    })
  })
})

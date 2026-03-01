import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { BaileysGatewayAdapter } from './baileys-gateway-adapter.js'

describe('BaileysGatewayAdapter', () => {
  describe('parse', () => {
    test('parses a plain text (conversation) message', () => {
      const adapter = new BaileysGatewayAdapter()

      const result = adapter.parse({
        key: {
          remoteJid: '491234567890@s.whatsapp.net',
          fromMe: false,
          id: 'MSG001',
        },
        message: { conversation: 'Hello from Baileys!' },
        pushName: 'John',
      })

      assert.ok(result)
      assert.equal(result.senderId, '491234567890@s.whatsapp.net')
      assert.equal(result.text, 'Hello from Baileys!')
      assert.equal(result.metadata?.messageId, 'MSG001')
      assert.equal(result.metadata?.pushName, 'John')
    })

    test('parses an extendedTextMessage', () => {
      const adapter = new BaileysGatewayAdapter()

      const result = adapter.parse({
        key: {
          remoteJid: '491234567890@s.whatsapp.net',
          fromMe: false,
          id: 'MSG002',
        },
        message: {
          extendedTextMessage: { text: 'Extended text with link preview' },
        },
      })

      assert.ok(result)
      assert.equal(result.text, 'Extended text with link preview')
    })

    test('parses an image message caption', () => {
      const adapter = new BaileysGatewayAdapter()

      const result = adapter.parse({
        key: {
          remoteJid: '491234567890@s.whatsapp.net',
          fromMe: false,
          id: 'MSG003',
        },
        message: {
          imageMessage: { caption: 'Check this out!', mimetype: 'image/jpeg' },
        },
      })

      assert.ok(result)
      assert.equal(result.text, 'Check this out!')
    })

    test('returns type indicator for media without caption', () => {
      const adapter = new BaileysGatewayAdapter()

      const result = adapter.parse({
        key: {
          remoteJid: '491234567890@s.whatsapp.net',
          fromMe: false,
          id: 'MSG004',
        },
        message: {
          imageMessage: { mimetype: 'image/jpeg' },
        },
      })

      assert.ok(result)
      assert.equal(result.text, '[imageMessage]')
    })

    test('filters out fromMe messages', () => {
      const adapter = new BaileysGatewayAdapter()

      const result = adapter.parse({
        key: {
          remoteJid: '491234567890@s.whatsapp.net',
          fromMe: true,
          id: 'MSG005',
        },
        message: { conversation: 'My own message' },
      })

      assert.equal(result, null)
    })

    test('filters out status broadcast messages', () => {
      const adapter = new BaileysGatewayAdapter()

      const result = adapter.parse({
        key: {
          remoteJid: 'status@broadcast',
          fromMe: false,
          id: 'MSG006',
        },
        message: { conversation: 'Status update' },
      })

      assert.equal(result, null)
    })

    test('returns null for null/undefined data', () => {
      const adapter = new BaileysGatewayAdapter()

      assert.equal(adapter.parse(null), null)
      assert.equal(adapter.parse(undefined), null)
      assert.equal(adapter.parse({}), null)
    })

    test('parses group messages with participant', () => {
      const adapter = new BaileysGatewayAdapter()

      const result = adapter.parse({
        key: {
          remoteJid: '120363123456789@g.us',
          fromMe: false,
          id: 'MSG007',
          participant: '491234567890@s.whatsapp.net',
        },
        message: { conversation: 'Hello group!' },
        pushName: 'Alice',
      })

      assert.ok(result)
      assert.equal(result.senderId, '120363123456789@g.us')
      assert.equal(result.text, 'Hello group!')
      assert.equal(
        result.metadata?.participant,
        '491234567890@s.whatsapp.net'
      )
      assert.equal(result.metadata?.pushName, 'Alice')
    })
  })

  describe('send', () => {
    const createConnectedAdapter = () => {
      const adapter = new BaileysGatewayAdapter()
      const sentMessages: Array<{
        jid: string
        content: unknown
      }> = []

      // Inject a mock socket
      ;(adapter as any).sock = {
        sendMessage: async (jid: string, content: unknown) => {
          sentMessages.push({ jid, content })
        },
      }

      return { adapter, sentMessages }
    }

    test('sends a text message', async () => {
      const { adapter, sentMessages } = createConnectedAdapter()

      await adapter.send('491234567890@s.whatsapp.net', {
        text: 'Hello!',
      })

      assert.equal(sentMessages.length, 1)
      assert.equal(sentMessages[0].jid, '491234567890@s.whatsapp.net')
      assert.deepEqual(sentMessages[0].content, { text: 'Hello!' })
    })

    test('sends rich content directly to Baileys', async () => {
      const { adapter, sentMessages } = createConnectedAdapter()

      const richContent = {
        image: { url: 'https://example.com/image.jpg' },
        caption: 'A photo',
      }

      await adapter.send('491234567890@s.whatsapp.net', {
        richContent,
      })

      assert.equal(sentMessages.length, 1)
      assert.deepEqual(sentMessages[0].content, richContent)
    })

    test('throws when not connected', async () => {
      const adapter = new BaileysGatewayAdapter()

      await assert.rejects(
        () =>
          adapter.send('491234567890@s.whatsapp.net', {
            text: 'Hello!',
          }),
        { message: 'Baileys adapter is not connected' }
      )
    })

    test('sends text and rich content together', async () => {
      const { adapter, sentMessages } = createConnectedAdapter()

      await adapter.send('491234567890@s.whatsapp.net', {
        text: 'See this image:',
        richContent: {
          image: { url: 'https://example.com/photo.jpg' },
        },
      })

      assert.equal(sentMessages.length, 2)
      assert.deepEqual(sentMessages[0].content, { text: 'See this image:' })
      assert.deepEqual(sentMessages[1].content, {
        image: { url: 'https://example.com/photo.jpg' },
      })
    })
  })
})

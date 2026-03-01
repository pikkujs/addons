import { test } from 'node:test'
import assert from 'node:assert/strict'
import { GenericContainer } from 'testcontainers'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'

test('email-send addon', { timeout: 120_000 }, async (t) => {
  const container = await new GenericContainer('axllent/mailpit')
    .withExposedPorts(1025, 8025)
    .withStartupTimeout(60_000)
    .start()

  const smtpPort = container.getMappedPort(1025)
  const apiPort = container.getMappedPort(8025)
  const host = container.getHost()

  const secrets = new LocalSecretService()
  await secrets.setSecretJSON('EMAIL_SEND_CREDENTIALS', {
    host,
    port: smtpPort,
    secure: false,
  })

  const singletonServices = await createSingletonServices({}, { secrets })
  const rpc = rpcService.getContextRPCService(singletonServices as any, {})

  try {
    await t.test('emailSend sends a plain text email', async () => {
      const result = await rpc.invoke('email-send:emailSend', {
        from: 'sender@test.com',
        to: 'recipient@test.com',
        subject: 'Test Email',
        text: 'Hello from pikku!',
      })
      assert.ok(result.messageId)
      assert.ok(result.accepted.length > 0)
      assert.equal(result.rejected.length, 0)
    })

    await t.test('emailSend sends to multiple recipients', async () => {
      const result = await rpc.invoke('email-send:emailSend', {
        from: 'sender@test.com',
        to: ['a@test.com', 'b@test.com'],
        subject: 'Multi-recipient',
        text: 'Hello all!',
      })
      assert.ok(result.messageId)
      assert.equal(result.accepted.length, 2)
    })

    await t.test('emailSend sends with cc and bcc', async () => {
      const result = await rpc.invoke('email-send:emailSend', {
        from: 'sender@test.com',
        to: 'recipient@test.com',
        cc: 'cc@test.com',
        bcc: 'bcc@test.com',
        subject: 'CC/BCC Test',
        text: 'With cc and bcc',
      })
      assert.ok(result.messageId)
    })

    await t.test('emailSendHtml sends an HTML email', async () => {
      const result = await rpc.invoke('email-send:emailSendHtml', {
        from: 'sender@test.com',
        to: 'recipient@test.com',
        subject: 'HTML Email',
        html: '<h1>Hello</h1><p>From pikku!</p>',
      })
      assert.ok(result.messageId)
      assert.ok(result.accepted.length > 0)
    })

    await t.test('verify emails arrived via mailpit API', async () => {
      const res = await fetch(`http://${host}:${apiPort}/api/v1/messages`)
      const data = await res.json()
      assert.ok(data.messages.length >= 4, `Expected at least 4 messages, got ${data.messages.length}`)
    })
  } finally {
    await stopSingletonServices()
    await container.stop()
  }
})

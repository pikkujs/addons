import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { GenericContainer, Wait } from 'testcontainers'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'
import net from 'node:net'

const TEST_USER = 'testuser@localhost'
const TEST_PASS = 'testpassword'

/** Send an email via raw SMTP to GreenMail */
async function sendEmail(
  smtpHost: string,
  smtpPort: number,
  from: string,
  to: string,
  subject: string,
  body: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection(smtpPort, smtpHost)
    const lines = [
      `EHLO localhost`,
      `MAIL FROM:<${from}>`,
      `RCPT TO:<${to}>`,
      `DATA`,
      `From: ${from}\r\nTo: ${to}\r\nSubject: ${subject}\r\nContent-Type: text/plain\r\n\r\n${body}\r\n.`,
      `QUIT`,
    ]
    let lineIndex = 0

    socket.setEncoding('utf8')
    socket.on('data', () => {
      if (lineIndex < lines.length) {
        socket.write(lines[lineIndex] + '\r\n')
        lineIndex++
      }
    })
    socket.on('end', resolve)
    socket.on('error', reject)
    socket.setTimeout(10_000, () => {
      socket.destroy()
      reject(new Error('SMTP timeout'))
    })
  })
}

test('imap addon', async () => {
  console.log('\n  Starting GreenMail container...')

  const container = await new GenericContainer('greenmail/standalone:2.1.2')
    .withExposedPorts(3025, 3143)
    .withWaitStrategy(Wait.forListeningPorts())
    .withStartupTimeout(60_000)
    .start()

  const smtpPort = container.getMappedPort(3025)
  const imapPort = container.getMappedPort(3143)
  const host = container.getHost()
  console.log(`  GreenMail ready - SMTP: ${host}:${smtpPort}, IMAP: ${host}:${imapPort}`)

  try {
    // Send test emails via SMTP (GreenMail auto-creates the user)
    console.log('  Sending test emails...')
    await sendEmail(host, smtpPort, 'sender@test.com', TEST_USER, 'Test Email 1', 'Hello from test 1')
    await sendEmail(host, smtpPort, 'sender@test.com', TEST_USER, 'Test Email 2', 'Hello from test 2')
    await sendEmail(host, smtpPort, 'another@test.com', TEST_USER, 'Another Subject', 'Different sender')

    const secrets = new LocalSecretService()
    await secrets.setSecretJSON('IMAP_CREDENTIALS', {
      user: TEST_USER,
      password: TEST_PASS,
      host,
      port: imapPort,
      secure: false,
      allowUnauthorizedCerts: true,
    })

    const singletonServices = await createSingletonServices({}, { secrets })
    const rpc = rpcService.getContextRPCService(singletonServices as any, {})

    try {
      const { passed, failed } = await rpc.invoke('testImap', {})

      console.log(`\n  ${passed} passed`)
      if (failed.length > 0) {
        console.log(`  ${failed.length} failed:`)
        for (const f of failed) console.log(`    ✗ ${f}`)
      }

      assert.equal(failed.length, 0, `Failed tests:\n${failed.join('\n')}`)
    } finally {
      await stopSingletonServices()
    }
  } finally {
    await container.stop()
  }
})

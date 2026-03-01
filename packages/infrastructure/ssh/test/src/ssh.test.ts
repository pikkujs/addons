import { test } from 'node:test'
import assert from 'node:assert/strict'
import { GenericContainer } from 'testcontainers'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const fixturesDir = new URL('../fixtures', import.meta.url).pathname
try { mkdirSync(fixturesDir, { recursive: true }) } catch {}
writeFileSync(join(fixturesDir, 'ssh-upload.txt'), 'Hello from SSH test!')

test('ssh addon', { timeout: 120_000 }, async (t) => {
  const container = await new GenericContainer('lscr.io/linuxserver/openssh-server:latest')
    .withExposedPorts(2222)
    .withEnvironment({
      PUID: '1000',
      PGID: '1000',
      USER_NAME: 'pikku',
      USER_PASSWORD: 'pikku123',
      PASSWORD_ACCESS: 'true',
    })
    .withStartupTimeout(60_000)
    .start()

  const host = container.getHost()
  const port = container.getMappedPort(2222)

  // Wait for SSH to be ready
  await new Promise((r) => setTimeout(r, 3000))

  const secrets = new LocalSecretService()
  await secrets.setSecretJSON('SSH_CREDENTIALS', {
    host,
    port,
    username: 'pikku',
    password: 'pikku123',
  })

  const singletonServices = await createSingletonServices({}, { secrets })
  const rpc = rpcService.getContextRPCService(singletonServices as any, {})

  try {
    await t.test('sshExecute runs a command', async () => {
      const result = await rpc.invoke('ssh:sshExecute', {
        command: 'echo "hello world"',
      })
      assert.equal(result.stdout.trim(), 'hello world')
      assert.equal(result.exitCode, 0)
    })

    await t.test('sshExecute with cwd', async () => {
      const result = await rpc.invoke('ssh:sshExecute', {
        command: 'pwd',
        cwd: '/tmp',
      })
      assert.equal(result.stdout.trim(), '/tmp')
    })

    await t.test('sshExecute captures stderr', async () => {
      const result = await rpc.invoke('ssh:sshExecute', {
        command: 'echo "error" >&2',
      })
      assert.equal(result.stderr.trim(), 'error')
    })

    await t.test('sshExecute returns exit code', async () => {
      const result = await rpc.invoke('ssh:sshExecute', {
        command: 'exit 42',
      })
      assert.equal(result.exitCode, 42)
    })

    await t.test('sshUpload uploads a file', async () => {
      const result = await rpc.invoke('ssh:sshUpload', {
        contentKey: 'ssh-upload.txt',
        remotePath: '/tmp/uploaded.txt',
      })
      assert.equal(result.remotePath, '/tmp/uploaded.txt')
      assert.ok(result.size > 0)
    })

    await t.test('sshExecute verifies uploaded file', async () => {
      const result = await rpc.invoke('ssh:sshExecute', {
        command: 'cat /tmp/uploaded.txt',
      })
      assert.equal(result.stdout.trim(), 'Hello from SSH test!')
    })

    await t.test('sshDownload downloads a file', async () => {
      const result = await rpc.invoke('ssh:sshDownload', {
        remotePath: '/tmp/uploaded.txt',
        outputContentKey: 'ssh-downloaded.txt',
      })
      assert.equal(result.outputContentKey, 'ssh-downloaded.txt')
      assert.ok(result.size > 0)
    })
  } finally {
    await stopSingletonServices()
    await container.stop()
  }
})

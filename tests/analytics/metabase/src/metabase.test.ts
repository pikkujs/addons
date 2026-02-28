import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { GenericContainer, Wait } from 'testcontainers'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'

async function waitForMetabase(baseUrl: string, timeoutMs = 240_000): Promise<void> {
  const start = Date.now()
  let lastError = ''
  let attempts = 0
  while (Date.now() - start < timeoutMs) {
    attempts++
    try {
      const controller = new AbortController()
      const fetchTimeout = setTimeout(() => controller.abort(), 10_000)
      const resp = await fetch(`${baseUrl}/api/health`, {
        signal: controller.signal,
      })
      clearTimeout(fetchTimeout)
      if (resp.ok) {
        try {
          const body = (await resp.json()) as { status: string }
          if (body.status === 'ok') {
            console.log(`  Health check passed after ${attempts} attempts (${Math.round((Date.now() - start) / 1000)}s)`)
            return
          }
          lastError = `status field was '${body.status}'`
        } catch {
          lastError = `got HTTP ${resp.status} but response was not valid JSON`
        }
      } else {
        lastError = `HTTP ${resp.status}`
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes('abort')) {
        lastError = 'request timed out after 10s'
      } else {
        lastError = msg
      }
    }
    if (attempts % 5 === 0) {
      const elapsed = Math.round((Date.now() - start) / 1000)
      console.log(`  Health check attempt ${attempts} (${elapsed}s elapsed): ${lastError}`)
    }
    await new Promise((r) => setTimeout(r, 3000))
  }
  throw new Error(`Metabase did not become healthy in time after ${attempts} attempts (${Math.round((Date.now() - start) / 1000)}s). Last error: ${lastError}`)
}

test('metabase addon', { timeout: 360_000 }, async () => {
  console.log('\n  Starting Metabase container (this may take a minute)...')

  const container = await new GenericContainer('metabase/metabase:latest')
    .withExposedPorts(3000)
    .withEnvironment({
      MB_DB_TYPE: 'h2',
      JAVA_TOOL_OPTIONS: '-Xmx512m',
    })
    .withStartupTimeout(240_000)
    .start()

  const baseUrl = `http://${container.getHost()}:${container.getMappedPort(3000)}`
  console.log(`  Waiting for Metabase to be ready at ${baseUrl}...`)

  try {
    await waitForMetabase(baseUrl)
    console.log('  Metabase is healthy')

    // Get setup token
    const propsResp = await fetch(`${baseUrl}/api/session/properties`)
    const props = (await propsResp.json()) as Record<string, any>
    const setupToken = props['setup-token']
    assert.ok(setupToken, 'Expected setup token')

    // Complete initial setup
    const setupResp = await fetch(`${baseUrl}/api/setup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: setupToken,
        user: {
          first_name: 'Test',
          last_name: 'User',
          email: 'test@test.com',
          password: 'Testpassword123!',
          site_name: 'Pikku Test',
        },
        prefs: {
          site_name: 'Pikku Test',
          site_locale: 'en',
          allow_tracking: false,
        },
      }),
    })
    const setupResult = (await setupResp.json()) as { id: string }
    const sessionToken = setupResult.id
    assert.ok(sessionToken, 'Expected session token from setup')
    console.log('  Metabase setup complete')

    // Create a test dashboard
    const dashResp = await fetch(`${baseUrl}/api/dashboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Metabase-Session': sessionToken,
      },
      body: JSON.stringify({ name: 'Pikku Test Dashboard' }),
    })
    assert.ok(dashResp.ok, 'Expected dashboard creation to succeed')

    const secrets = new LocalSecretService()
    await secrets.setSecretJSON('METABASE_CREDENTIALS', {
      host: baseUrl,
      sessionToken,
    })

    const singletonServices = await createSingletonServices({}, { secrets })
    const rpc = rpcService.getContextRPCService(singletonServices as any, {})

    try {
      const { passed, failed } = await rpc.invoke('testMetabase', {})

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

import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { GenericContainer, Wait } from 'testcontainers'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'

test('grafana addon', async () => {
  console.log('\n  Starting Grafana container...')

  const container = await new GenericContainer('grafana/grafana:latest')
    .withExposedPorts(3000)
    .withEnvironment({
      GF_SECURITY_ADMIN_PASSWORD: 'testpassword',
      GF_AUTH_ANONYMOUS_ENABLED: 'false',
    })
    .withWaitStrategy(Wait.forHttp('/api/health', 3000).forStatusCode(200))
    .withStartupTimeout(60_000)
    .start()

  const baseUrl = `http://${container.getHost()}:${container.getMappedPort(3000)}`
  console.log(`  Grafana ready at ${baseUrl}`)

  try {
    // Create a service account and token (API keys are deprecated in modern Grafana)
    const basicAuth = Buffer.from('admin:testpassword').toString('base64')
    const saResp = await fetch(`${baseUrl}/api/serviceaccounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify({ name: 'test-sa', role: 'Admin', isDisabled: false }),
    })
    const sa = (await saResp.json()) as { id: number }
    assert.ok(sa.id, 'Expected service account ID from Grafana')

    const tokenResp = await fetch(`${baseUrl}/api/serviceaccounts/${sa.id}/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify({ name: 'test-token' }),
    })
    const { key: apiKey } = (await tokenResp.json()) as { key: string }
    assert.ok(apiKey, 'Expected service account token from Grafana')

    // Create a test dashboard
    await fetch(`${baseUrl}/api/dashboards/db`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        dashboard: {
          title: 'Pikku Test Dashboard',
          tags: ['test'],
          timezone: 'browser',
          panels: [],
          schemaVersion: 27,
        },
        overwrite: true,
      }),
    })

    const secrets = new LocalSecretService()
    await secrets.setSecretJSON('GRAFANA_CREDENTIALS', {
      apiKey,
      baseUrl,
    })

    const singletonServices = await createSingletonServices({}, { secrets })
    const rpc = rpcService.getContextRPCService(singletonServices as any, {})

    try {
      const { passed, failed } = await rpc.invoke('testGrafana', {})

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

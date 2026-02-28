import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { GenericContainer, Wait } from 'testcontainers'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalVariablesService, ConsoleLogger } from '@pikku/core/services'
import { LocalContent } from '@pikku/core/services/local-content'
import { createSingletonServices } from './services.js'

const WHISPER_ASR_IMAGE = process.env.WHISPER_ASR_IMAGE || 'onerahmet/openai-whisper-asr-webservice:latest'

test('whisper-asr external package', async () => {
  console.log(`\n  Starting Whisper ASR container (${WHISPER_ASR_IMAGE})...`)

  const container = await new GenericContainer(WHISPER_ASR_IMAGE)
    .withEnvironment({
      ASR_MODEL: 'tiny',
      ASR_ENGINE: 'openai_whisper',
    })
    .withExposedPorts(9000)
    .withWaitStrategy(Wait.forHttp('/docs', 9000).forStatusCode(200))
    .withStartupTimeout(180_000)
    .start()

  const baseURL = `http://${container.getHost()}:${container.getMappedPort(9000)}`
  console.log(`  Whisper ASR ready at ${baseURL}`)

  try {
    const variables = new LocalVariablesService({ WHISPER_ASR_BASE_URL: baseURL })

    const fixturesDir = join(dirname(fileURLToPath(import.meta.url)), '../fixtures')
    const logger = new ConsoleLogger()
    const content = new LocalContent({
      localFileUploadPath: fixturesDir,
      uploadUrlPrefix: '/uploads',
      assetUrlPrefix: '/assets',
    }, logger)

    const singletonServices = await createSingletonServices({}, { variables, content } as any)
    const rpc = rpcService.getContextRPCService(singletonServices as any, {})

    try {
      const { passed, failed } = await rpc.invoke('testWhisperASR', {})

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

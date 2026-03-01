import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

test('elevenlabs external package', async () => {
  console.log('\n  Testing ElevenLabs TTS + STT...')

  const singletonServices = await createSingletonServices()
  const rpc = rpcService.getContextRPCService(singletonServices as any, {})

  try {
    const { passed, failed } = await rpc.invoke('testElevenLabs', {})

    console.log(`\n  ${passed} passed`)
    if (failed.length > 0) {
      console.log(`  ${failed.length} failed:`)
      for (const f of failed) console.log(`    ✗ ${f}`)
    }

    assert.equal(failed.length, 0, `Failed tests:\n${failed.join('\n')}`)
  } finally {
    await stopSingletonServices()
  }
})

import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalVariablesService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434/v1'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'smollm2:135m'
const OLLAMA_EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || 'all-minilm'

test('ollama external package', async () => {
  console.log(`\n  Testing against Ollama at ${OLLAMA_BASE_URL}`)
  console.log(`  Chat model: ${OLLAMA_MODEL}`)
  console.log(`  Embedding model: ${OLLAMA_EMBED_MODEL}`)

  const variables = new LocalVariablesService({ OLLAMA_BASE_URL })

  const singletonServices = await createSingletonServices({}, { variables })
  const rpc = rpcService.getContextRPCService(singletonServices as any, {})

  try {
    const { passed, failed } = await rpc.invoke('testOllama', {
      model: OLLAMA_MODEL,
      embedModel: OLLAMA_EMBED_MODEL,
    })

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

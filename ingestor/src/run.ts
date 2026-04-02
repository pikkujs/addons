/**
 * Run the OpenAPI addon ingestor workflow.
 *
 * Usage:
 *   cd ingestor && yarn ingest
 *
 * Environment:
 *   OUTPUT_DIR   - Where to generate addons (default: ../openapi)
 *   SPECS_DIR    - Where to cache specs (default: ../test-openapi-results/specs)
 *   MAX_OPS      - Skip specs with more operations (default: 500)
 *   CAMEL_CASE   - Convert to camelCase (default: true)
 */
import '../.pikku/pikku-bootstrap.gen.js'

import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'
import { resolve } from 'path'
import { existsSync } from 'fs'

async function main() {
  const singletonServices = await createSingletonServices({}, {})
  const { workflowService } = singletonServices as any
  const rpc = rpcService.getContextRPCService(singletonServices as any, {})

  const result = await workflowService.runToCompletion(
    'ingestOpenapi',
    {
      outputDir: resolve(process.env.OUTPUT_DIR || '../openapi'),
      specsDir: resolve(
        process.env.SPECS_DIR || '../test-openapi-results/specs'
      ),
      maxOps: Number(process.env.MAX_OPS || 500),
      camelCase: process.env.CAMEL_CASE !== 'false',
    },
    rpc
  )

  console.log('\n=== Ingestor Complete ===')
  console.log(`Total: ${result.total}`)
  console.log(`Passed: ${result.passed}`)
  console.log(`Skipped: ${result.skipped}`)
  console.log(`Failed: ${result.failed}`)
  console.log(
    `Pass rate: ${((result.passed / (result.passed + result.failed || 1)) * 100).toFixed(1)}%`
  )

  await stopSingletonServices()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

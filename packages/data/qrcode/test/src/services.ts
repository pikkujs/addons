import {
  ConsoleLogger,
  LocalVariablesService,
  LocalSecretService,
} from '@pikku/core/services'
import type { JWTService } from '@pikku/core/services'
import { LocalContent } from '@pikku/core/services/local-content'
import { pikkuServices } from '#pikku'

import '../.pikku/pikku-bootstrap.gen.js'

/**
 * LocalContent signs asset URLs and so requires a JWTService since
 * @pikku/core 0.12.74. These tests only read fixtures off disk and never
 * verify a signature, so an unsigned base64 round-trip is enough — it is a
 * test double, not something to reach for outside this harness.
 */
const jwt: JWTService = {
  encode: async (_expiresIn, payload) =>
    Buffer.from(JSON.stringify(payload)).toString('base64url'),
  decode: async (hash) =>
    JSON.parse(Buffer.from(hash, 'base64url').toString()),
}

export const createSingletonServices = pikkuServices(async (_config, existingServices) => {
  const variables = existingServices?.variables ?? new LocalVariablesService(process.env)
  const secrets = existingServices?.secrets ?? new LocalSecretService(variables)
  const logger = existingServices?.logger ?? new ConsoleLogger()

  const content = new LocalContent({
    localFileUploadPath: new URL('../fixtures', import.meta.url).pathname,
    uploadUrlPrefix: '/upload',
    assetUrlPrefix: '/assets',
  }, logger, jwt)

  return {
    logger,
    variables,
    secrets,
    content,
  }
})

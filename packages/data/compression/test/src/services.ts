import {
  ConsoleLogger,
  LocalVariablesService,
  LocalSecretService,
} from '@pikku/core/services'
import type { JWTService } from '@pikku/core/services'
import { LocalContent } from '@pikku/core/services/local-content'
import { pikkuServices } from '#pikku/addon/setup'

import '../.pikku/pikku-bootstrap.gen.ts'

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

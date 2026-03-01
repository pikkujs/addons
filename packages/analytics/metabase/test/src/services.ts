import { pikkuServices } from '#pikku'
import {
  ConsoleLogger,
  LocalVariablesService,
  LocalSecretService,
} from '@pikku/core/services'

export const createSingletonServices = pikkuServices(async (config, existingServices) => {
  const variables = existingServices?.variables ?? new LocalVariablesService(process.env)
  const secrets = existingServices?.secrets ?? new LocalSecretService(variables)

  return {
    config,
    logger: existingServices?.logger ?? new ConsoleLogger(),
    variables,
    secrets,
  }
})

import { pikkuServices } from '#pikku'
import {
  ConsoleLogger,
  LocalVariablesService,
  LocalSecretService,
  ContentService,
} from '@pikku/core/services'


export const createSingletonServices = pikkuServices(async (_config, existingServices) => {
  const variables = existingServices?.variables ?? new LocalVariablesService(process.env)
  const secrets = existingServices?.secrets ?? new LocalSecretService(variables)

  const content = (existingServices as any)?.content as ContentService | undefined
  if (!content) {
    throw new Error('ContentService is required — pass it via existingServices')
  }

  return {
    logger: existingServices?.logger ?? new ConsoleLogger(),
    variables,
    secrets,
    content,
  }
})

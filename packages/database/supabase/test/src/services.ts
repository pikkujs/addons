import { pikkuServices } from '#pikku/addon/setup'
import {
  ConsoleLogger,
  LocalVariablesService,
  LocalSecretService,
} from '@pikku/core/services'

export const createSingletonServices = pikkuServices(async (_config, existingServices) => {
  const variables = existingServices?.variables ?? new LocalVariablesService(process.env)
  const secrets = existingServices?.secrets ?? new LocalSecretService(variables)

  return {
    logger: existingServices?.logger ?? new ConsoleLogger(),
    variables,
    secrets,
    aiEmbedding: {
      model: 'test-embedding',
      embedQuery: async (_value: string) => [0.1, 0.2, 0.3],
      embedDocuments: async (values: string[]) => values.map(() => [0.1, 0.2, 0.3]),
    },
  }
})

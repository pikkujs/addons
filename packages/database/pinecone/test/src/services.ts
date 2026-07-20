import { pikkuServices } from '#pikku'
import {
  ConsoleLogger,
  LocalVariablesService,
  LocalSecretService,
} from '@pikku/core/services'

import '../.pikku/pikku-bootstrap.gen.js'

export const createSingletonServices = pikkuServices(
  async (_config, existingServices) => {
    const variables =
      existingServices?.variables ??
      new LocalVariablesService({
        PINECONE_HOST: 'https://index.pinecone.test',
        PINECONE_API_KEY: 'test-key',
      })
    const secrets =
      existingServices?.secrets ?? new LocalSecretService(variables)

    return {
      logger: existingServices?.logger ?? new ConsoleLogger(),
      variables,
      secrets,
      aiEmbedding: {
        model: 'test-embedding',
        embed: async (_value: string) => [0.1, 0.2, 0.3],
        embedMany: async (values: string[]) => values.map(() => [0.1, 0.2, 0.3]),
      },
    }
  }
)

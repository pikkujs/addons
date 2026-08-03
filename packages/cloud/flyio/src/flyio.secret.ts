import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const flyioSecretsSchema = z.object({
  apiKey: z.string().describe('Fly.io API key'),
  // Add other secret fields as needed
})

export type FlyioSecrets = z.infer<typeof flyioSecretsSchema>

defineSecret({
  name: 'flyio',
  displayName: 'Fly.io API',
  description: 'Fly.io integration for Pikku',
  secretId: 'FLYIO_CREDENTIALS',
  schema: flyioSecretsSchema,
})

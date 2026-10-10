import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const mistralSecretsSchema = z.string().describe('Mistral API key')

export type MistralSecrets = z.infer<typeof mistralSecretsSchema>

defineSecret({
  name: 'api_key',
  displayName: 'Mistral API Key',
  description: 'Mistral API key',
  secretId: 'MISTRAL_API_KEY',
  schema: mistralSecretsSchema,
})

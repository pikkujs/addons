import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const mistralSecretsSchema = z.string().describe('Mistral API key')

export type MistralSecrets = z.infer<typeof mistralSecretsSchema>

wireSecret({
  name: 'api_key',
  displayName: 'Mistral API Key',
  description: 'Mistral API key',
  secretId: 'MISTRAL_API_KEY',
  schema: mistralSecretsSchema,
})

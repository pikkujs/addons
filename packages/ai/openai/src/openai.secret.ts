import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const openaiSecretsSchema = z.string().describe('OpenAI API key')

export type OpenaiSecrets = z.infer<typeof openaiSecretsSchema>

defineSecret({
  name: 'api_key',
  displayName: 'OpenAI API Key',
  description: 'OpenAI API key',
  secretId: 'OPENAI_API_KEY',
  schema: openaiSecretsSchema,
})

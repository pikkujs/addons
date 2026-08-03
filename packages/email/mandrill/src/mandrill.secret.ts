import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const mandrillSecretsSchema = z.string().describe('Mandrill API key')

export type MandrillSecrets = z.infer<typeof mandrillSecretsSchema>

defineSecret({
  name: 'api_key',
  displayName: 'Mandrill API Key',
  description: 'Mandrill email API key',
  secretId: 'MANDRILL_API_KEY',
  schema: mandrillSecretsSchema,
})

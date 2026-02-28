import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const sendgridSecretsSchema = z.string().describe('SendGrid API key')

export type SendgridSecrets = z.infer<typeof sendgridSecretsSchema>

wireSecret({
  name: 'api_key',
  displayName: 'SendGrid API Key',
  description: 'SendGrid API key',
  secretId: 'SENDGRID_API_KEY',
  schema: sendgridSecretsSchema,
})

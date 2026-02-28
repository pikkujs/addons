import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const mailgunSecretsSchema = z.object({
  apiKey: z.string().describe('Mailgun API key'),
  apiDomain: z.enum(['api.mailgun.net', 'api.eu.mailgun.net']).describe('API domain (US or EU)'),
  emailDomain: z.string().describe('Your Mailgun sending domain'),
})

export type MailgunSecrets = z.infer<typeof mailgunSecretsSchema>

wireSecret({
  name: 'mailgun',
  displayName: 'Mailgun API',
  description: 'Email delivery service',
  secretId: 'MAILGUN_CREDENTIALS',
  schema: mailgunSecretsSchema,
})

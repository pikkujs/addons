import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const emailSendSecretsSchema = z.object({
  host: z.string().describe('SMTP server hostname'),
  port: z.number().describe('SMTP server port (25, 465, 587)'),
  user: z.string().optional().describe('SMTP username'),
  password: z.string().optional().describe('SMTP password'),
  secure: z.boolean().optional().describe('Use TLS (true for port 465)'),
})

export type EmailSendSecrets = z.infer<typeof emailSendSecretsSchema>

wireSecret({
  name: 'secrets',
  displayName: 'SMTP Credentials',
  description: 'SMTP server connection credentials',
  secretId: 'EMAIL_SEND_CREDENTIALS',
  schema: emailSendSecretsSchema,
})

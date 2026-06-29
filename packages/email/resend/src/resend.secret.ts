import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const resendSecretsSchema = z.object({
  apiKey: z.string().describe('Resend API key'),
  // Add other secret fields as needed
})

export type ResendSecrets = z.infer<typeof resendSecretsSchema>

wireSecret({
  name: 'resend',
  displayName: 'Resend API',
  description: 'Email API for developers',
  secretId: 'RESEND_CREDENTIALS',
  schema: resendSecretsSchema,
})

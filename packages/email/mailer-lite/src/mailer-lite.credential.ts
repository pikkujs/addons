import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const mailerLiteCredentialSchema = z.object({
  apiKey: z.string().describe('MailerLite API key'),
})

defineCredential({
  name: 'mailerLite',
  displayName: 'MailerLite',
  description: 'Consume the MailerLite email marketing API',
  type: 'wire',
  schema: mailerLiteCredentialSchema,
})

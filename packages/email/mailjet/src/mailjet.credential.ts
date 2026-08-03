import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const mailjetCredentialSchema = z.object({
  apiKey: z.string().describe('Mailjet API key'),
})

defineCredential({
  name: 'mailjet',
  displayName: 'Mailjet',
  description: 'Send transactional email and SMS via the Mailjet API',
  type: 'wire',
  schema: mailjetCredentialSchema,
})

import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const mailchimpCredentialSchema = z.object({
  apiKey: z.string().describe('Mailchimp API key'),
})

defineCredential({
  name: 'mailchimp',
  displayName: 'Mailchimp',
  description: 'Consume the Mailchimp Marketing API',
  type: 'wire',
  schema: mailchimpCredentialSchema,
})

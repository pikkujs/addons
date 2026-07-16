import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const mailchimpCredentialSchema = z.object({
  apiKey: z.string().describe('Mailchimp API key'),
})

wireCredential({
  name: 'mailchimp',
  displayName: 'Mailchimp',
  description: 'Consume the Mailchimp Marketing API',
  type: 'wire',
  schema: mailchimpCredentialSchema,
})

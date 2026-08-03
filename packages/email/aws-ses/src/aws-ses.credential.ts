import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const awsSesCredentialSchema = z.object({
  apiKey: z.string().describe('AWS SES API key'),
})

defineCredential({
  name: 'awsSes',
  displayName: 'AWS SES',
  description: 'Send emails and manage templates via AWS SES',
  type: 'wire',
  schema: awsSesCredentialSchema,
})

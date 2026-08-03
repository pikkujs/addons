import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const mailcheckCredentialSchema = z.object({
  apiKey: z.string().describe('Mailcheck API key'),
})

defineCredential({
  name: 'mailcheck',
  displayName: 'Mailcheck',
  description: 'Mailcheck addon',
  type: 'wire',
  schema: mailcheckCredentialSchema,
})

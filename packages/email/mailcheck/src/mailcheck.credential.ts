import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const mailcheckCredentialSchema = z.object({
  apiKey: z.string().describe('Mailcheck API key'),
})

wireCredential({
  name: 'mailcheck',
  displayName: 'Mailcheck',
  description: 'Mailcheck addon',
  type: 'wire',
  schema: mailcheckCredentialSchema,
})

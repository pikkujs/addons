import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const sendyCredentialSchema = z.object({
  apiKey: z.string().describe('Sendy API key'),
})

defineCredential({
  name: 'sendy',
  displayName: 'Sendy',
  description: 'Consume the Sendy email newsletter API',
  type: 'wire',
  schema: sendyCredentialSchema,
})

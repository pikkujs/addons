import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const convertkitCredentialSchema = z.object({
  apiKey: z.string().describe('ConvertKit API key'),
})

defineCredential({
  name: 'convertkit',
  displayName: 'ConvertKit',
  description: 'Consume the ConvertKit API',
  type: 'wire',
  schema: convertkitCredentialSchema,
})

import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const convertkitCredentialSchema = z.object({
  apiKey: z.string().describe('ConvertKit API key'),
})

wireCredential({
  name: 'convertkit',
  displayName: 'ConvertKit',
  description: 'Consume the ConvertKit API',
  type: 'wire',
  schema: convertkitCredentialSchema,
})

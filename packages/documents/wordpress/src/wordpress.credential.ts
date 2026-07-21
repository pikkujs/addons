import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const wordpressCredentialSchema = z.object({
  apiKey: z.string().describe('WordPress API key'),
})

wireCredential({
  name: 'wordpress',
  displayName: 'WordPress',
  description: 'WordPress integration for Pikku',
  type: 'wire',
  schema: wordpressCredentialSchema,
})

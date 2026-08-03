import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const wordpressCredentialSchema = z.object({
  apiKey: z.string().describe('WordPress API key'),
})

defineCredential({
  name: 'wordpress',
  displayName: 'WordPress',
  description: 'WordPress integration for Pikku',
  type: 'wire',
  schema: wordpressCredentialSchema,
})

import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const hunterCredentialSchema = z.object({
  apiKey: z.string().describe('Hunter API key'),
})

wireCredential({
  name: 'hunter',
  displayName: 'Hunter',
  description: 'Consume the Hunter email finder API',
  type: 'wire',
  schema: hunterCredentialSchema,
})

import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const hunterCredentialSchema = z.object({
  apiKey: z.string().describe('Hunter API key'),
})

defineCredential({
  name: 'hunter',
  displayName: 'Hunter',
  description: 'Consume the Hunter email finder API',
  type: 'wire',
  schema: hunterCredentialSchema,
})

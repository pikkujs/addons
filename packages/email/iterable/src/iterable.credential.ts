import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const iterableCredentialSchema = z.object({
  apiKey: z.string().describe('Iterable API key'),
})

defineCredential({
  name: 'iterable',
  displayName: 'Iterable',
  description: 'Consume the Iterable marketing API',
  type: 'wire',
  schema: iterableCredentialSchema,
})

import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const iterableCredentialSchema = z.object({
  apiKey: z.string().describe('Iterable API key'),
})

wireCredential({
  name: 'iterable',
  displayName: 'Iterable',
  description: 'Consume the Iterable marketing API',
  type: 'wire',
  schema: iterableCredentialSchema,
})

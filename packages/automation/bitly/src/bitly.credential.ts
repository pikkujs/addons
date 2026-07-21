import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const bitlyCredentialSchema = z.object({
  apiKey: z.string().describe('bitly API key'),
})

wireCredential({
  name: 'bitly',
  displayName: 'bitly',
  description: 'bitly addon',
  type: 'wire',
  schema: bitlyCredentialSchema,
})

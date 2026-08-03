import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const bitlyCredentialSchema = z.object({
  apiKey: z.string().describe('bitly API key'),
})

defineCredential({
  name: 'bitly',
  displayName: 'bitly',
  description: 'bitly addon',
  type: 'wire',
  schema: bitlyCredentialSchema,
})

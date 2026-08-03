import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const yourlsCredentialSchema = z.object({
  apiKey: z.string().describe('Yourls API key'),
})

defineCredential({
  name: 'yourls',
  displayName: 'Yourls',
  description: 'Yourls addon',
  type: 'wire',
  schema: yourlsCredentialSchema,
})

import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const yourlsCredentialSchema = z.object({
  apiKey: z.string().describe('Yourls API key'),
})

wireCredential({
  name: 'yourls',
  displayName: 'Yourls',
  description: 'Yourls addon',
  type: 'wire',
  schema: yourlsCredentialSchema,
})

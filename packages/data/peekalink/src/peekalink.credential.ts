import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const peekalinkCredentialSchema = z.object({
  apiKey: z.string().describe('Peekalink API key'),
})

wireCredential({
  name: 'peekalink',
  displayName: 'Peekalink',
  description: 'Peekalink addon',
  type: 'wire',
  schema: peekalinkCredentialSchema,
})

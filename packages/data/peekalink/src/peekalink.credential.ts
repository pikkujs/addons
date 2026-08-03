import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const peekalinkCredentialSchema = z.object({
  apiKey: z.string().describe('Peekalink API key'),
})

defineCredential({
  name: 'peekalink',
  displayName: 'Peekalink',
  description: 'Peekalink addon',
  type: 'wire',
  schema: peekalinkCredentialSchema,
})

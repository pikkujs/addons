import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const gotifyCredentialSchema = z.object({
  apiKey: z.string().describe('Gotify API key'),
})

defineCredential({
  name: 'gotify',
  displayName: 'Gotify',
  description: 'Gotify addon',
  type: 'wire',
  schema: gotifyCredentialSchema,
})

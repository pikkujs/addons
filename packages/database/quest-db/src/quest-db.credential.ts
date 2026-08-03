import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const questDbCredentialSchema = z.object({
  apiKey: z.string().describe('questdb API key'),
})

defineCredential({
  name: 'questDb',
  displayName: 'questdb',
  description: 'questdb addon',
  type: 'wire',
  schema: questDbCredentialSchema,
})

import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const questDbCredentialSchema = z.object({
  apiKey: z.string().describe('questdb API key'),
})

wireCredential({
  name: 'questDb',
  displayName: 'questdb',
  description: 'questdb addon',
  type: 'wire',
  schema: questDbCredentialSchema,
})

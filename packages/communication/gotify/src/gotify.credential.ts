import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const gotifyCredentialSchema = z.object({
  apiKey: z.string().describe('Gotify API key'),
})

wireCredential({
  name: 'gotify',
  displayName: 'Gotify',
  description: 'Gotify addon',
  type: 'wire',
  schema: gotifyCredentialSchema,
})

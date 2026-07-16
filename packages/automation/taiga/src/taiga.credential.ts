import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const taigaCredentialSchema = z.object({
  apiKey: z.string().describe('Taiga API key'),
})

wireCredential({
  name: 'taiga',
  displayName: 'Taiga',
  description: 'Consume the Taiga API',
  type: 'wire',
  schema: taigaCredentialSchema,
})

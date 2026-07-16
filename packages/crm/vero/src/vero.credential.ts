import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const veroCredentialSchema = z.object({
  apiKey: z.string().describe('Vero API key'),
})

wireCredential({
  name: 'vero',
  displayName: 'Vero',
  description: 'Vero addon',
  type: 'wire',
  schema: veroCredentialSchema,
})

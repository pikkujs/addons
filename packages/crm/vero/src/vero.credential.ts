import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const veroCredentialSchema = z.object({
  apiKey: z.string().describe('Vero API key'),
})

defineCredential({
  name: 'vero',
  displayName: 'Vero',
  description: 'Vero addon',
  type: 'wire',
  schema: veroCredentialSchema,
})

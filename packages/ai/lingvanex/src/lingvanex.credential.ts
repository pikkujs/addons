import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const lingvanexCredentialSchema = z.object({
  token: z.string().describe('LingvaNex bearer token'),
})

defineCredential({
  name: 'lingvanex',
  displayName: 'LingvaNex',
  description: 'Consume the LingvaNex translation API',
  type: 'wire',
  schema: lingvanexCredentialSchema,
})

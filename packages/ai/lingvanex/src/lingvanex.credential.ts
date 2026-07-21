import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const lingvanexCredentialSchema = z.object({
  token: z.string().describe('LingvaNex bearer token'),
})

wireCredential({
  name: 'lingvanex',
  displayName: 'LingvaNex',
  description: 'Consume the LingvaNex translation API',
  type: 'wire',
  schema: lingvanexCredentialSchema,
})

import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const copperCredentialSchema = z.object({
  apiKey: z.string().describe('Copper API key'),
})

wireCredential({
  name: 'copper',
  displayName: 'Copper',
  description: 'Consume the Copper CRM API',
  type: 'wire',
  schema: copperCredentialSchema,
})

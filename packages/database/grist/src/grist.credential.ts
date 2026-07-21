import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const gristCredentialSchema = z.object({
  apiKey: z.string().describe('Grist API key'),
})

wireCredential({
  name: 'grist',
  displayName: 'Grist',
  description: 'Grist integration for Pikku',
  type: 'wire',
  schema: gristCredentialSchema,
})

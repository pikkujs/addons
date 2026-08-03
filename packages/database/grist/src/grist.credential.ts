import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const gristCredentialSchema = z.object({
  apiKey: z.string().describe('Grist API key'),
})

defineCredential({
  name: 'grist',
  displayName: 'Grist',
  description: 'Grist integration for Pikku',
  type: 'wire',
  schema: gristCredentialSchema,
})

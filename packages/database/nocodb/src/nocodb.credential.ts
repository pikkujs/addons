import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const nocodbCredentialSchema = z.object({
  apiKey: z.string().describe('NocoDB API key'),
})

wireCredential({
  name: 'nocodb',
  displayName: 'NocoDB',
  description: 'NocoDB integration for Pikku',
  type: 'wire',
  schema: nocodbCredentialSchema,
})

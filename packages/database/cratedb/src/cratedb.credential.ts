import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const cratedbCredentialSchema = z.object({
  apiKey: z.string().describe('CrateDB API key'),
})

wireCredential({
  name: 'cratedb',
  displayName: 'CrateDB',
  description: 'Add and update data in CrateDB',
  type: 'wire',
  schema: cratedbCredentialSchema,
})

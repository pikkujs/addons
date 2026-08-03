import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const cratedbCredentialSchema = z.object({
  apiKey: z.string().describe('CrateDB API key'),
})

defineCredential({
  name: 'cratedb',
  displayName: 'CrateDB',
  description: 'Add and update data in CrateDB',
  type: 'wire',
  schema: cratedbCredentialSchema,
})

import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const timescaleDbCredentialSchema = z.object({
  apiKey: z.string().describe('timescaledb API key'),
})

defineCredential({
  name: 'timescaleDb',
  displayName: 'timescaledb',
  description: 'timescaledb addon',
  type: 'wire',
  schema: timescaleDbCredentialSchema,
})

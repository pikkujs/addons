import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const timescaleDbCredentialSchema = z.object({
  apiKey: z.string().describe('timescaledb API key'),
})

wireCredential({
  name: 'timescaleDb',
  displayName: 'timescaledb',
  description: 'timescaledb addon',
  type: 'wire',
  schema: timescaleDbCredentialSchema,
})

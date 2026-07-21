import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const clearbitCredentialSchema = z.object({
  token: z.string().describe('Clearbit bearer token'),
})

wireCredential({
  name: 'clearbit',
  displayName: 'Clearbit',
  description: 'Consume the Clearbit API for company and person enrichment',
  type: 'wire',
  schema: clearbitCredentialSchema,
})

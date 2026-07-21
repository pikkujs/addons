import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const orbitCredentialSchema = z.object({
  token: z.string().describe('Orbit bearer token'),
})

wireCredential({
  name: 'orbit',
  displayName: 'Orbit',
  description: 'Consume the Orbit API',
  type: 'wire',
  schema: orbitCredentialSchema,
})

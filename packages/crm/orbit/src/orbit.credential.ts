import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const orbitCredentialSchema = z.object({
  token: z.string().describe('Orbit bearer token'),
})

defineCredential({
  name: 'orbit',
  displayName: 'Orbit',
  description: 'Consume the Orbit API',
  type: 'wire',
  schema: orbitCredentialSchema,
})

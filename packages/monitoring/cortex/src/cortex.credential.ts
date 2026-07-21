import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const cortexCredentialSchema = z.object({
  token: z.string().describe('Cortex bearer token'),
})

wireCredential({
  name: 'cortex',
  displayName: 'Cortex',
  description: 'Run Cortex analyzers and responders on observables and entities',
  type: 'wire',
  schema: cortexCredentialSchema,
})

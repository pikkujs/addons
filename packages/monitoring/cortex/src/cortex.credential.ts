import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const cortexCredentialSchema = z.object({
  token: z.string().describe('Cortex bearer token'),
})

defineCredential({
  name: 'cortex',
  displayName: 'Cortex',
  description: 'Run Cortex analyzers and responders on observables and entities',
  type: 'wire',
  schema: cortexCredentialSchema,
})

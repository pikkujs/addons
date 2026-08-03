import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const asanaCredentialSchema = z.object({
  token: z.string().describe('Asana bearer token'),
})

defineCredential({
  name: 'asana',
  displayName: 'Asana',
  description: 'Consume the Asana REST API',
  type: 'wire',
  schema: asanaCredentialSchema,
})

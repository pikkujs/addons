import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const asanaCredentialSchema = z.object({
  token: z.string().describe('Asana bearer token'),
})

wireCredential({
  name: 'asana',
  displayName: 'Asana',
  description: 'Consume the Asana REST API',
  type: 'wire',
  schema: asanaCredentialSchema,
})

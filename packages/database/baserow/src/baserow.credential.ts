import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const baserowCredentialSchema = z.object({
  apiKey: z.string().describe('Baserow API key'),
})

defineCredential({
  name: 'baserow',
  displayName: 'Baserow',
  description: 'Consume the Baserow API',
  type: 'wire',
  schema: baserowCredentialSchema,
})

import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const signl4CredentialSchema = z.object({
  apiKey: z.string().describe('SIGNL4 API key'),
})

defineCredential({
  name: 'signl4',
  displayName: 'SIGNL4',
  description: 'Send and resolve SIGNL4 alerts',
  type: 'wire',
  schema: signl4CredentialSchema,
})

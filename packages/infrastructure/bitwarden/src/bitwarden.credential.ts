import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const bitwardenCredentialSchema = z.object({
  apiKey: z.string().describe('Bitwarden API key'),
})

defineCredential({
  name: 'bitwarden',
  displayName: 'Bitwarden',
  description: 'Consume the Bitwarden organization management API',
  type: 'wire',
  schema: bitwardenCredentialSchema,
})

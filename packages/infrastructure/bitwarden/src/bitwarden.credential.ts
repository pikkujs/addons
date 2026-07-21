import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const bitwardenCredentialSchema = z.object({
  apiKey: z.string().describe('Bitwarden API key'),
})

wireCredential({
  name: 'bitwarden',
  displayName: 'Bitwarden',
  description: 'Consume the Bitwarden organization management API',
  type: 'wire',
  schema: bitwardenCredentialSchema,
})

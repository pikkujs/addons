import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const totpCredentialSchema = z.object({
  apiKey: z.string().describe('TOTP API key'),
})

wireCredential({
  name: 'totp',
  displayName: 'TOTP',
  description: 'TOTP addon',
  type: 'wire',
  schema: totpCredentialSchema,
})

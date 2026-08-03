import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const totpCredentialSchema = z.object({
  apiKey: z.string().describe('TOTP API key'),
})

defineCredential({
  name: 'totp',
  displayName: 'TOTP',
  description: 'TOTP addon',
  type: 'wire',
  schema: totpCredentialSchema,
})

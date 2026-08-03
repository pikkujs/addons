import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const msg91CredentialSchema = z.object({
  apiKey: z.string().describe('MSG91 API key'),
})

defineCredential({
  name: 'msg91',
  displayName: 'MSG91',
  description: 'MSG91 addon',
  type: 'wire',
  schema: msg91CredentialSchema,
})

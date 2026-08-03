import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const uprocCredentialSchema = z.object({
  apiKey: z.string().describe('uProc API key'),
})

defineCredential({
  name: 'uproc',
  displayName: 'uProc',
  description: 'uProc data tools API (email/phone/address/company data enrichment and validation)',
  type: 'wire',
  schema: uprocCredentialSchema,
})

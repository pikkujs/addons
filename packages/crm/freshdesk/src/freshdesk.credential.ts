import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const freshdeskCredentialSchema = z.object({
  apiKey: z.string().describe('Freshdesk API key'),
})

defineCredential({
  name: 'freshdesk',
  displayName: 'Freshdesk',
  description: 'Freshdesk addon',
  type: 'wire',
  schema: freshdeskCredentialSchema,
})

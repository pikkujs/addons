import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const agileCrmCredentialSchema = z.object({
  apiKey: z.string().describe('Agile CRM API key'),
})

defineCredential({
  name: 'agileCrm',
  displayName: 'Agile CRM',
  description: 'Consume the Agile CRM API (contacts, companies, deals)',
  type: 'wire',
  schema: agileCrmCredentialSchema,
})

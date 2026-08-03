import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const erpnextCredentialSchema = z.object({
  apiKey: z.string().describe('ERPNext API key'),
})

defineCredential({
  name: 'erpnext',
  displayName: 'ERPNext',
  description: 'Consume the ERPNext REST API',
  type: 'wire',
  schema: erpnextCredentialSchema,
})

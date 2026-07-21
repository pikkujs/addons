import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const erpnextCredentialSchema = z.object({
  apiKey: z.string().describe('ERPNext API key'),
})

wireCredential({
  name: 'erpnext',
  displayName: 'ERPNext',
  description: 'Consume the ERPNext REST API',
  type: 'wire',
  schema: erpnextCredentialSchema,
})

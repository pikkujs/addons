import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const freshdeskCredentialSchema = z.object({
  apiKey: z.string().describe('Freshdesk API key'),
})

wireCredential({
  name: 'freshdesk',
  displayName: 'Freshdesk',
  description: 'Freshdesk addon',
  type: 'wire',
  schema: freshdeskCredentialSchema,
})

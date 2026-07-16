import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const zendeskCredentialSchema = z.object({
  apiKey: z.string().describe('Zendesk API key'),
})

wireCredential({
  name: 'zendesk',
  displayName: 'Zendesk',
  description: 'Zendesk integration for Pikku',
  type: 'wire',
  schema: zendeskCredentialSchema,
})

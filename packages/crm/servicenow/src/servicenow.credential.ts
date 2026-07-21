import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const servicenowCredentialSchema = z.object({
  apiKey: z.string().describe('ServiceNow API key'),
})

wireCredential({
  name: 'servicenow',
  displayName: 'ServiceNow',
  description: 'Consume the ServiceNow ITSM API',
  type: 'wire',
  schema: servicenowCredentialSchema,
})

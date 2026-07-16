import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const quickbaseCredentialSchema = z.object({
  apiKey: z.string().describe('Quick Base API key'),
})

wireCredential({
  name: 'quickbase',
  displayName: 'Quick Base',
  description: 'Integrate with the Quick Base RESTful API',
  type: 'wire',
  schema: quickbaseCredentialSchema,
})

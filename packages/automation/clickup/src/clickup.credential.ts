import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const clickupCredentialSchema = z.object({
  apiKey: z.string().describe('ClickUp API key'),
})

wireCredential({
  name: 'clickup',
  displayName: 'ClickUp',
  description: 'Consume the ClickUp API',
  type: 'wire',
  schema: clickupCredentialSchema,
})

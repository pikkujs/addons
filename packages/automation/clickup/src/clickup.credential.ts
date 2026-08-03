import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const clickupCredentialSchema = z.object({
  apiKey: z.string().describe('ClickUp API key'),
})

defineCredential({
  name: 'clickup',
  displayName: 'ClickUp',
  description: 'Consume the ClickUp API',
  type: 'wire',
  schema: clickupCredentialSchema,
})

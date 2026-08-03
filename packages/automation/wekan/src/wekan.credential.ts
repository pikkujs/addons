import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const wekanCredentialSchema = z.object({
  apiKey: z.string().describe('Wekan API key'),
})

defineCredential({
  name: 'wekan',
  displayName: 'Wekan',
  description: 'Consume the Wekan kanban API',
  type: 'wire',
  schema: wekanCredentialSchema,
})

import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const mondayComCredentialSchema = z.object({
  apiKey: z.string().describe('Monday.com API key'),
})

defineCredential({
  name: 'mondayCom',
  displayName: 'Monday.com',
  description: 'Consume the Monday.com GraphQL API',
  type: 'wire',
  schema: mondayComCredentialSchema,
})

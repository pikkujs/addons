import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const linearCredentialSchema = z.object({
  apiKey: z.string().describe('Linear API key'),
})

defineCredential({
  name: 'linear',
  displayName: 'Linear',
  description: 'Consume the Linear issue tracking GraphQL API',
  type: 'wire',
  schema: linearCredentialSchema,
})

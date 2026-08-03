import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const humanticAiCredentialSchema = z.object({
  apiKey: z.string().describe('Humantic AI API key'),
})

defineCredential({
  name: 'humanticAi',
  displayName: 'Humantic AI',
  description: 'Consume the Humantic AI personality API',
  type: 'wire',
  schema: humanticAiCredentialSchema,
})

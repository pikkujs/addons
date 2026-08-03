import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const bambooHrCredentialSchema = z.object({
  apiKey: z.string().describe('BambooHR API key'),
})

defineCredential({
  name: 'bambooHr',
  displayName: 'BambooHR',
  description: 'Consume the BambooHR HR API',
  type: 'wire',
  schema: bambooHrCredentialSchema,
})

import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const bambooHrCredentialSchema = z.object({
  apiKey: z.string().describe('BambooHR API key'),
})

wireCredential({
  name: 'bambooHr',
  displayName: 'BambooHR',
  description: 'Consume the BambooHR HR API',
  type: 'wire',
  schema: bambooHrCredentialSchema,
})

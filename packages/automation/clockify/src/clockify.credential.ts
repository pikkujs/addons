import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const clockifyCredentialSchema = z.object({
  apiKey: z.string().describe('Clockify API key'),
})

defineCredential({
  name: 'clockify',
  displayName: 'Clockify',
  description: 'Consume the Clockify time-tracking REST API',
  type: 'wire',
  schema: clockifyCredentialSchema,
})

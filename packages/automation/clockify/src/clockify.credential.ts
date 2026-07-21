import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const clockifyCredentialSchema = z.object({
  apiKey: z.string().describe('Clockify API key'),
})

wireCredential({
  name: 'clockify',
  displayName: 'Clockify',
  description: 'Consume the Clockify time-tracking REST API',
  type: 'wire',
  schema: clockifyCredentialSchema,
})

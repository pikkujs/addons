import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const vonageCredentialSchema = z.object({
  apiKey: z.string().describe('Vonage API key'),
})

wireCredential({
  name: 'vonage',
  displayName: 'Vonage',
  description: 'Send SMS messages via the Vonage (Nexmo) API',
  type: 'wire',
  schema: vonageCredentialSchema,
})

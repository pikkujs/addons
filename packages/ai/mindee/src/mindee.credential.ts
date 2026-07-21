import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const mindeeCredentialSchema = z.object({
  apiKey: z.string().describe('Mindee API key'),
})

wireCredential({
  name: 'mindee',
  displayName: 'Mindee',
  description: 'Mindee OCR document prediction API',
  type: 'wire',
  schema: mindeeCredentialSchema,
})

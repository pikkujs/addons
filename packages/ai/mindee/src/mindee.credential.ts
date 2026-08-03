import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const mindeeCredentialSchema = z.object({
  apiKey: z.string().describe('Mindee API key'),
})

defineCredential({
  name: 'mindee',
  displayName: 'Mindee',
  description: 'Mindee OCR document prediction API',
  type: 'wire',
  schema: mindeeCredentialSchema,
})

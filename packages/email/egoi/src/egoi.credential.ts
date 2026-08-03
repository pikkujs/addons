import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const egoiCredentialSchema = z.object({
  apiKey: z.string().describe('E-goi API key'),
})

defineCredential({
  name: 'egoi',
  displayName: 'E-goi',
  description: 'Consume the E-goi marketing API (contacts)',
  type: 'wire',
  schema: egoiCredentialSchema,
})

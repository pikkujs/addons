import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const emeliaCredentialSchema = z.object({
  apiKey: z.string().describe('Emelia API key'),
})

defineCredential({
  name: 'emelia',
  displayName: 'Emelia',
  description: 'Consume the Emelia cold email API',
  type: 'wire',
  schema: emeliaCredentialSchema,
})

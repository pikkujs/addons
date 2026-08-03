import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const lemlistCredentialSchema = z.object({
  apiKey: z.string().describe('Lemlist API key'),
})

defineCredential({
  name: 'lemlist',
  displayName: 'Lemlist',
  description: 'Consume the Lemlist cold email API',
  type: 'wire',
  schema: lemlistCredentialSchema,
})

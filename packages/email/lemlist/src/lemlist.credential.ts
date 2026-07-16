import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const lemlistCredentialSchema = z.object({
  apiKey: z.string().describe('Lemlist API key'),
})

wireCredential({
  name: 'lemlist',
  displayName: 'Lemlist',
  description: 'Consume the Lemlist cold email API',
  type: 'wire',
  schema: lemlistCredentialSchema,
})

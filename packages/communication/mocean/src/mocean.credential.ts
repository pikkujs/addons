import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const moceanCredentialSchema = z.object({
  apiKey: z.string().describe('mocean API key'),
})

defineCredential({
  name: 'mocean',
  displayName: 'mocean',
  description: 'mocean addon',
  type: 'wire',
  schema: moceanCredentialSchema,
})

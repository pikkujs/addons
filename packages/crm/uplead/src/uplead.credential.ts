import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const upleadCredentialSchema = z.object({
  apiKey: z.string().describe('uplead API key'),
})

defineCredential({
  name: 'uplead',
  displayName: 'uplead',
  description: 'uplead addon',
  type: 'wire',
  schema: upleadCredentialSchema,
})

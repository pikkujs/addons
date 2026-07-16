import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const upleadCredentialSchema = z.object({
  apiKey: z.string().describe('uplead API key'),
})

wireCredential({
  name: 'uplead',
  displayName: 'uplead',
  description: 'uplead addon',
  type: 'wire',
  schema: upleadCredentialSchema,
})

import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const moceanCredentialSchema = z.object({
  apiKey: z.string().describe('mocean API key'),
})

wireCredential({
  name: 'mocean',
  displayName: 'mocean',
  description: 'mocean addon',
  type: 'wire',
  schema: moceanCredentialSchema,
})

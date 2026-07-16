import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const dhlCredentialSchema = z.object({
  apiKey: z.string().describe('DHL API key'),
})

wireCredential({
  name: 'dhl',
  displayName: 'DHL',
  description: 'DHL addon',
  type: 'wire',
  schema: dhlCredentialSchema,
})

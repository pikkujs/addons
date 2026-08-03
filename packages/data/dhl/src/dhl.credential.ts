import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const dhlCredentialSchema = z.object({
  apiKey: z.string().describe('DHL API key'),
})

defineCredential({
  name: 'dhl',
  displayName: 'DHL',
  description: 'DHL addon',
  type: 'wire',
  schema: dhlCredentialSchema,
})

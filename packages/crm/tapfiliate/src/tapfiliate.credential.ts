import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const tapfiliateCredentialSchema = z.object({
  apiKey: z.string().describe('Tapfiliate API key'),
})

defineCredential({
  name: 'tapfiliate',
  displayName: 'Tapfiliate',
  description: 'Consume the Tapfiliate affiliate marketing API',
  type: 'wire',
  schema: tapfiliateCredentialSchema,
})

import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const onfleetCredentialSchema = z.object({
  apiKey: z.string().describe('Onfleet API key'),
})

defineCredential({
  name: 'onfleet',
  displayName: 'Onfleet',
  description: 'Onfleet addon',
  type: 'wire',
  schema: onfleetCredentialSchema,
})

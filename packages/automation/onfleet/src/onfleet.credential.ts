import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const onfleetCredentialSchema = z.object({
  apiKey: z.string().describe('Onfleet API key'),
})

wireCredential({
  name: 'onfleet',
  displayName: 'Onfleet',
  description: 'Onfleet addon',
  type: 'wire',
  schema: onfleetCredentialSchema,
})

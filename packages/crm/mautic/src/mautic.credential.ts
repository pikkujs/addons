import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const mauticCredentialSchema = z.object({
  apiKey: z.string().describe('Mautic API key'),
})

wireCredential({
  name: 'mautic',
  displayName: 'Mautic',
  description: 'Consume the Mautic marketing automation API',
  type: 'wire',
  schema: mauticCredentialSchema,
})

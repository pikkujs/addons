import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const mauticCredentialSchema = z.object({
  apiKey: z.string().describe('Mautic API key'),
})

defineCredential({
  name: 'mautic',
  displayName: 'Mautic',
  description: 'Consume the Mautic marketing automation API',
  type: 'wire',
  schema: mauticCredentialSchema,
})

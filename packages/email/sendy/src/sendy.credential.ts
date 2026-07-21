import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const sendyCredentialSchema = z.object({
  apiKey: z.string().describe('Sendy API key'),
})

wireCredential({
  name: 'sendy',
  displayName: 'Sendy',
  description: 'Consume the Sendy email newsletter API',
  type: 'wire',
  schema: sendyCredentialSchema,
})

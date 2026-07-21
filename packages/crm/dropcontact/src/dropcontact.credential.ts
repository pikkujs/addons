import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const dropcontactCredentialSchema = z.object({
  apiKey: z.string().describe('Dropcontact API key'),
})

wireCredential({
  name: 'dropcontact',
  displayName: 'Dropcontact',
  description: 'Find B2B emails and enrich contacts',
  type: 'wire',
  schema: dropcontactCredentialSchema,
})

import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const dropcontactCredentialSchema = z.object({
  apiKey: z.string().describe('Dropcontact API key'),
})

defineCredential({
  name: 'dropcontact',
  displayName: 'Dropcontact',
  description: 'Find B2B emails and enrich contacts',
  type: 'wire',
  schema: dropcontactCredentialSchema,
})

import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const airtopCredentialSchema = z.object({
  token: z.string().describe('Airtop bearer token'),
})

defineCredential({
  name: 'airtop',
  displayName: 'Airtop',
  description: 'Scrape and control any site with Airtop',
  type: 'wire',
  schema: airtopCredentialSchema,
})

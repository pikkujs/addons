import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const webflowCredentialSchema = z.object({
  token: z.string().describe('Webflow bearer token'),
})

defineCredential({
  name: 'webflow',
  displayName: 'Webflow',
  description: 'Consume the Webflow CMS API',
  type: 'wire',
  schema: webflowCredentialSchema,
})

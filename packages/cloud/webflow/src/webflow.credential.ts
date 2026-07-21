import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const webflowCredentialSchema = z.object({
  token: z.string().describe('Webflow bearer token'),
})

wireCredential({
  name: 'webflow',
  displayName: 'Webflow',
  description: 'Consume the Webflow CMS API',
  type: 'wire',
  schema: webflowCredentialSchema,
})

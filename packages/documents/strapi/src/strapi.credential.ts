import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const strapiCredentialSchema = z.object({
  token: z.string().describe('Strapi bearer token'),
})

wireCredential({
  name: 'strapi',
  displayName: 'Strapi',
  description: 'Consume the Strapi headless CMS API',
  type: 'wire',
  schema: strapiCredentialSchema,
})

import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const storyblokCredentialSchema = z.object({
  apiKey: z.string().describe('Storyblok API key'),
})

defineCredential({
  name: 'storyblok',
  displayName: 'Storyblok',
  description: 'Consume the Storyblok headless CMS Management API',
  type: 'wire',
  schema: storyblokCredentialSchema,
})

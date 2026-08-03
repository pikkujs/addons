import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const discourseCredentialSchema = z.object({
  apiKey: z.string().describe('Discourse API key'),
})

defineCredential({
  name: 'discourse',
  displayName: 'Discourse',
  description: 'Consume the Discourse forum API',
  type: 'wire',
  schema: discourseCredentialSchema,
})

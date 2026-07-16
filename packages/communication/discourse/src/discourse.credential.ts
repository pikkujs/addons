import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const discourseCredentialSchema = z.object({
  apiKey: z.string().describe('Discourse API key'),
})

wireCredential({
  name: 'discourse',
  displayName: 'Discourse',
  description: 'Consume the Discourse forum API',
  type: 'wire',
  schema: discourseCredentialSchema,
})

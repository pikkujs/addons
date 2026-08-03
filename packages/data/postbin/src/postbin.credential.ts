import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const postbinCredentialSchema = z.object({
  apiKey: z.string().describe('PostBin API key'),
})

defineCredential({
  name: 'postbin',
  displayName: 'PostBin',
  description: 'Consume the PostBin API',
  type: 'wire',
  schema: postbinCredentialSchema,
})

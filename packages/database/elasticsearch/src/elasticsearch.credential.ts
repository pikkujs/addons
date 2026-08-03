import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const elasticsearchCredentialSchema = z.object({
  apiKey: z.string().describe('Elasticsearch API key'),
})

defineCredential({
  name: 'elasticsearch',
  displayName: 'Elasticsearch',
  description: 'Consume the Elasticsearch API',
  type: 'wire',
  schema: elasticsearchCredentialSchema,
})

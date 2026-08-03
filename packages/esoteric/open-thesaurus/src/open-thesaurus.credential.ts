import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const openThesaurusCredentialSchema = z.object({
  apiKey: z.string().describe('openthesaurus API key'),
})

defineCredential({
  name: 'openThesaurus',
  displayName: 'openthesaurus',
  description: 'openthesaurus addon',
  type: 'wire',
  schema: openThesaurusCredentialSchema,
})

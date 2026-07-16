import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const openThesaurusCredentialSchema = z.object({
  apiKey: z.string().describe('openthesaurus API key'),
})

wireCredential({
  name: 'openThesaurus',
  displayName: 'openthesaurus',
  description: 'openthesaurus addon',
  type: 'wire',
  schema: openThesaurusCredentialSchema,
})

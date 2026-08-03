import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const zulipCredentialSchema = z.object({
  apiKey: z.string().describe('Zulip API key'),
})

defineCredential({
  name: 'zulip',
  displayName: 'Zulip',
  description: 'Consume the Zulip chat API',
  type: 'wire',
  schema: zulipCredentialSchema,
})

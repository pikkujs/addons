import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const zulipCredentialSchema = z.object({
  apiKey: z.string().describe('Zulip API key'),
})

wireCredential({
  name: 'zulip',
  displayName: 'Zulip',
  description: 'Consume the Zulip chat API',
  type: 'wire',
  schema: zulipCredentialSchema,
})

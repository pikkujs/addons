import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const pushoverCredentialSchema = z.object({
  apiKey: z.string().describe('Pushover API key'),
})

defineCredential({
  name: 'pushover',
  displayName: 'Pushover',
  description: 'Send push notifications via Pushover',
  type: 'wire',
  schema: pushoverCredentialSchema,
})

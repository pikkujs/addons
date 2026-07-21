import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const pushoverCredentialSchema = z.object({
  apiKey: z.string().describe('Pushover API key'),
})

wireCredential({
  name: 'pushover',
  displayName: 'Pushover',
  description: 'Send push notifications via Pushover',
  type: 'wire',
  schema: pushoverCredentialSchema,
})

import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const pushbulletCredentialSchema = z.object({
  apiKey: z.string().describe('Pushbullet API key'),
})

defineCredential({
  name: 'pushbullet',
  displayName: 'Pushbullet',
  description: 'Pushbullet addon',
  type: 'wire',
  schema: pushbulletCredentialSchema,
})

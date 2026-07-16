import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const pushbulletCredentialSchema = z.object({
  apiKey: z.string().describe('Pushbullet API key'),
})

wireCredential({
  name: 'pushbullet',
  displayName: 'Pushbullet',
  description: 'Pushbullet addon',
  type: 'wire',
  schema: pushbulletCredentialSchema,
})

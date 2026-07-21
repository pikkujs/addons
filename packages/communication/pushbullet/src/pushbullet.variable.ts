import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const pushbulletBaseUrlSchema = z.enum(["https://api.pushbullet.com/v2"]).default("https://api.pushbullet.com/v2")

wireVariable({
  name: 'PUSHBULLET_BASE_URL',
  displayName: 'Pushbullet Base URL',
  description: 'The base URL for the Pushbullet API.',
  variableId: 'PUSHBULLET_BASE_URL',
  schema: pushbulletBaseUrlSchema,
})

import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const uptimerobotSecretsSchema = z.object({
  apiKey: z.string().describe('UptimeRobot API key'),
})

export type UptimerobotSecrets = z.infer<typeof uptimerobotSecretsSchema>

wireSecret({
  name: 'uptimerobot',
  displayName: 'UptimeRobot API',
  description: 'Website monitoring',
  secretId: 'UPTIMEROBOT_CREDENTIALS',
  schema: uptimerobotSecretsSchema,
})

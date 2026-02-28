import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const pagerdutySecretsSchema = z.object({
  apiKey: z.string().describe('PagerDuty API key'),
})

export type PagerdutySecrets = z.infer<typeof pagerdutySecretsSchema>

wireSecret({
  name: 'pagerduty',
  displayName: 'PagerDuty API',
  description: 'Incident management',
  secretId: 'PAGERDUTY_CREDENTIALS',
  schema: pagerdutySecretsSchema,
})

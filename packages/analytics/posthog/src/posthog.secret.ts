import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const posthogSecretsSchema = z.object({
  apiKey: z.string().describe('PostHog API key'),
  host: z.string().optional().describe('PostHog host URL (for self-hosted instances)'),
})

export type PosthogSecrets = z.infer<typeof posthogSecretsSchema>

wireSecret({
  name: 'posthog',
  displayName: 'PostHog API',
  description: 'Product analytics',
  secretId: 'POSTHOG_CREDENTIALS',
  schema: posthogSecretsSchema,
})

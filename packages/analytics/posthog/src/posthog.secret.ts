import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const posthogSecretsSchema = z.object({
  apiKey: z.string().describe('PostHog API key'),
  host: z.string().optional().describe('PostHog host URL (for self-hosted instances)'),
  projectApiKey: z
    .string()
    .optional()
    .describe(
      'PostHog project API key, required only to read feature flags via local evaluation'
    ),
})

export type PosthogSecrets = z.infer<typeof posthogSecretsSchema>

defineSecret({
  name: 'posthog',
  displayName: 'PostHog API',
  description: 'Product analytics',
  secretId: 'POSTHOG_CREDENTIALS',
  schema: posthogSecretsSchema,
})

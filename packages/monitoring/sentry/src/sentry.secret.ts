import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const sentrySecretsSchema = z.object({
  token: z.string().describe('Sentry API authentication token (Bearer token)'),
  baseUrl: z
    .string()
    .optional()
    .describe('Base URL for self-hosted Sentry (defaults to https://sentry.io)'),
})

export type SentrySecrets = z.infer<typeof sentrySecretsSchema>

wireSecret({
  name: 'secrets',
  displayName: 'Sentry Secrets',
  description: 'API secrets for Sentry.io or self-hosted Sentry',
  secretId: 'SENTRY_CREDENTIALS',
  schema: sentrySecretsSchema,
})

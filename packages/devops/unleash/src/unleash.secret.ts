import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const unleashSecretsSchema = z.object({
  url: z.string().describe('Unleash API origin, e.g. https://unleash.example.com'),
  token: z
    .string()
    .describe('A client API token. Never an admin token: this only ever reads.'),
  appName: z
    .string()
    .optional()
    .describe('Application name Unleash records the fetch against'),
})

export type UnleashSecrets = z.infer<typeof unleashSecretsSchema>

defineSecret({
  name: 'unleash',
  displayName: 'Unleash',
  description: 'Feature flag service',
  secretId: 'UNLEASH_CREDENTIALS',
  schema: unleashSecretsSchema,
})

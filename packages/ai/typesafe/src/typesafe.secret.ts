import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const typesafeSecretsSchema = z.object({
  apiKey: z.string().describe('TypeSafe API key'),
  model: z.string().optional().describe('System One model, defaults to jev-latest'),
})

export type TypesafeSecrets = z.infer<typeof typesafeSecretsSchema>

defineSecret({
  name: 'typesafe',
  displayName: 'TypeSafe API',
  description: 'Calibrated judgments and classifications from TypeSafe System One',
  secretId: 'TYPESAFE_CREDENTIALS',
  schema: typesafeSecretsSchema,
  docsUrl: 'https://console.typesafe.ai',
  allowedHosts: ['api.typesafe.ai'],
})

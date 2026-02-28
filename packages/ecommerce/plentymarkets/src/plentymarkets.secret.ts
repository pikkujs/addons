import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const plentymarketsSecretsSchema = z.object({
  baseUrl: z
    .string()
    .describe('Base URL (e.g., https://p12345.my.plentysystems.com)'),
  accessToken: z.string().describe('Bearer access token'),
  apiVersion: z
    .string()
    .optional()
    .describe('API version (e.g., "v1") for Accept header'),
})

export type PlentymarketsSecrets = z.infer<
  typeof plentymarketsSecretsSchema
>

wireSecret({
  name: 'plentymarkets',
  displayName: 'PlentyMarkets API',
  description: 'PlentyMarkets REST API secrets',
  secretId: 'PLENTYMARKETS_CREDENTIALS',
  schema: plentymarketsSecretsSchema,
})

import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const plentymarketsSecretsSchema = z.object({
  baseUrl: z
    .string()
    .describe('Base URL (e.g., https://p12345.my.plentysystems.com)'),
  accessToken: z
    .string()
    .optional()
    .describe('Bearer access token (alternative to username and password)'),
  username: z
    .string()
    .optional()
    .describe('API user; with password, the addon logs in via /rest/login'),
  password: z.string().optional().describe('API user password'),
  apiVersion: z
    .string()
    .optional()
    .describe('API version (e.g., "v1") for Accept header'),
})

export type PlentymarketsSecrets = z.infer<
  typeof plentymarketsSecretsSchema
>

defineSecret({
  name: 'plentymarkets',
  displayName: 'PlentyMarkets API',
  description: 'PlentyMarkets REST API secrets',
  secretId: 'PLENTYMARKETS_CREDENTIALS',
  schema: plentymarketsSecretsSchema,
})

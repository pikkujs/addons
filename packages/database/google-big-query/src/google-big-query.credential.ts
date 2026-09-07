import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const googleBigQueryTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'googleBigQuery',
  displayName: 'Google BigQuery',
  description: 'Google BigQuery integration for Pikku',
  type: 'wire',
  schema: googleBigQueryTokenSchema,
  oauth2: {
    appCredentialSecretId: 'GOOGLE_BIG_QUERY_OAUTH_APP',
    tokenSecretId: 'GOOGLE_BIG_QUERY_OAUTH_TOKENS',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['read', 'write'],
  },
})

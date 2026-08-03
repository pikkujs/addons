import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const googleBigQueryTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const googleBigQueryOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
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

defineSecret({
  name: 'googleBigQueryOAuthApp',
  displayName: 'Google BigQuery OAuth App',
  description: 'OAuth2 app credentials for Google BigQuery',
  secretId: 'GOOGLE_BIG_QUERY_OAUTH_APP',
  schema: googleBigQueryOAuthAppSchema,
})

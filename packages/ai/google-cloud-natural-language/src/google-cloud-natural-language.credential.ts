import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const googleCloudNaturalLanguageTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const googleCloudNaturalLanguageOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

defineCredential({
  name: 'googleCloudNaturalLanguage',
  displayName: 'Google Cloud Natural Language',
  description: 'Consume the Google Cloud Natural Language API',
  type: 'wire',
  schema: googleCloudNaturalLanguageTokenSchema,
  oauth2: {
    appCredentialSecretId: 'GOOGLE_CLOUD_NATURAL_LANGUAGE_OAUTH_APP',
    tokenSecretId: 'GOOGLE_CLOUD_NATURAL_LANGUAGE_OAUTH_TOKENS',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['read', 'write'],
  },
})

defineSecret({
  name: 'googleCloudNaturalLanguageOAuthApp',
  displayName: 'Google Cloud Natural Language OAuth App',
  description: 'OAuth2 app credentials for Google Cloud Natural Language',
  secretId: 'GOOGLE_CLOUD_NATURAL_LANGUAGE_OAUTH_APP',
  schema: googleCloudNaturalLanguageOAuthAppSchema,
})

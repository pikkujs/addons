import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'
import { wireSecret } from '@pikku/core/secret'

export const youtubeTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

wireCredential({
  name: 'youtube',
  displayName: 'YouTube',
  description: 'YouTube integration for Pikku',
  type: 'wire',
  schema: youtubeTokenSchema,
  oauth2: {
    appCredentialSecretId: 'YOUTUBE_OAUTH_APP',
    tokenSecretId: 'YOUTUBE_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})

export const youtubeOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

wireSecret({
  name: 'youtubeOAuthApp',
  schema: youtubeOAuthAppSchema,
  displayName: 'YouTube OAuth App',
  description: 'OAuth2 app credentials for YouTube',
  secretId: 'YOUTUBE_OAUTH_APP',
})

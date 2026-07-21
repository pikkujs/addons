import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'
import { wireSecret } from '@pikku/core/secret'

export const raindropTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const raindropOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

wireCredential({
  name: 'raindrop',
  displayName: 'Raindrop',
  description: 'Consume the Raindrop bookmarks API',
  type: 'wire',
  schema: raindropTokenSchema,
  oauth2: {
    appCredentialSecretId: 'RAINDROP_OAUTH_APP',
    tokenSecretId: 'RAINDROP_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})

wireSecret({
  name: 'raindropOAuthApp',
  displayName: 'Raindrop OAuth App',
  description: 'OAuth2 app credentials for Raindrop',
  secretId: 'RAINDROP_OAUTH_APP',
  schema: raindropOAuthAppSchema,
})

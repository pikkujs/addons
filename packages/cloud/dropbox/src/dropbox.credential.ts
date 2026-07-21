import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'
import { wireSecret } from '@pikku/core/secret'

export const dropboxTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

wireCredential({
  name: 'dropbox',
  displayName: 'Dropbox',
  description: 'Dropbox integration for Pikku',
  type: 'wire',
  schema: dropboxTokenSchema,
  oauth2: {
    appCredentialSecretId: 'DROPBOX_OAUTH_APP',
    tokenSecretId: 'DROPBOX_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})

export const dropboxOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

wireSecret({
  name: 'dropboxOAuthApp',
  schema: dropboxOAuthAppSchema,
  displayName: 'Dropbox OAuth App',
  description: 'OAuth2 app credentials for Dropbox',
  secretId: 'DROPBOX_OAUTH_APP',
})

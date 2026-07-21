import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'
import { wireSecret } from '@pikku/core/secret'

export const microsoftOneDriveTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const microsoftOneDriveOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

wireCredential({
  name: 'microsoftOneDrive',
  displayName: 'Microsoft OneDrive',
  description: 'Consume the Microsoft OneDrive API',
  type: 'wire',
  schema: microsoftOneDriveTokenSchema,
  oauth2: {
    appCredentialSecretId: 'MICROSOFT_ONE_DRIVE_OAUTH_APP',
    tokenSecretId: 'MICROSOFT_ONE_DRIVE_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})

wireSecret({
  name: 'microsoftOneDriveOAuthApp',
  displayName: 'Microsoft OneDrive OAuth App',
  description: 'OAuth2 app credentials for Microsoft OneDrive',
  secretId: 'MICROSOFT_ONE_DRIVE_OAUTH_APP',
  schema: microsoftOneDriveOAuthAppSchema,
})

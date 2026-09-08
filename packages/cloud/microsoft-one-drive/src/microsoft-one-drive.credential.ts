import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const microsoftOneDriveTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
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

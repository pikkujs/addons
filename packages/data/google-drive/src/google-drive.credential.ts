import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'
import { wireSecret } from '@pikku/core/secret'

export const googleDriveTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const googleDriveOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

wireCredential({
  name: 'googleDrive',
  displayName: 'Google Drive',
  description: 'Google Drive integration for Pikku',
  type: 'wire',
  schema: googleDriveTokenSchema,
  oauth2: {
    appCredentialSecretId: 'GOOGLE_DRIVE_OAUTH_APP',
    tokenSecretId: 'GOOGLE_DRIVE_OAUTH_TOKENS',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.appdata', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.metadata', 'https://www.googleapis.com/auth/drive.metadata.readonly', 'https://www.googleapis.com/auth/drive.photos.readonly', 'https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive.scripts'],
  },
})

wireSecret({
  name: 'googleDriveOAuthApp',
  displayName: 'Google Drive OAuth App',
  description: 'OAuth2 app credentials for Google Drive',
  secretId: 'GOOGLE_DRIVE_OAUTH_APP',
  schema: googleDriveOAuthAppSchema,
})

import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

wireCredential({
  name: 'googleCloudStorageOAuth',
  displayName: 'Google Cloud Storage OAuth2',
  description: 'Google OAuth2 credentials for Cloud Storage API access',
  type: 'singleton',
  schema: z.object({
    accessToken: z.string(),
    refreshToken: z.string().optional(),
    expiresAt: z.number().optional(),
    tokenType: z.string(),
    scope: z.string().optional(),
  }),
  oauth2: {
    appCredentialSecretId: 'GOOGLE_CLOUD_STORAGE_APP_CREDENTIALS',
    tokenSecretId: 'GOOGLE_CLOUD_STORAGE_TOKENS',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['https://www.googleapis.com/auth/devstorage.full_control'],
    additionalParams: {
      access_type: 'offline',
      prompt: 'consent',
    },
  },
})

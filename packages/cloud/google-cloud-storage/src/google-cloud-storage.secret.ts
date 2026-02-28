import { wireOAuth2Credential } from '@pikku/core/oauth2'

wireOAuth2Credential({
  name: 'googleCloudStorageOAuth',
  displayName: 'Google Cloud Storage OAuth2',
  description: 'Google OAuth2 credentials for Cloud Storage API access',
  secretId: 'GOOGLE_CLOUD_STORAGE_APP_CREDENTIALS',
  tokenSecretId: 'GOOGLE_CLOUD_STORAGE_TOKENS',
  authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  scopes: [
    'https://www.googleapis.com/auth/devstorage.full_control',
  ],
  additionalParams: {
    access_type: 'offline',
    prompt: 'consent',
  },
})

import { wireOAuth2Credential } from '@pikku/core/oauth2'

wireOAuth2Credential({
  name: 'gmailOAuth',
  displayName: 'Gmail OAuth2',
  description: 'Google OAuth2 secrets for Gmail API access',
  secretId: 'GMAIL_APP_CREDENTIALS',
  tokenSecretId: 'GMAIL_TOKENS',
  authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  scopes: [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.labels',
  ],
  additionalParams: {
    access_type: 'offline',
    prompt: 'consent',
  },
})

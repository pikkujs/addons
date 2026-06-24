import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'
import { wireCredential } from '@pikku/core/credential'

export const googleAnalyticsSecretsSchema = z.object({
  measurementId: z.string().describe('GA4 Measurement ID (e.g., G-XXXXXXXXXX)'),
  apiSecret: z.string().describe('Measurement Protocol API secret'),
})

export type GoogleAnalyticsSecrets = z.infer<typeof googleAnalyticsSecretsSchema>

export const googleAnalyticsOAuthSchema = z.object({
  accessToken: z.string().describe('Google OAuth2 access token'),
  refreshToken: z.string().describe('Google OAuth2 refresh token'),
})

export type GoogleAnalyticsOAuthTokens = z.infer<typeof googleAnalyticsOAuthSchema>

wireSecret({
  name: 'googleAnalytics',
  displayName: 'Google Analytics 4 Measurement Protocol',
  description: 'API key and Measurement ID for sending events via Measurement Protocol',
  secretId: 'GOOGLE_ANALYTICS_CREDENTIALS',
  schema: googleAnalyticsSecretsSchema,
})

wireCredential({
  name: 'googleAnalyticsOAuth',
  displayName: 'Google Analytics 4 OAuth2',
  description: 'Google OAuth2 credentials for GA4 Data API (reporting)',
  type: 'singleton',
  schema: googleAnalyticsOAuthSchema,
  oauth2: {
    appCredentialSecretId: 'GOOGLE_ANALYTICS_APP_CREDENTIALS',
    tokenSecretId: 'GOOGLE_ANALYTICS_TOKENS',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: [
      'https://www.googleapis.com/auth/analytics.readonly',
    ],
    additionalParams: {
      access_type: 'offline',
      prompt: 'consent',
    },
  },
})

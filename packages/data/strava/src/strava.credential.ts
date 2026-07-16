import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'
import { wireSecret } from '@pikku/core/secret'

export const stravaTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const stravaOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

wireCredential({
  name: 'strava',
  displayName: 'Strava',
  description: 'Consume the Strava API',
  type: 'wire',
  schema: stravaTokenSchema,
  oauth2: {
    appCredentialSecretId: 'STRAVA_OAUTH_APP',
    tokenSecretId: 'STRAVA_OAUTH_TOKENS',
    authorizationUrl: 'https://www.strava.com/oauth/authorize',
    tokenUrl: 'https://www.strava.com/oauth/token',
    scopes: [
      'read',
      'activity:read_all',
      'activity:write',
    ],
  },
})

wireSecret({
  name: 'stravaOAuthApp',
  displayName: 'Strava OAuth App',
  description: 'OAuth2 app credentials for Strava',
  secretId: 'STRAVA_OAUTH_APP',
  schema: stravaOAuthAppSchema,
})

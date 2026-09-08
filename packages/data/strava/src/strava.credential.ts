import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const stravaTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'strava',
  displayName: 'Strava',
  description: 'Consume the Strava API',
  type: 'wire',
  schema: stravaTokenSchema,
  oauth2: {
    appCredentialSecretId: 'STRAVA_OAUTH_APP',
    tokenSecretId: 'STRAVA_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})

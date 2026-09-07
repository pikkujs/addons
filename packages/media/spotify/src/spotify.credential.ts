import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const spotifyTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'spotify',
  displayName: 'Spotify',
  description: 'Spotify integration for Pikku',
  type: 'wire',
  schema: spotifyTokenSchema,
  oauth2: {
    appCredentialSecretId: 'SPOTIFY_OAUTH_APP',
    tokenSecretId: 'SPOTIFY_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})

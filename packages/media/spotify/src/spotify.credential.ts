import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'
import { wireSecret } from '@pikku/core/secret'

export const spotifyTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

wireCredential({
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

export const spotifyOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

wireSecret({
  name: 'spotifyOAuthApp',
  schema: spotifyOAuthAppSchema,
  displayName: 'Spotify OAuth App',
  description: 'OAuth2 app credentials for Spotify',
  secretId: 'SPOTIFY_OAUTH_APP',
})

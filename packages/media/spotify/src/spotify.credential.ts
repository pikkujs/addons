import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

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
    authorizationUrl: 'https://accounts.spotify.com/authorize',
    tokenUrl: 'https://accounts.spotify.com/api/token',
    scopes: [
      'app-remote-control',
      'playlist-modify-private',
      'playlist-modify-public',
      'playlist-read-collaborative',
      'playlist-read-private',
      'streaming',
      'ugc-image-upload',
      'user-follow-modify',
      'user-follow-read',
      'user-library-modify',
      'user-library-read',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'user-read-email',
      'user-read-playback-position',
      'user-read-playback-state',
      'user-read-private',
      'user-read-recently-played',
      'user-top-read',
    ],
  },
})

export const spotifyOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

defineSecret({
  name: 'spotifyOAuthApp',
  schema: spotifyOAuthAppSchema,
  displayName: 'Spotify OAuth App',
  description: 'OAuth2 app credentials for Spotify',
  secretId: 'SPOTIFY_OAUTH_APP',
  optional: true,
})

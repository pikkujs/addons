import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const spotifyBaseUrlSchema = z.enum(["https://api.spotify.com/v1"]).default("https://api.spotify.com/v1")

wireVariable({
  name: 'SPOTIFY_BASE_URL',
  displayName: 'Spotify Base URL',
  description: 'The base URL for the Spotify API.',
  variableId: 'SPOTIFY_BASE_URL',
  schema: spotifyBaseUrlSchema,
})
